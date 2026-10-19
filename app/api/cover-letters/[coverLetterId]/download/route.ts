export const maxDuration = 60;

import { requireAuth } from "@/src/helpers/requireAuth";
import { mongodbIDRegex } from "@/src/helpers/validation";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/src/database/mongodb";
import CoverLetter from "@/src/models/coverLetter.model";
import { coverLetterPdfKey } from "@/src/helpers/pdf/key";
import { pdfStore } from "@/src/helpers/pdf/store";
import { generateAndStoreLetterPdf } from "@/src/helpers/pdf/generatePdfAndStore";

const inflight = new Map<string, Promise<Uint8Array>>();

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ coverLetterId: string }> }
) {
    try {
        // Check authentication
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        // get cover letter id
        const { coverLetterId } = await params;

        // Validate cove letter id
        if (!mongodbIDRegex.test(coverLetterId)) {
            return NextResponse.json({ message: "Invalid cover letter ID" }, { status: 400 });
        }

        // Find the cover letter document from database
        await connectToDatabase();

        const coverLetter = await CoverLetter.findOne({
            _id: coverLetterId,
            userId: auth.user.id
        }).lean();

        if (!coverLetter) {
            return NextResponse.json({ message: "Cover letter not found" }, { status: 404 });
        }

        // Generate an unique key for that cover letter
        const key = coverLetterPdfKey(String(coverLetter.userId), coverLetterId, coverLetter);

        // If the stored pdf matches the current content
        let pdf: Uint8Array | null = null;
        if (coverLetter.pdfKey === key) {
            pdf = await pdfStore.get(key).catch(() => null);
        }

        // If not found then generate on demand
        if (!pdf) {
            let job = inflight.get(key);

            if (!job) {
                job = generateAndStoreLetterPdf(coverLetter, key).finally(() => inflight.delete(key));

                inflight.set(key, job);
            }

            pdf = await job;
        }

        return new NextResponse(pdf as BodyInit, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="coverLetter-${coverLetterId}.pdf"`,
                "Cache-Control": "private, no-store",
            },
        });
    }
    catch (e) {
        console.error("PDF generation failed:", e);
        return NextResponse.json({ message: "Failed to generate PDF" }, { status: 500 });
    }
}
export const maxDuration = 60;

import { requireAuth } from "@/src/helpers/requireAuth";
import { mongodbIDRegex } from "@/src/helpers/validation";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/src/database/mongodb";
import resumeModel from "@/src/models/resume.model";
import { resumePdfKey } from "@/src/helpers/pdf/key";
import { pdfStore } from "@/src/helpers/pdf/store";
import { generateAndStoreResumePdf } from "@/src/helpers/pdf/generatePdfAndStore";

const inflight = new Map<string, Promise<Uint8Array>>();

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ resumeId: string }> }
) {
    try {
        // Check authentication
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        // Await params
        const { resumeId } = await params;

        // Validate resume ID
        if (!mongodbIDRegex.test(resumeId)) {
            return NextResponse.json({ message: "Invalid resume ID" }, { status: 400 });
        }

        // Find the resume document from database
        await connectToDatabase();
        const resume = await resumeModel.findOne({
            _id: resumeId,
            userId: auth.user.id
        }).lean();

        if (!resume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        // Generate an unique key for that resume
        const key = resumePdfKey(String(resume.userId), resumeId, resume);

        // If the stored pdf matches the current content
        let pdf: Uint8Array | null = null;
        if (resume.pdfKey === key) {
            pdf = await pdfStore.get(key).catch(() => null);
        }

        // If not found then generate on demand
        if (!pdf) {
            let job = inflight.get(key);

            if (!job) {
                job = generateAndStoreResumePdf(resume, key).finally(() => inflight.delete(key));
                inflight.set(key, job);
            }

            pdf = await job;
        }

        return new NextResponse(pdf as BodyInit, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="resume-${resumeId}.pdf"`,
                "Cache-Control": "private, no-store",
            },
        });
    } catch (e) {
        console.error("PDF generation failed:", e);
        return NextResponse.json({ message: "Failed to generate PDF" }, { status: 500 });
    }
}
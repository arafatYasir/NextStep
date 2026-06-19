import { connectToDatabase } from "@/src/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/src/helpers/requireAuth";
import { isValidObjectId } from "@/src/helpers/mongoose";
import CoverLetter from "@/src/models/coverLetter.model";

export async function GET(req: NextRequest, { params }: { params: Promise<{ coverLetterId: string }> }) {
    try {
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        const { coverLetterId } = await params;

        if (!isValidObjectId(coverLetterId)) {
            return NextResponse.json({ error: "Invalid cover letter id" }, { status: 400 });
        }

        await connectToDatabase();

        const coverLetter = await CoverLetter.findOne({ _id: coverLetterId });

        if (!coverLetter) {
            return NextResponse.json({ error: "Cover letter not found" }, { status: 404 });
        }

        if (coverLetter.userId !== auth.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(coverLetter);
    } catch (e) {
        console.error("API Error:", e);
        return NextResponse.json(
            { status: "ERROR", message: "Failed to get response" },
            { status: 500 }
        );
    }
}

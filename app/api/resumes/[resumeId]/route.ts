import { connectToDatabase } from "@/src/database/mongodb";
import { requireAuth } from "@/src/helpers/requireAuth";
import resumeModel from "@/src/models/resume.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) {
    try {
        const auth = await requireAuth();
        if (auth.unauthorized) {
            return auth.unauthorized;
        }

        const { resumeId } = await params;

        if (!resumeId) {
            return NextResponse.json({ status: "ERROR", message: "Invalid resume id" }, { status: 400 });
        }

        await connectToDatabase();

        const resumeRecord = await resumeModel.findById(resumeId);

        if (!resumeRecord) {
            return NextResponse.json({ status: "ERROR", message: "Resume record not found" }, { status: 404 });
        }

        if (resumeRecord.userId !== auth.user.id) {
            return NextResponse.json({ status: "ERROR", message: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(resumeRecord);
    } catch (e) {
        console.error("API Error:", e);
        return NextResponse.json(
            { status: "ERROR", message: "Failed to get response" },
            { status: 500 }
        );
    }
}
import { connectToDatabase } from "@/src/database/mongodb";
import resumeAnalysisModel from "@/src/models/resumeAnalysis.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) {
    try {
        const { resumeId } = await params;

        await connectToDatabase();

        const resumeRecord = await resumeAnalysisModel.findOne({ _id: resumeId });

        if (!resumeRecord) {
            return NextResponse.json({ error: "Resume record not found" }, { status: 404 });
        }

        return NextResponse.json(resumeRecord);
    } catch (e) {
        console.log("API Error: ", e);
        return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
    }
}
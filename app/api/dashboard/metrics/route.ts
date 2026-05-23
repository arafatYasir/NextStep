import JobRecord from "@/src/models/jobRecord.model";
import resumeAnalysisModel from "@/src/models/resumeAnalysis.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetching metric data
        const jobRecords = await JobRecord.countDocuments({ userId, status: "completed" });
        const resumeRecords = await resumeAnalysisModel.countDocuments({ userId, status: "completed" });
        const resumesBuilt = 0, coverLetters = 0;

        return NextResponse.json({
            jobRecords,
            resumeRecords,
            resumesBuilt,
            coverLetters
        }, { status: 200 });
    }
    catch (e) {
        console.error("Dashboard Metrics API Error:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
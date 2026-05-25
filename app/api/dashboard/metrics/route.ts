import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import resumeAnalysisModel from "@/src/models/resumeAnalysis.model";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/src/helpers/requireAuth";

export async function GET(_req: NextRequest) {
    try {
        const auth = await requireAuth();
        if (auth.unauthorized) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const userId = auth.user.id;

        const jobRecords = await JobRecord.countDocuments({ userId, status: "completed" });
        const resumeRecords = await resumeAnalysisModel.countDocuments({
            userId,
            status: "completed",
        });
        const resumesBuilt = 0;
        const coverLetters = 0;

        return NextResponse.json(
            {
                jobRecords,
                resumeRecords,
                resumesBuilt,
                coverLetters,
            },
            { status: 200 }
        );
    } catch (e) {
        console.error("Dashboard Metrics API Error:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

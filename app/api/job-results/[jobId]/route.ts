import JobRecord from "@/src/models/jobRecord.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const { jobId } = await params;

        const jobRecord = await JobRecord.findOne({ _id: jobId });

        if (!jobRecord) {
            return NextResponse.json({ error: "Job record not found" }, { status: 404 });
        }

        return NextResponse.json(jobRecord);
    } catch (e: any) {
        console.log("API Error: ", e);
        return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
    }
}
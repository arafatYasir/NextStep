import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const { jobId } = await params;

        await connectToDatabase();

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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const { jobId } = await params;

        await connectToDatabase();

        await JobRecord.findByIdAndDelete(jobId);

        return NextResponse.json({ message: "Job record deleted successfully.", status: "OK" }, { status: 200 });
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Failed to delete job record.", status: "ERROR" }, { status: 500 });
    }
}
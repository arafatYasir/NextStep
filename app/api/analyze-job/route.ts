import { connectToDatabase } from "@/src/database/mongodb";
import { inngest } from "@/src/inngest/client";
import JobRecord from "@/src/models/jobRecord.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { jobRole, jobDescription, userId } = await req.json();

        // Connect to Database
        await connectToDatabase();

        // Create a job record in database
        const newJobRecord = await JobRecord.create({
            jobRole,
            userId,
            status: "queued",
        });

        // Save the job record
        await newJobRecord.save();

        // Trigger Inngest workflow
        await inngest.send({
            name: "analyze/job-description",
            data: {
                jobId: newJobRecord._id.toString(),
                jobRole,
                jobDescription,
                userId
            }
        });

        return NextResponse.json({ jobId: newJobRecord._id.toString() }, { status: 200 });
    } catch (e: any) {
        console.log("API Error: ", e);
        return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
    }
}
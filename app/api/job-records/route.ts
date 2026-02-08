import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Connect to db
        await connectToDatabase();

        // Get user id from request
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ message: "User id is not found!" }, { status: 400 });
        }

        // Get job records from db
        const jobRecords = await JobRecord.find({ userId });

        return NextResponse.json({ jobRecords }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Failed to get job records!" }, { status: 500 });
    }
}
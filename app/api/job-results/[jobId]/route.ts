import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/src/helpers/requireAuth";
import { isValidObjectId } from "@/src/helpers/mongoose";

export async function GET(req: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        const { jobId } = await params;

        if (!isValidObjectId(jobId)) {
            return NextResponse.json({ error: "Invalid job id" }, { status: 400 });
        }

        await connectToDatabase();

        const jobRecord = await JobRecord.findOne({ _id: jobId });

        if (!jobRecord) {
            return NextResponse.json({ error: "Job record not found" }, { status: 404 });
        }

        if (jobRecord.userId !== auth.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(jobRecord);
    } catch (e) {
        console.error("API Error:", e);
        return NextResponse.json(
            { status: "ERROR", message: "Failed to get response" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        const { jobId } = await params;

        if (!isValidObjectId(jobId)) {
            return NextResponse.json(
                { message: "Invalid job id", status: "ERROR" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const jobRecord = await JobRecord.findOne({ _id: jobId, userId: auth.user.id });

        if (!jobRecord) {
            return NextResponse.json(
                { message: "Job record not found", status: "ERROR" },
                { status: 404 }
            );
        }

        await JobRecord.findByIdAndDelete(jobId);

        return NextResponse.json(
            { message: "Job record deleted successfully.", status: "OK" },
            { status: 200 }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { message: "Failed to delete job record.", status: "ERROR" },
            { status: 500 }
        );
    }
}

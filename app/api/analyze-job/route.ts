import { connectToDatabase } from "@/src/database/mongodb";
import { inngest } from "@/src/inngest/client";
import JobRecord from "@/src/models/jobRecord.model";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/src/helpers/requireAuth";
import {
    parseTrimmedString,
    validateJobDescription,
    validateJobTitle,
} from "@/src/helpers/validation";

export async function POST(req: NextRequest) {
    try {
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        const body = await req.json();
        const jobRole = parseTrimmedString(body?.jobRole);
        const jobDescription = parseTrimmedString(body?.jobDescription);

        const titleError = validateJobTitle(jobRole);
        if (titleError) {
            return NextResponse.json({ status: "ERROR", message: titleError }, { status: 400 });
        }

        const descriptionError = validateJobDescription(jobDescription);
        if (descriptionError) {
            return NextResponse.json({ status: "ERROR", message: descriptionError }, { status: 400 });
        }

        await connectToDatabase();

        const userId = auth.user.id;

        const newJobRecord = await JobRecord.create({
            jobRole,
            userId,
            status: "queued",
        });

        await inngest.send({
            name: "analyze/job-description",
            data: {
                jobId: newJobRecord._id.toString(),
                jobRole,
                jobDescription,
                userId,
            },
        });

        return NextResponse.json(
            { jobId: newJobRecord._id.toString(), status: "OK" },
            { status: 200 }
        );
    } catch (e) {
        console.error("API Error:", e);
        return NextResponse.json(
            { status: "ERROR", message: "Something went wrong, please try again later." },
            { status: 500 }
        );
    }
}

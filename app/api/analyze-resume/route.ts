export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/src/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import ResumeAnalysis from "@/src/models/resumeAnalysis.model";
import { inngest } from "@/src/inngest/client";
import { extractTextFromFile } from "@/src/helpers/fileExtractor";
import { requireAuth } from "@/src/helpers/requireAuth";
import {
    parseTrimmedString,
    validateJobDescription,
    validateJobTitle,
    RESUME_JOB_DESCRIPTION_MAX,
} from "@/src/helpers/validation";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req: NextRequest) {
    try {
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        const formData = await req.formData();
        const jobTitle = parseTrimmedString(formData.get("jobTitle"));
        const jobDescription = parseTrimmedString(formData.get("jobDescription"));
        const resume = formData.get("resume");

        const titleError = validateJobTitle(jobTitle);
        if (titleError) {
            return NextResponse.json({ status: "ERROR", message: titleError }, { status: 400 });
        }

        const descriptionError = validateJobDescription(
            jobDescription,
            RESUME_JOB_DESCRIPTION_MAX
        );
        if (descriptionError) {
            return NextResponse.json({ status: "ERROR", message: descriptionError }, { status: 400 });
        }

        if (!(resume instanceof File)) {
            return NextResponse.json(
                { status: "ERROR", message: "Resume is required." },
                { status: 400 }
            );
        }

        if (resume.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { status: "ERROR", message: "File size exceeded 5MB limit." },
                { status: 400 }
            );
        }

        if (!ACCEPTED_TYPES.includes(resume.type)) {
            return NextResponse.json(
                { status: "ERROR", message: "File type is not supported!" },
                { status: 400 }
            );
        }

        const resumeText = await extractTextFromFile(resume);

        if (resumeText.trim() === "" || resumeText.trim().length < 200) {
            return NextResponse.json(
                { status: "ERROR", message: "The resume content is empty or insufficient." },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const userId = auth.user.id;

        const resumeAnalysis = await ResumeAnalysis.create({
            userId,
            jobTitle,
            jobDescription,
            resumeFileName: resume.name,
            resumeFileType: resume.type,
            resumeFileSize: resume.size,
        });

        await inngest.send({
            name: "analyze/resume",
            data: {
                resumeId: resumeAnalysis._id.toString(),
                resumeText,
                jobTitle,
                jobDescription,
            },
        });

        return NextResponse.json(
            { status: "OK", resumeId: resumeAnalysis._id.toString() },
            { status: 200 }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { status: "ERROR", message: "Something went wrong, please try again later." },
            { status: 500 }
        );
    }
}

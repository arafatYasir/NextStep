import { connectToDatabase } from "@/src/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import ResumeAnalysis from "@/src/models/resumeAnalysis.model"
import { inngest } from "@/src/inngest/client";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const jobTitle = formData.get("jobTitle") as string;
        const jobDescription = formData.get("jobDescription") as string;
        const resume = formData.get("resume") as File;
        const userId = formData.get("userId") as string;

        // Full validation
        if(jobTitle.trim().length < 3 || jobTitle.trim().length > 50) {
            return NextResponse.json({ status: "ERROR", message: "Job title must be between 3 and 50 characters."});
        }
        if(jobDescription.trim().length < 100 || jobDescription.trim().length > 3000) {
            return NextResponse.json({ status: "ERROR", message: "Job description must be between 100 and 3000 characters."});
        }
        if(!resume) {
            return NextResponse.json({ status: "ERROR", message: "Resume is required."});
        }
        if(resume.size > MAX_FILE_SIZE) {
            return NextResponse.json({ status: "ERROR", message: "File size exceeded 10MB limit."});
        }
        if(!ACCEPTED_TYPES.includes(resume.type)) {
            return NextResponse.json({ status: "ERROR", message: "File type is not supported!"});
        }

        // Connect to DB
        await connectToDatabase();

        // Create a new resume analysis record
        const resumeAnalysis = await ResumeAnalysis.create({
            userId,
            jobTitle,
            jobDescription,
            resumeFileName: resume.name,
            resumeFileType: resume.type,
            resumeFileSize: resume.size,
        });

        // Save resume analysis
        await resumeAnalysis.save();

        // Trigger inngest workflow
        inngest.send({
            name: "analyze/resume",
            data: {
                resumeId: resumeAnalysis._id.toString(),
                jobTitle,
                jobDescription,
                resume,
                userId
            }
        });

        return NextResponse.json({ status: "OK", resumeId: resumeAnalysis._id.toString(), message: "Analyzing Resume" }, {status: 200});

    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "ERROR", message: "Something went wrong, please try again later." });
    }
}
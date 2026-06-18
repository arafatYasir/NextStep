import { connectToDatabase } from "@/src/database/mongodb";
import { requireAuth } from "@/src/helpers/requireAuth";
import { parseTrimmedString, RESUME_JOB_DESCRIPTION_MAX, validateCompanyName, validateJobDescription, validateJobTitle, validateManagerName, validateName } from "@/src/helpers/validation";
import { inngest } from "@/src/inngest/client";
import CoverLetter from "@/src/models/coverLetter.model";
import { NextRequest, NextResponse } from "next/server";

const COVER_LETTER_TONES = ["Professional", "Enthusiastic", "Confident", "Friendly", "Formal"]

export async function POST(req: NextRequest) {
    try {
        const { user, unauthorized } = await requireAuth();
        if (unauthorized) return unauthorized;

        const body = await req.json();
        const letterType = parseTrimmedString(body?.letterType);
        const name = parseTrimmedString(body?.name);
        const jobTitle = parseTrimmedString(body?.jobTitle);
        const jobDescription = parseTrimmedString(body?.jobDescription);
        const companyName = parseTrimmedString(body?.companyName);
        const hiringManagerName = parseTrimmedString(body?.hiringManagerName);
        const letterTone = parseTrimmedString(body?.letterTone);

        const nameError = validateName(name.trim());
        if (nameError) {
            return NextResponse.json({ status: "ERROR", message: nameError }, { status: 400 });
        }

        const jobTitleError = validateJobTitle(jobTitle.trim());
        if (jobTitleError) {
            return NextResponse.json({ status: "ERROR", message: jobTitleError }, { status: 400 });
        }

        const jobDescriptionError = validateJobDescription(
            jobDescription.trim(),
            RESUME_JOB_DESCRIPTION_MAX
        );
        if (jobDescriptionError) {
            return NextResponse.json({ status: "ERROR", message: jobDescriptionError }, { status: 400 });
        }

        const companyNameError = validateCompanyName(companyName.trim());
        if (companyNameError) {
            return NextResponse.json({ status: "ERROR", message: companyNameError }, { status: 400 });
        }

        if (hiringManagerName?.trim()) {
            const hiringManagerNameError = validateManagerName(hiringManagerName.trim());

            if (hiringManagerNameError) {
                return NextResponse.json({ status: "ERROR", message: hiringManagerNameError }, { status: 400 });
            }
        }

        if (!COVER_LETTER_TONES.includes(letterTone)) {
            return NextResponse.json({ status: "ERROR", message: "Invalid Letter Tone" }, { status: 400 });
        }

        if (letterType !== "Fresher" && letterType !== "Experienced") {
            return NextResponse.json({ status: "ERROR", message: "Invalid Letter Type" }, { status: 400 });
        }

        // Connect to database
        await connectToDatabase();

        const userId = user.id;

        // Creating a cover letter record
        const coverLetter = await CoverLetter.create({
            userId,
            jobTitle,
            jobDescription,
            companyName,
            hiringManagerName: hiringManagerName || "",
            letterTone,
            letterType,
            status: "queued"
        });

        // Calling inngest function to proceed to the AI generation
        inngest.send({
            name: "generate/cover-letter",
            data: {
                coverLetterId: coverLetter._id.toString(),
                name,
                jobTitle,
                jobDescription,
                companyName,
                hiringManagerName: hiringManagerName || "",
                letterTone,
                letterType
            }
        });
    } catch (e) {
        console.error("API Error:", e);
        return NextResponse.json(
            { status: "ERROR", message: "Something went wrong, please try again later." },
            { status: 500 }
        );
    }
}
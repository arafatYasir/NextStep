import { requireAuth } from "@/src/helpers/requireAuth";
import { emailRegex, parseTrimmedString, phoneRegex, RESUME_JOB_DESCRIPTION_MAX, urlRegex, validateJobDescription, validateJobTitle } from "@/src/helpers/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        const body = await req.json();
        const fullName = parseTrimmedString(body?.fullName);
        const email = parseTrimmedString(body?.email);
        const phone = parseTrimmedString(body?.phone);
        const location = parseTrimmedString(body?.location);
        const github = parseTrimmedString(body?.github);
        const linkedin = parseTrimmedString(body?.linkedin);
        const jobTitle = parseTrimmedString(body?.jobTitle);
        const jobDescription = parseTrimmedString(body?.jobDescription);

        // Checking if data is valid
        const titleError = validateJobTitle(jobTitle);
        if (titleError) {
            return NextResponse.json({ status: "ERROR", message: titleError }, { status: 400 });
        }

        const descriptionError = validateJobDescription(jobDescription, RESUME_JOB_DESCRIPTION_MAX);
        if (descriptionError) {
            return NextResponse.json({ status: "ERROR", message: descriptionError }, { status: 400 });
        }

        if (!fullName) {
            return NextResponse.json({ status: "ERROR", message: "Full name is required" }, { status: 400 });
        }
        else if (fullName.length < 4) {
            return NextResponse.json({ status: "ERROR", message: "Full name must be at least 4 characters" }, { status: 400 });
        }

        if (!email) {
            return NextResponse.json({ status: "ERROR", message: "Email is required" }, { status: 400 });
        }
        else if (!emailRegex.test(email)) {
            return NextResponse.json({ status: "ERROR", message: "Invalid email format" }, { status: 400 });
        }

        if (!phone) {
            return NextResponse.json({ status: "ERROR", message: "Phone number is required" }, { status: 400 });
        }
        else if (!phoneRegex.test(phone)) {
            return NextResponse.json({ status: "ERROR", message: "Invalid phone number format" }, { status: 400 });
        }

        if (!location) {
            return NextResponse.json({ status: "ERROR", message: "Location is required" }, { status: 400 });
        }

        if (!github) {
            return NextResponse.json({ status: "ERROR", message: "GitHub link is required" }, { status: 400 });
        }
        else if (!urlRegex.test(github)) {
            return NextResponse.json({ status: "ERROR", message: "Invalid url format" }, { status: 400 });
        }

        if (!linkedin) {
            return NextResponse.json({ status: "ERROR", message: "LinkedIn link is required" }, { status: 400 });
        }
        else if (!urlRegex.test(linkedin)) {
            return NextResponse.json({ status: "ERROR", message: "Invalid url format" }, { status: 400 });
        }
    }
    catch (e) {
        console.error("API Error:", e);
        return NextResponse.json(
            { status: "ERROR", message: "Something went wrong, please try again later." },
            { status: 500 }
        );
    }
}
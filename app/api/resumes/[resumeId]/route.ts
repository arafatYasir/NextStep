import { connectToDatabase } from "@/src/database/mongodb";
import { isValidObjectId } from "@/src/helpers/mongoose";
import { requireAuth } from "@/src/helpers/requireAuth";
import resumeModel from "@/src/models/resume.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) {
    try {
        const auth = await requireAuth();
        if (auth.unauthorized) {
            return auth.unauthorized;
        }

        const { resumeId } = await params;

        if (!resumeId) {
            return NextResponse.json({ status: "ERROR", message: "Invalid resume id" }, { status: 400 });
        }

        await connectToDatabase();

        const resumeRecord = await resumeModel.findById(resumeId);

        if (!resumeRecord) {
            return NextResponse.json({ status: "ERROR", message: "Resume record not found" }, { status: 404 });
        }

        if (resumeRecord.userId !== auth.user.id) {
            return NextResponse.json({ status: "ERROR", message: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(resumeRecord);
    } catch (e) {
        console.error("API Error:", e);
        return NextResponse.json(
            { status: "ERROR", message: "Failed to get response" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) {
    try {
        // Checkig authentication
        const auth = await requireAuth();
        if (auth.unauthorized) {
            return auth.unauthorized;
        }

        // Get the resume id
        const { resumeId } = await params;

        // Check if resumeId is valid object id
        if (!isValidObjectId(resumeId)) {
            return NextResponse.json(
                { error: "Invalid resume id", status: "ERROR" },
                { status: 400 }
            )
        }

        // Connect to database
        await connectToDatabase();

        const resumeRecord = await resumeModel.findOne({ _id: resumeId, userId: auth.user.id });

        if (!resumeRecord) {
            return NextResponse.json(
                { error: "Resume record not found", status: "ERROR" },
                { status: 404 }
            );
        }

        await resumeModel.findByIdAndDelete(resumeId);

        return NextResponse.json(
            { status: "OK", message: "Resume record deleted successfully!" },
            { status: 200 }
        );
    } catch (e) {
        console.error("API Error:", e);

        return NextResponse.json(
            { error: "Failed to delete resume record", status: "ERROR" },
            { status: 500 }
        );
    }
}
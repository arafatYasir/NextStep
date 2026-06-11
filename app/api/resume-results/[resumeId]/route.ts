import { connectToDatabase } from "@/src/database/mongodb";
import resumeAnalysisModel from "@/src/models/resumeAnalysis.model";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/src/helpers/requireAuth";
import { isValidObjectId } from "@/src/helpers/mongoose";

export async function GET(req: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) {
    try {
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        const { resumeId } = await params;

        if (!isValidObjectId(resumeId)) {
            return NextResponse.json({ error: "Invalid resume id" }, { status: 400 });
        }

        await connectToDatabase();

        const resumeRecord = await resumeAnalysisModel.findOne({ _id: resumeId });

        if (!resumeRecord) {
            return NextResponse.json({ error: "Resume record not found" }, { status: 404 });
        }

        if (resumeRecord.userId !== auth.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        const { resumeId } = await params;

        if (!isValidObjectId(resumeId)) {
            return NextResponse.json(
                { error: "Invalid resume id", status: "ERROR" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const resumeRecord = await resumeAnalysisModel.findOne({ _id: resumeId, userId: auth.user.id });

        if (!resumeRecord) {
            return NextResponse.json(
                { error: "Resume record not found", status: "ERROR" },
                { status: 404 }
            );
        }

        await resumeAnalysisModel.findByIdAndDelete(resumeId);

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

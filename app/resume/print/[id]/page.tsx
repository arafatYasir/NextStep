import ResumeResultView from "@/components/analysis/resume-builder/ResumeResultView";
import { connectToDatabase } from "@/src/database/mongodb";
import { mongodbIDRegex } from "@/src/helpers/validation";
import resumeModel from "@/src/models/resume.model";
import { notFound } from "next/navigation";

const PrintResume = async ({ params }: { params: Promise<{ id: string }> }) => {
    // Get the resume id
    const { id } = await params;

    if (!mongodbIDRegex.test(id)) {
        notFound();
    }

    // Fetch the resume from database
    await connectToDatabase();
    const resume = await resumeModel.findById(id).lean();

    if (!resume) {
        notFound();
    }

    return (
        <ResumeResultView result={resume} isPrintMode={true} />
    )
}

export default PrintResume
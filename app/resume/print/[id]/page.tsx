import ResumeResultView from "@/components/analysis/resume-builder/ResumeResultView";
import { connectToDatabase } from "@/src/database/mongodb";
import resumeModel from "@/src/models/resume.model";

const PrintResume = async ({ params }: { params: Promise<{ id: string }> }) => {
    // Get the resume id
    const { id } = await params;

    // Fetch the resume from database
    await connectToDatabase();
    const resume = await resumeModel.findById(id).lean();

    return (
        <ResumeResultView result={resume} isPrintMode={true} />
    )
}

export default PrintResume
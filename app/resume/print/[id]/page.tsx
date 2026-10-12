import ResumeResultView from "@/components/analysis/resume-builder/ResumeResultView";
import { connectToDatabase } from "@/src/database/mongodb";
import { requireAuth } from "@/src/helpers/requireAuth";
import { mongodbIDRegex } from "@/src/helpers/validation";
import resumeModel from "@/src/models/resume.model";
import { redirect } from "next/navigation";

const PrintResume = async ({ params }: { params: Promise<{ id: string }> }) => {
    // Get the resume id
    const { id } = await params;

    // Check user authentication
    const auth = await requireAuth();
    if (auth.unauthorized) redirect("/");

    if (!mongodbIDRegex.test(id)) {
        redirect("/");
    }

    // Fetch the resume from database
    await connectToDatabase();
    const resume = await resumeModel.findOne({
        _id: id,
        userId: auth.user.id
    }).lean();

    if (!resume) {
        redirect("/");
    }

    return (
        <ResumeResultView result={resume} isPrintMode={true} />
    )
}

export default PrintResume
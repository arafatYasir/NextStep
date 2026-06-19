import { FileSearch, ScanText, FilePlusCorner, PenLine } from "lucide-react";
import MetricCard from "./MetricCard";
import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import resumeAnalysisModel from "@/src/models/resumeAnalysis.model";
import resumeModel from "@/src/models/resume.model";
import CoverLetter from "@/src/models/coverLetter.model";

const ServiceMetricCards = async ({ userId }: { userId: string }) => {
    await connectToDatabase();

    const jobRecords = await JobRecord.countDocuments({ userId, status: "completed" });
    const resumeRecords = await resumeAnalysisModel.countDocuments({ userId, status: "completed" });
    const resumesBuilt = await resumeModel.countDocuments({ userId, status: "completed" });
    const coverLetters = await CoverLetter.countDocuments({ userId, status: "completed" });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
                label="Job Analyses"
                value={jobRecords}
                icon={FileSearch}
                description="Total jobs analyzed"
            />
            <MetricCard
                label="Resume Analyses"
                value={resumeRecords}
                icon={ScanText}
                description="Total resumes analyzed"
            />
            <MetricCard
                label="Resumes Built"
                value={resumesBuilt}
                icon={FilePlusCorner}
                description="Professional resumes created"
            />
            <MetricCard
                label="Letters Written"
                value={coverLetters}
                icon={PenLine}
                description="AI-generated cover letters"
            />
        </div>
    );
};

export default ServiceMetricCards;

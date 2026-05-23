import { FileSearch, ScanText, FilePlusCorner, PenLine } from "lucide-react";

const ServiceMetricCards = async ({ userId }: { userId: string }) => {
    const baseURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SITE_URL_DEV : process.env.NEXT_PUBLIC_SITE_URL_PROD;

    const res = await fetch(`${baseURL}/api/dashboard/metrics?userId=${userId}`);
    const data = await res.json();

    console.log(data);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* <MetricCard
                label="Job Analyses"
                value={stats.jobAnalysesCount}
                icon={FileSearch}
                description="Total jobs analyzed"
            />
            <MetricCard
                label="Resume Analyses"
                value={stats.resumeAnalysesCount}
                icon={ScanText}
                description="Total resumes analyzed"
            />
            <MetricCard
                label="Resumes Built"
                value={stats.resumesBuiltCount}
                icon={FilePlusCorner}
                description="Professional resumes created"
            />
            <MetricCard
                label="Letters Written"
                value={stats.lettersWrittenCount}
                icon={PenLine}
                description="AI-generated cover letters"
            /> */}
        </div>
    );
};

export default ServiceMetricCards;

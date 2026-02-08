import JobCard from "@/components/dashboard/job-analyses/JobCard";
import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import { Briefcase } from "lucide-react";

interface JobRecordType {
    _id: string;
    jobRole: string;
    userId: string;
    status: string;
    result: JobAnalysis;
    createdAt: string | Date;
}

const JobsRecordsList = async ({ userId }: { userId: string | undefined }) => {
    if (!userId) return null;

    // Fetching job records
    await connectToDatabase();
    const rawJobRecords = await JobRecord.find({ userId }).sort({ createdAt: -1 });
    const jobRecords = JSON.parse(JSON.stringify(rawJobRecords));

    return (
        <>
            {/* ---- Jobs ---- */}
            {jobRecords.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {jobRecords.map((record: JobRecordType) => (
                        <JobCard
                            key={record._id}
                            id={record._id}
                            jobRole={record.jobRole}
                            status={record.status}
                            analysis={record.result}
                            createdAt={record.createdAt}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 px-4 rounded-xl border border-dashed border-[rgb(var(--border-hover))] bg-card">
                    <div className="size-16 rounded-full bg-[rgb(var(--bg-primary))]/10 flex items-center justify-center text-[rgb(var(--bg-primary))] mb-4">
                        <Briefcase className="size-8" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground/80">
                        No job analyses yet
                    </h3>
                    <p className="text-sm text-[rgb(var(--text-tertiary))] max-w-xs text-center mt-2">
                        Start by analyzing your first job description to see it appear here.
                    </p>
                </div>
            )}
        </>
    );
};

export default JobsRecordsList;
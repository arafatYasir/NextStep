import JobCard from "@/components/dashboard/JobCard";
import { createClient } from "@/lib/supabase/server"
import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import { Briefcase } from "lucide-react";

const JobAnalyses = async () => {
    // Getting user id
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();
    const userId = user?.id;

    // Fetching job records
    await connectToDatabase();
    const rawJobRecords = await JobRecord.find({ userId }).sort({ createdAt: -1 });
    const jobRecords = JSON.parse(JSON.stringify(rawJobRecords));

    return (
        <section className="flex-1 px-8 py-10 space-y-8 max-w-5xl animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold font-heading tracking-tight text-[rgb(var(--text-primary))]">
                    Job Analyses
                </h1>
                <p className="text-[rgb(var(--text-tertiary))] font-sans text-sm">
                    Manage and view your analyzed job descriptions and results.
                </p>
            </div>
            {/* Content Section */}
            {jobRecords.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {jobRecords.map((record: any) => (
                        <JobCard
                            key={record._id}
                            jobRole={record.jobRole}
                            status={record.status}
                            createdAt={record.createdAt}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 px-4 rounded-3xl border border-dashed border-[rgb(var(--border-default))] bg-[rgb(var(--bg-body))]/50">
                    <div className="size-16 rounded-full bg-[rgb(var(--bg-primary))]/5 flex items-center justify-center text-[rgb(var(--bg-primary))]/30 mb-4">
                        <Briefcase className="size-8" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-[rgb(var(--text-secondary))]">
                        No job analyses yet
                    </h3>
                    <p className="text-sm text-[rgb(var(--text-tertiary))] max-w-xs text-center mt-2">
                        Start by analyzing your first job description to see it appear here.
                    </p>
                </div>
            )}
        </section>
    )
}

export default JobAnalyses
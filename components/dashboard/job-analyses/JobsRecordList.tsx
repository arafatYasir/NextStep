import { Suspense } from "react";
import JobCardWrapper from "./JobCardWrapper";
import { SingleJobCardSkeleton } from "./JobCardsSkeleton";
import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import { Briefcase } from "lucide-react";

async function getJobData(id: string) {
    await connectToDatabase();
    const record = await JobRecord.findById(id);
    return JSON.parse(JSON.stringify(record));
}

const JobsRecordsList = async ({ userId }: { userId: string | undefined }) => {
    if (!userId) return null;

    // Fetching ONLY the IDs first
    await connectToDatabase();
    const jobIds = await JobRecord.find({ userId }, { _id: 1 }).sort({ createdAt: -1 });

    if (jobIds.length === 0) {
        return (
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
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {jobIds.map((job) => {
                const jobPromise = getJobData(job._id.toString());

                return (
                    <Suspense key={job._id.toString()} fallback={<SingleJobCardSkeleton />}>
                        <JobCardWrapper jobPromise={jobPromise} />
                    </Suspense>
                );
            })}
        </div>
    );
};

export default JobsRecordsList;

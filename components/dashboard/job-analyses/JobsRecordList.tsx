import { Suspense } from "react";
import JobCardWrapper from "./JobCardWrapper";
import { SingleJobCardSkeleton } from "./SingleJobCardSkeleton";
import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import { Briefcase } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getJobData } from "@/src/helpers/apiCalls";

const JobsRecordsList = async () => {
    // Getting user id
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();
    const userId = user?.id;

    // If user is not found then return
    if (!userId) {
        return null;
    };

    // Fetching ONLY the job IDs first
    await connectToDatabase();
    const jobIds = await JobRecord.find({ userId }, { _id: 1 }).sort({ createdAt: -1 });

    if (jobIds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 rounded-xl border border-dashed border-[rgb(var(--border-hover))] bg-card">
                <div className="size-16 rounded-full bg-[rgb(var(--bg-primary))]/10 flex items-center justify-center text-[rgb(var(--bg-primary))] mb-4">
                    <Briefcase className="size-8" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                    No job analyses yet
                </h3>
                <p className="text-sm font-sans text-[rgb(var(--text-tertiary))] max-w-xs text-center mt-2">
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

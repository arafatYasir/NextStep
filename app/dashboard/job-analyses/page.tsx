import JobCard from "@/components/dashboard/job-analyses/JobCard";
import JobCardsSkeleton from "@/components/dashboard/job-analyses/JobCardsSkeleton";
import JobsRecordsList from "@/components/dashboard/job-analyses/JobsRecordList";
import { createClient } from "@/lib/supabase/server"
import { Suspense } from "react";

const JobAnalyses = async () => {
    // Getting user id
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();
    const userId = user?.id;

    return (
        <section className="flex-1 p-8 space-y-8 max-w-5xl animate-in fade-in duration-500">
            {/* ---- Header ---- */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">
                    Job Analyses
                </h1>
                <p className="text-foreground/80 font-sans text-base">
                    Manage and view your analyzed job descriptions and results.
                </p>
            </div>

            {/* ---- Job Records ---- */}
            <JobsRecordsList userId={userId} />
        </section>
    )
}

export default JobAnalyses
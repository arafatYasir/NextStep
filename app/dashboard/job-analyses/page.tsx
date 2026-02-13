import JobCardsSkeleton from "@/components/dashboard/job-analyses/JobCardsSkeleton";
import JobsRecordsList from "@/components/dashboard/job-analyses/JobsRecordList";
import { Suspense } from "react";

const JobAnalyses = async () => {
    return (
        <section className="flex-1 p-8 space-y-10 max-w-5xl">
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
            <Suspense fallback={<JobCardsSkeleton />}>
                <JobsRecordsList />
            </Suspense>
        </section>
    )
}

export default JobAnalyses
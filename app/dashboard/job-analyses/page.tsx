import JobCardsSkeleton from "@/components/dashboard/job-analyses/JobCardsSkeleton";
import JobsRecordsList from "@/components/dashboard/job-analyses/JobsRecordList";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const JobAnalyses = async () => {
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();
    const userId = user?.id;

    // If user id is not found redirect to sign in page
    if (!userId) {
        redirect("/sign-in");
    }

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
                <JobsRecordsList userId={userId} />
            </Suspense>
        </section>
    )
}

export default JobAnalyses
import ResumeCardSkeletons from "@/components/dashboard/resume-analyses/ResumeCardSkeletons"
import ResumeRecordsList from "@/components/dashboard/resume-analyses/ResumeRecordsList"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react"

const ResumeAnalyses = async () => {
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();
    const userId = user?.id;

    // If user id is not found redirect to sign in page
    if (!userId) {
        redirect("/sign-in");
    }
    return (
        <section className="flex-1 p-4 md:p-8 space-y-6 md:space-y-10 max-w-5xl">
            {/* ---- Header ---- */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-foreground">
                    Resume Analyses
                </h1>
                <p className="text-foreground/80 font-sans text-sm md:text-base">
                    Manage and view your analyzed resume analyses and results.
                </p>
            </div>

            {/* ---- Resume Records ---- */}
            <Suspense fallback={<ResumeCardSkeletons />}>
                <ResumeRecordsList />
            </Suspense>
        </section>
    )
}

export default ResumeAnalyses
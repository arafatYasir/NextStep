import { createClient } from "@/lib/supabase/server";
import { connectToDatabase } from "@/src/database/mongodb";
import { getResumeData } from "@/src/helpers/apiCalls";
import resumeModel from "@/src/models/resume.model";
import { FilePlusCorner } from "lucide-react";
import { Suspense } from "react";
import BuiltResumeCardsWrapper from "./BuiltResumeCardsWrapper";
import SingleBuiltResumeCardSkeleton from "./SingleBuiltResumeCardSkeleton";

const BuiltResumeRecordsList = async () => {
    // Getting user id
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();
    const userId = user?.id;

    // If user is not found then return
    if (!userId) {
        return null;
    };

    // Fetching ONLY the resume IDs first
    await connectToDatabase();
    const resumeIds = await resumeModel.find({ userId }, { _id: 1 }).sort({ createdAt: -1 });

    if (resumeIds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 rounded-xl border border-dashed border-[rgb(var(--border-hover))] bg-card">
                <div className="size-16 rounded-full bg-[rgb(var(--bg-primary))]/10 flex items-center justify-center text-[rgb(var(--bg-primary))] mb-4">
                    <FilePlusCorner className="size-8" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                    No resumes built yet.
                </h3>
                <p className="text-sm font-sans text-[rgb(var(--text-tertiary))] max-w-xs text-center mt-2">
                    Start by building your resumes against job descriptions to see it appear here.
                </p>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-4">
            {resumeIds.map((resume) => {
                const resumePromise = getResumeData(resume._id.toString());

                return (
                    <Suspense key={resume._id.toString()} fallback={<SingleBuiltResumeCardSkeleton />}>
                        <BuiltResumeCardsWrapper resumePromise={resumePromise} />
                    </Suspense>
                );
            })}
        </div>
    )
}

export default BuiltResumeRecordsList
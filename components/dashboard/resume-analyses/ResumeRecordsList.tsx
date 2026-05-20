import { createClient } from "@/lib/supabase/server"
import { connectToDatabase } from "@/src/database/mongodb";
import { getResumeData } from "@/src/helpers/apiCalls";
import resumeAnalysisModel from "@/src/models/resumeAnalysis.model";
import { FileText } from "lucide-react";
import { Suspense } from "react";
import ResumeCardWrapper from "./ResumeCardWrapper";

const ResumeRecordsList = async () => {
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();
    const userId = user?.id;

    if (!userId) {
        return null;
    }

    // Conect to database and fetch resume IDs
    await connectToDatabase();
    const resumeIds = await resumeAnalysisModel.find({ userId }, { _id: 1 }).sort({ createdAt: -1 });

    if (resumeIds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 rounded-xl border border-dashed border-[rgb(var(--border-hover))] bg-card">
                <div className="size-16 rounded-full bg-[rgb(var(--bg-primary))]/10 flex items-center justify-center text-[rgb(var(--bg-primary))] mb-4">
                    <FileText className="size-8" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                    No resume analyses yet
                </h3>
                <p className="text-sm font-sans text-[rgb(var(--text-tertiary))] max-w-xs text-center mt-2">
                    Start by analyzing your resumes against job descriptions to see it appear here.
                </p>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-4">
            {
                resumeIds.map((resume) => {
                    const resumePromise = getResumeData(resume._id.toString());

                    return (
                        <Suspense key={resume._id.toString()} fallback="Loading a single resume...">
                            <ResumeCardWrapper resumePromise={resumePromise} />
                        </Suspense>
                    )
                })
            }
        </div>
    )
}

export default ResumeRecordsList
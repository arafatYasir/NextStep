import { Suspense } from "react";
import { connectToDatabase } from "@/src/database/mongodb";
import CoverLetterRecord from "@/src/models/coverLetter.model";
import { FileText } from "lucide-react";
import { getCoverLetterData } from "@/src/helpers/apiCalls";
import LetterCardWrapper from "./LetterCardWrapper";
import SingleLetterCardSkeleton from "./SingleLetterCardSkeleton";

const LettersRecordsList = async ({ userId }: { userId: string | null }) => {
    // If user is not found then return
    if (!userId) {
        return null;
    }

    // Fetching ONLY the cover letter IDs first
    await connectToDatabase();
    const letterIds = await CoverLetterRecord.find({ userId }, { _id: 1 }).sort({ createdAt: -1 });

    if (letterIds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 rounded-xl border border-dashed border-[rgb(var(--border-hover))] bg-card">
                <div className="size-16 rounded-full bg-[rgb(var(--bg-primary))]/10 flex items-center justify-center text-[rgb(var(--bg-primary))] mb-4">
                    <FileText className="size-8" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                    No cover letters yet
                </h3>
                <p className="text-sm font-sans text-[rgb(var(--text-tertiary))] max-w-xs text-center mt-2">
                    Generate your first cover letter to see it appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {letterIds.map((letter) => {
                const letterPromise = getCoverLetterData(letter._id.toString());

                return (
                    <Suspense key={letter._id.toString()} fallback={<SingleLetterCardSkeleton />}>
                        <LetterCardWrapper letterPromise={letterPromise} />
                    </Suspense>
                );
            })}
        </div>
    );
};

export default LettersRecordsList;
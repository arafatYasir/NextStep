import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { COVER_LETTER_AI_STEPS } from "@/lib/aiSteps";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";

const CoverLetterLoadingView = ({
    activeStep,
    completedSteps,
}: {
    activeStep: number;
    completedSteps: number[];
}) => {
    return (
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-8 lg:py-12 min-h-[calc(100vh-96px)]">
                {/* ---- Left Panel: AI Progress ---- */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="sticky top-8 lg:top-12 space-y-6">
                        {/* ---- Progress Header ---- */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[rgb(var(--bg-primary))] to-[rgb(var(--bg-primary-hover))] flex items-center justify-center shadow-lg shadow-[rgb(var(--shadow-primary))]/50">
                                    <Sparkles className="size-5 text-white" />
                                </div>
                                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-card" />
                            </div>
                            <div>
                                <p className="font-heading font-bold text-foreground text-sm sm:text-base">AI is working</p>
                                <p className="font-sans text-xs sm:text-sm text-[rgb(var(--text-tertiary))]">
                                    {completedSteps.length} of {COVER_LETTER_AI_STEPS.length} steps
                                </p>
                            </div>
                        </div>

                        {/* ---- Progress Bar ---- */}
                        <div className="w-full h-1.5 rounded-full bg-[rgb(var(--border-default))]/50 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-linear-to-r from-[rgb(var(--bg-primary))] to-[rgb(var(--bg-primary-hover))] transition-all duration-500 ease-in-out"
                                style={{ width: `${(completedSteps.length / COVER_LETTER_AI_STEPS.length) * 100}%` }}
                            />
                        </div>

                        {/* ---- Checklist ---- */}
                        <div className="space-y-2">
                            {COVER_LETTER_AI_STEPS.map((step, idx) => {
                                const isCompleted = completedSteps.includes(idx);
                                const isActive = idx === activeStep;
                                const isPending = !isCompleted && !isActive;

                                return (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-250 ease-in-out",
                                            isActive && "bg-[rgb(var(--bg-primary))]/6",
                                            isCompleted && "opacity-80"
                                        )}
                                    >
                                        {/* ---- Step Indicator ---- */}
                                        <div className="shrink-0">
                                            {isCompleted ? (
                                                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center animate-in fade-in zoom-in duration-250">
                                                    <Check className="size-3.5 text-emerald-500" strokeWidth={3} />
                                                </div>
                                            ) : isActive ? (
                                                <div className="w-6 h-6 rounded-full bg-[rgb(var(--bg-primary))]/15 flex items-center justify-center">
                                                    <Spinner className="size-3.5 text-[rgb(var(--bg-primary-hover))]" />
                                                </div>
                                            ) : (
                                                <div className="w-[23px] h-[23px] rounded-full border border-[rgb(var(--border-default))] bg-card" />
                                            )}
                                        </div>

                                        {/* ---- Step Label ---- */}
                                        <span
                                            className={cn(
                                                "font-sans font-medium text-sm transition-colors duration-250",
                                                isActive && "text-foreground",
                                                isCompleted && "text-foreground",
                                                isPending && "text-[rgb(var(--text-muted))]"
                                            )}
                                        >
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Subtle Tip */}
                        <div className="p-3 rounded-lg border border-[rgb(var(--border-default))] bg-card">
                            <p className="text-sm font-sans text-[rgb(var(--text-tertiary))] leading-relaxed">
                                💡 The AI personalizes every section of your cover letter to align with the job description and highlight your strengths.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ---- Right Panel: Cover Letter Skeleton ---- */}
                <div className="lg:col-span-8 xl:col-span-9 flex items-start justify-center">
                    <div className="w-full max-w-3xl bg-card rounded-xl shadow-xl border border-[rgb(var(--border-default))] p-5 lg:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* ---- Header: applicant + meta ---- */}
                        <div className="space-y-3 pb-6 border-b border-[rgb(var(--border-default))]">
                            <Skeleton className="h-7 w-48 rounded" />
                            <Skeleton className="h-4 w-64 rounded" />
                            <div className="flex flex-wrap gap-2 pt-1">
                                <Skeleton className="h-4 w-32 rounded" />
                                <Skeleton className="h-4 w-40 rounded" />
                            </div>
                        </div>

                        {/* ---- Recipient block ---- */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-40 rounded" />
                            <Skeleton className="h-4 w-52 rounded" />
                        </div>

                        {/* ---- Greeting ---- */}
                        <Skeleton className="h-5 w-44 rounded" />

                        {/* ---- Opening ---- */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-[92%] rounded" />
                            <Skeleton className="h-4 w-[80%] rounded" />
                        </div>

                        {/* ---- Body paragraphs ---- */}
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="space-y-2">
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-[95%] rounded" />
                                <Skeleton className="h-4 w-[70%] rounded" />
                            </div>
                        ))}

                        {/* ---- Closing ---- */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[85%] rounded" />
                            <Skeleton className="h-4 w-[60%] rounded" />
                        </div>

                        {/* ---- Signature ---- */}
                        <div className="space-y-2 pt-2">
                            <Skeleton className="h-4 w-24 rounded" />
                            <Skeleton className="h-5 w-40 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CoverLetterLoadingView;
import Container from "@/components/Container";
import { Spinner } from "@/components/ui/spinner";
import { RESUME_BUILDING_AI_STEPS } from "@/lib/aiSteps";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";
import ResumeShimmerSkeleton from "./ResumeShimmerSkeleton";

const LoadingView = ({
    activeStep,
    completedSteps,
}: {
    activeStep: number;
    completedSteps: number[];
}) => {
    return (
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-8 lg:py-12 min-h-[calc(100vh-100px)]">
                {/* ---- Left Panel: AI Progress ---- */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="sticky top-8 space-y-6">
                        {/* Progress Header */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[rgb(var(--bg-primary))] to-[rgb(var(--bg-primary-hover))] flex items-center justify-center shadow-lg shadow-[rgb(var(--shadow-primary))]/20">
                                    <Sparkles className="size-5 text-white" />
                                </div>
                                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-card animate-pulse" />
                            </div>
                            <div>
                                <p className="font-heading font-bold text-foreground text-sm sm:text-base">AI is working</p>
                                <p className="font-sans text-xs text-[rgb(var(--text-tertiary))]">
                                    {completedSteps.length} of {RESUME_BUILDING_AI_STEPS.length} steps
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 rounded-full bg-[rgb(var(--border-default))]/50 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-linear-to-r from-[rgb(var(--bg-primary))] to-[rgb(var(--bg-primary-hover))] transition-all duration-700 ease-out"
                                style={{ width: `${(completedSteps.length / RESUME_BUILDING_AI_STEPS.length) * 100}%` }}
                            />
                        </div>

                        {/* Checklist */}
                        <div className="space-y-1">
                            {RESUME_BUILDING_AI_STEPS.map((step, idx) => {
                                const isCompleted = completedSteps.includes(idx);
                                const isActive = idx === activeStep;
                                const isPending = !isCompleted && !isActive;

                                return (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300",
                                            isActive && "bg-[rgb(var(--bg-primary))]/6",
                                            isCompleted && "opacity-70"
                                        )}
                                    >
                                        {/* Step Indicator */}
                                        <div className="shrink-0">
                                            {isCompleted ? (
                                                <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center animate-in fade-in zoom-in duration-300">
                                                    <Check className="size-3.5 text-emerald-500" strokeWidth={3} />
                                                </div>
                                            ) : isActive ? (
                                                <div className="w-6 h-6 rounded-full bg-[rgb(var(--bg-primary))]/10 flex items-center justify-center">
                                                    <Spinner className="size-3.5 text-[rgb(var(--bg-primary-hover))]" />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 rounded-full border border-[rgb(var(--border-default))] bg-card" />
                                            )}
                                        </div>

                                        {/* Step Label */}
                                        <span
                                            className={cn(
                                                "font-sans text-sm transition-colors duration-300",
                                                isActive && "text-foreground font-medium",
                                                isCompleted && "text-[rgb(var(--text-tertiary))]",
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
                        <div className="px-3 py-3 rounded-lg border border-dashed border-[rgb(var(--border-default))] bg-card">
                            <p className="text-xs font-sans text-[rgb(var(--text-tertiary))] leading-relaxed">
                                💡 The AI tailors every section of your resume to match the job description for maximum ATS compatibility.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ---- Right Panel: Shimmer Resume Skeleton ---- */}
                <div className="lg:col-span-8 xl:col-span-9 flex items-start justify-center">
                    <ResumeShimmerSkeleton />
                </div>
            </div>
        </Container>
    );
};

export default LoadingView;
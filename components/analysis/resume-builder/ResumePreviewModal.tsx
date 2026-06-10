"use client";

import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { RESUME_BUILDING_AI_STEPS } from "@/lib/aiSteps";
import LoadingView from "./ResumeLoadingView";
import ResumeResultView from "./ResumeResultView";

interface ResumePreviewModalProps {
    result: ResumeData;
    onClose: () => void;
    isLoading: boolean;
}

const ResumePreviewModal = ({ result, onClose, isLoading }: ResumePreviewModalProps) => {
    // States
    const [activeStep, setActiveStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    // Extra hooks
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Preventing background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        }
    }, []);

    // Cycling through AI steps while loading
    useEffect(() => {
        if (!isLoading) {
            // Mark all steps as completed when loading finishes
            setCompletedSteps(RESUME_BUILDING_AI_STEPS.map((_, i) => i));
            setActiveStep(RESUME_BUILDING_AI_STEPS.length);

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            return;
        }

        // Reset on mount
        let currentStep = 0;

        const advanceStep = () => {
            // If all steps are done but the "loading" is still going on, then keep running the last step until "loading" finishes otherwise move to next step
            if (currentStep < RESUME_BUILDING_AI_STEPS.length - 1) {
                const stepToComplete = currentStep;
                setCompletedSteps(prev => [...prev, stepToComplete]);
                currentStep++;

                if (currentStep <= RESUME_BUILDING_AI_STEPS.length - 1) {
                    setActiveStep(currentStep);
                    timerRef.current = setTimeout(advanceStep, RESUME_BUILDING_AI_STEPS[currentStep].duration);
                }
            }
        };

        timerRef.current = setTimeout(advanceStep, RESUME_BUILDING_AI_STEPS[currentStep].duration);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isLoading]);

    return (
        <div className="fixed inset-0 z-100 flex flex-col bg-[rgb(var(--bg-body))]">
            {/* ---- Header ---- */}
            <div className="flex-none py-4 border-b border-[rgb(var(--border-default))] bg-card z-10 shadow-sm">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground font-heading tracking-tight">
                                {isLoading ? "Building Your Resume" : "Resume Preview"}
                            </h2>
                            <p className="text-foreground/80 mt-1 font-sans text-sm sm:text-base">
                                {isLoading
                                    ? "Our AI is crafting a tailored resume based on your details."
                                    : "Your AI-generated resume is ready. Review and download."
                                }
                            </p>
                        </div>
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            variant="secondary"
                            className="border border-[rgb(var(--border-default))] text-foreground/80 hover:text-foreground active:text-foreground has-[>svg]:p-2"
                            aria-label="Close Modal"
                        >
                            <X size={24} />
                        </Button>
                    </div>
                </Container>
            </div>

            {/* ---- Content ---- */}
            <div className="flex-1 overflow-y-auto scrollbar-custom scroll-smooth">
                {isLoading ? (
                    <LoadingView activeStep={activeStep} completedSteps={completedSteps} />
                ) : (
                    <ResumeResultView result={result} isPrintMode={false} />
                )}
            </div>
        </div>
    );
};

export default ResumePreviewModal;
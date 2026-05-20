"use client";

import { Briefcase, CalendarDays, Clock, ExternalLink, FileText, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ResumeAnalysisModal from "../../analysis/resume/ResumeAnalysisModal";
import ConfirmationModal from "@/components/ConfirmationModal";

interface ResumeCardProps {
    id: string;
    resumeFileName: string;
    jobTitle: string;
    status: string;
    analysis: ResumeAnalysis | null;
    createdAt: string | Date;
}

const ResumeCard = ({ id, resumeFileName, jobTitle, status, analysis, createdAt }: ResumeCardProps) => {
    // States
    const [open, setOpen] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);

    // ATS score (only when analysis completed)
    const atsScore = analysis?.atsScore;
    const showAtsScore = status === "completed" && atsScore != null;

    // Format time & date efficiently
    const date = new Date(createdAt);
    const formattedTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const formattedDate = date.toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Handle outside clicks when modal is open
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setShowDeletePopup(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        if (showDeletePopup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto";
        }
    }, [showDeletePopup]);

    // Functions
    const handleDeleteResumeRecord = async (_id: string | number) => {
        // Delete API will be wired up later
    }

    return (
        <>
            <div className="group flex-1 flex items-start gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4 transition-all duration-250 hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] hover:shadow-md active:shadow-md">
                {/* ---- Resume Icon Wrapper ---- */}
                <div className="flex size-11 items-center justify-center rounded-lg bg-[rgb(var(--bg-primary))]/10 text-[rgb(var(--bg-primary))] shrink-0 transition-transform group-hover:scale-105">
                    <FileText className="size-5" />
                </div>

                {/* ---- Resume Content ---- */}
                <div className="flex-1 flex flex-col min-w-0 pr-2">
                    <h3 className="truncate text-base font-heading font-semibold text-foreground leading-tight">
                        {resumeFileName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 min-w-0">
                        <Briefcase className="size-4 shrink-0 text-[rgb(var(--text-tertiary))]" />
                        <p className="truncate text-sm text-[rgb(var(--text-tertiary))] font-sans">
                            Job Title: <span className="font-medium">{jobTitle}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5">
                        {/* ---- Status Label ---- */}
                        <div className={cn("flex items-center gap-1.5 px-1.5 py-1 rounded-full",
                            status === "completed" ? "bg-emerald-50" :
                                status === "failed" ? "bg-red-50" :
                                    "bg-amber-50"
                        )}>
                            <div className={cn(
                                "size-1.5 rounded-full",
                                status === "completed" ? "bg-emerald-500" :
                                    status === "failed" ? "bg-red-500" :
                                        "bg-amber-500"
                            )} />
                            <span className={cn(
                                "text-xs font-sans font-medium capitalize",
                                status === "completed" ? "text-emerald-700" :
                                    status === "failed" ? "text-red-600" :
                                        "text-amber-700"
                            )}>
                                {status}
                            </span>
                        </div>

                        {/* ---- Date ---- */}
                        <div className="flex items-center gap-1.5 text-xs text-[rgb(var(--text-tertiary))] font-sans">
                            <CalendarDays className="size-3.5" />
                            <span>{formattedDate}</span>
                        </div>

                        {/* ---- Time ---- */}
                        <div className="flex items-center gap-1.5 text-xs text-[rgb(var(--text-tertiary))] font-sans">
                            <Clock className="size-3.5" />
                            <span>{formattedTime}</span>
                        </div>

                        {/* ---- ATS Score ---- */}
                        {showAtsScore && (
                            <div className={cn(
                                "px-1.5 py-1 rounded-full text-xs font-sans font-medium",
                                atsScore >= 80 ? "bg-emerald-50 border-emerald-300 text-emerald-700" :
                                    atsScore >= 60 ? "bg-amber-50 border-amber-300 text-amber-700" :
                                        "bg-rose-50 border-rose-300 text-rose-700"
                            )}>
                                <span>ATS Score: </span>
                                <span>{atsScore}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ---- Action Buttons ---- */}
                <div className="flex items-center gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                    <Button
                        variant="outline"
                        title="Open Resume Analysis"
                        className="size-9 border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] text-foreground transition-colors"
                        onClick={() => setOpen(true)}
                        disabled={status !== "completed"}
                    >
                        <ExternalLink className="size-4" />
                    </Button>

                    <Button
                        variant="outline"
                        title="Delete Record"
                        className="size-9 border-[rgb(var(--border-default))] text-red-500 hover:text-red-500 active:text-red-500 hover:border-red-500 active:border-red-500 transition-colors"
                        onClick={() => setShowDeletePopup(true)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>

            {/* ---- Resume Analysis Modal ---- */}
            {open && (
                <ResumeAnalysisModal
                    isLoading={false}
                    analysis={analysis}
                    onClose={() => setOpen(false)}
                />
            )}

            {/* ---- Delete Popup ---- */}
            {showDeletePopup && (
                <ConfirmationModal
                    title="Delete the Resume Record?"
                    ref={modalRef}
                    onClose={() => setShowDeletePopup(false)}
                    action={handleDeleteResumeRecord}
                    data={id}
                />
            )}
        </>
    );
};

export default ResumeCard;

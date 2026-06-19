"use client";

import { Briefcase, CalendarDays, Clock, ExternalLink, FileText, ScanEye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ResumeAnalysisModal from "../../analysis/resume/ResumeAnalysisModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ResumeAnalysis } from "@/types/global";

interface ResumeCardProps {
    id: string;
    resumeFileName: string;
    resumeFileType: string;
    jobTitle: string;
    status: string;
    analysis: ResumeAnalysis | null;
    createdAt: string | Date;
}

const getFileTypeLabel = (mimeType: string) => {
    if (mimeType === "application/pdf") return "PDF";
    if (mimeType.includes("wordprocessingml")) return "DOCX";

    return "FILE";
};

const getFileTypeStyles = (label: string) => {
    if (label === "PDF") {
        return "bg-red-50 text-red-700 border-red-200/80";
    }
    if (label === "DOCX") {
        return "bg-blue-50 text-blue-700 border-blue-200/80";
    }
    return "bg-slate-50 text-slate-600 border-slate-200/80";
};

const getReadabilityStyles = (readability: ResumeAnalysis["metaAnalysis"]["atsReadability"]) => {
    switch (readability) {
        case "Excellent":
        case "Good":
            return "bg-emerald-50 border-emerald-200/80 text-emerald-700";
        case "Average":
            return "bg-amber-50 border-amber-200/80 text-amber-700";
        case "Poor":
            return "bg-rose-50 border-rose-200/80 text-rose-700";
    }
};

const ResumeCard = ({
    id,
    resumeFileName,
    resumeFileType,
    jobTitle,
    status,
    analysis,
    createdAt,
}: ResumeCardProps) => {
    // States
    const [open, setOpen] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    // Derived display values
    const fileTypeLabel = getFileTypeLabel(resumeFileType);
    const atsScore = analysis?.atsScore;
    const atsReadability = analysis?.metaAnalysis?.atsReadability;
    const showAtsScore = status === "completed" && atsScore != null;
    const showAtsReadability = status === "completed" && !!atsReadability;

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
    const handleDeleteResumeRecord = async () => {
        try {
            const res = await fetch(`/api/resume-results/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.status === "OK") {
                // Show returned message and close delete modal
                toast.message(data.message);
                setShowDeletePopup(false);

                // Refresh the page to reflect the deletion
                router.refresh();
            }
        }
        catch (e) {
            console.error(e);
            toast.error("Failed to delete resume record.");
        }
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
                    <div className="flex items-center gap-2 min-w-0">
                        <h3 className="truncate flex-1 min-w-0 text-base font-heading font-semibold text-foreground leading-tight">
                            {resumeFileName}
                        </h3>
                        <span
                            className={cn(
                                "shrink-0 inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-sans font-bold uppercase tracking-wider",
                                getFileTypeStyles(fileTypeLabel)
                            )}
                            title={`File type: ${fileTypeLabel}`}
                        >
                            {fileTypeLabel}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 min-w-0">
                        <Briefcase className="size-4 shrink-0 text-[rgb(var(--text-tertiary))]" />
                        <p className="truncate text-sm text-[rgb(var(--text-tertiary))] font-sans">
                            Target Job Title: <span className="font-medium text-foreground/80">{jobTitle}</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-1.5">
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
                            <div
                                className={cn(
                                    "flex items-center gap-1 px-1.5 py-1 rounded-full border text-xs font-sans font-medium",
                                    atsScore >= 80
                                        ? "bg-emerald-50 border-emerald-200/80 text-emerald-700"
                                        : atsScore >= 60
                                            ? "bg-amber-50 border-amber-200/80 text-amber-700"
                                            : "bg-rose-50 border-rose-200/80 text-rose-700"
                                )}
                            >
                                <span className="opacity-80">ATS Score:</span>
                                <span className="font-semibold">{atsScore}</span>
                            </div>
                        )}

                        {/* ---- ATS Readability ---- */}
                        {showAtsReadability && atsReadability && (
                            <div
                                className={cn(
                                    "flex items-center gap-1 px-1.5 py-1 rounded-full border text-xs font-sans font-medium",
                                    getReadabilityStyles(atsReadability)
                                )}
                            >
                                <ScanEye className="size-3 shrink-0 opacity-80" />
                                <span className="opacity-80">Readability:</span>
                                <span className="font-semibold">{atsReadability}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ---- Action Buttons ---- */}
                <div className="flex items-center gap-2 shrink-0 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-250">
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
                />
            )}
        </>
    );
};

export default ResumeCard;

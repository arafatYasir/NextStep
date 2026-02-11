"use client";

import { Briefcase, Clock, ExternalLink, Trash2, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import JobDescAnalysisModal from "../../analysis/JobDescAnalysisModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface JobCardProps {
    id: string;
    jobRole: string;
    status: string;
    analysis: JobAnalysis;
    createdAt: string | Date;
}

const JobCard = ({ id, jobRole, status, analysis, createdAt }: JobCardProps) => {
    // States
    const [open, setOpen] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

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
            if(modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setShowDeletePopup(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        if(showDeletePopup) {
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
    const handleDeleteJobRecord = async (id: string | number) => {
        try {
            const res = await fetch(`/api/job-records/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if(data.status === "OK") {
                toast.success(data.message);
                router.refresh();
            }
            else {
                toast.error(data.message);
            }
        }
        catch (e) {
            console.error(e);
            toast.error("Failed to delete job record.");
        }
    }

    console.log(analysis);
    return (
        <>
            <div className="group flex-1 flex items-center gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4 transition-all duration-250 hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] hover:shadow-md active:shadow-md">
                {/* ---- Job Icon Wrapper ---- */}
                <div className="flex size-11 items-center justify-center rounded-lg bg-[rgb(var(--bg-primary))]/10 text-[rgb(var(--bg-primary))] shrink-0 transition-transform group-hover:scale-105">
                    <Briefcase className="size-5" />
                </div>

                {/* ---- Job Content ---- */}
                <div className="flex-1 flex flex-col min-w-0 pr-2">
                    <h3 className="truncate text-base font-heading font-semibold text-foreground leading-tight">
                        {jobRole}
                    </h3>
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
                    </div>
                </div>

                {/* ---- Action Buttons ---- */}
                <div className="flex items-center gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                    <Button
                        variant="outline"
                        title="Open Job Analysis"
                        className="size-9 border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] text-foreground transition-colors"
                        onClick={() => setOpen(true)}
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

            {/* ---- Job Analysis Modal ---- */}
            {open && (
                <JobDescAnalysisModal
                    isLoading={false}
                    analysis={analysis}
                    onClose={() => setOpen(false)}
                />
            )}

            {/* ---- Delete Popup ---- */}
            {showDeletePopup && (
                <ConfirmationModal
                    title="Delete the Job Record?"
                    ref={modalRef}
                    onClose={() => setShowDeletePopup(false)}
                    action={handleDeleteJobRecord}
                    data={id}
                />
            )}
        </>
    );
};

export default JobCard;

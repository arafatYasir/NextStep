// components/dashboard/cover-letters/LetterCard.tsx
"use client";

import { FileText, Clock, ExternalLink, Trash2, CalendarDays, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import CoverLetterModal from "../../analysis/cover-letter/CoverLetterModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CoverLetter } from "@/types/global";

interface LetterCardProps {
    id: string;
    jobTitle: string;
    companyName: string;
    status: string;
    letter: CoverLetter;
    createdAt: string | Date;
}

const LetterCard = ({ id, jobTitle, companyName, status, letter, createdAt }: LetterCardProps) => {
    // States
    const [open, setOpen] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    // Format time & date efficiently
    const date = new Date(createdAt);
    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    const formattedDate = date.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    // Handle outside clicks when delete popup is open
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setShowDeletePopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        if (showDeletePopup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto";
        };
    }, [showDeletePopup]);

    // Functions
    const handleDeleteLetterRecord = async () => {
        try {
            const res = await fetch(`/api/cover-letters/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to delete cover letter");
            }

            toast.success(data.message);
            router.refresh();
        } catch (e) {
            console.error(e);
            toast.error("Failed to delete cover letter record.");
        }
    };

    return (
        <>
            <div className="group flex-1 flex items-center gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4 transition-all duration-250 hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] hover:shadow-md active:shadow-md">
                {/* ---- Letter Icon Wrapper ---- */}
                <div className="flex size-11 items-center justify-center rounded-lg bg-[rgb(var(--bg-primary))]/10 text-[rgb(var(--bg-primary))] shrink-0 transition-transform group-hover:scale-105">
                    <FileText className="size-5" />
                </div>

                {/* ---- Letter Content ---- */}
                <div className="flex-1 flex flex-col min-w-0 pr-2">
                    <h3 className="truncate text-base font-heading font-semibold text-foreground leading-tight">
                        {jobTitle}
                    </h3>

                    <div className="flex items-center gap-4 mt-1.5">
                        {/* ---- Company ---- */}
                        <div className="flex items-center gap-1.5 text-xs text-[rgb(var(--text-tertiary))] font-sans min-w-0">
                            <Building2 className="size-3.5 shrink-0" />
                            <span className="truncate">{companyName}</span>
                        </div>

                        {/* ---- Status Label ---- */}
                        <div className={cn("flex items-center gap-1.5 px-1.5 py-1 rounded-full shrink-0",
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
                        <div className="flex items-center gap-1.5 text-xs text-[rgb(var(--text-tertiary))] font-sans shrink-0">
                            <CalendarDays className="size-3.5" />
                            <span>{formattedDate}</span>
                        </div>

                        {/* ---- Time ---- */}
                        <div className="flex items-center gap-1.5 text-xs text-[rgb(var(--text-tertiary))] font-sans shrink-0">
                            <Clock className="size-3.5" />
                            <span>{formattedTime}</span>
                        </div>
                    </div>
                </div>

                {/* ---- Action Buttons ---- */}
                <div className="flex items-center gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                    <Button
                        variant="outline"
                        title="Open Cover Letter"
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

            {/* ---- Cover Letter Modal ---- */}
            {open && (
                <CoverLetterModal
                    isLoading={false}
                    result={letter}
                    onClose={() => setOpen(false)}
                />
            )}

            {/* ---- Delete Popup ---- */}
            {showDeletePopup && (
                <ConfirmationModal
                    title="Delete the Cover Letter?"
                    ref={modalRef}
                    onClose={() => setShowDeletePopup(false)}
                    action={handleDeleteLetterRecord}
                />
            )}
        </>
    );
};

export default LetterCard;
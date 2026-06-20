"use client";

import {
    Briefcase,
    CalendarDays,
    Clock,
    Code2,
    ExternalLink,
    FolderGit2,
    Trash2,
    User,
    FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/ConfirmationModal";
import { toast } from "sonner";
import ResumePreviewModal from "@/components/analysis/resume-builder/ResumePreviewModal";
import { ResumeData } from "@/types/global";

const getExperienceLabel = (count: number) => {
    if (count === 0) return null;
    return count === 1 ? "1 job" : `${count} jobs`;
};

const getStatusBgClass = (status: string) => {
    if (status === "completed") return "bg-emerald-50";
    if (status === "failed") return "bg-red-50";
    return "bg-amber-50";
};

const getStatusDotClass = (status: string) => {
    if (status === "completed") return "bg-emerald-500";
    if (status === "failed") return "bg-red-500";
    return "bg-amber-500";
};

const getStatusTextClass = (status: string) => {
    if (status === "completed") return "text-emerald-700";
    if (status === "failed") return "text-red-600";
    return "text-amber-700";
};

const BuiltResumeCard = ({ data }: { data: ResumeData }) => {
    const {
        resumeTitle,
        resumeType,
        personalInfo,
        experience,
        projects,
        skills,
        status,
        createdAt,
    } = data;

    // States
    const [open, setOpen] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    // Derived display values
    const experienceCount = experience?.length ?? 0;
    const projectCount = projects?.length ?? 0;
    const hasSkills =
        (skills?.languages?.length ?? 0) > 0 ||
        (skills?.frameworksAndLibraries?.length ?? 0) > 0 ||
        (skills?.toolsAndPlatforms?.length ?? 0) > 0;

    const experienceLabel = getExperienceLabel(experienceCount);

    // Format time & date (same logic as ResumeCard)
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

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/resumes/${data?._id || data?.resumeId}`, {
                method: "DELETE"
            });
            const { status, error, message } = await res.json();

            if (status === "OK") {
                toast.message(message);
                router.refresh();
            }
            else {
                console.error(error);
                toast.error(error);
            }
        }
        catch (e) {
            console.error("Resume deletion error: ", e);
            toast.error("Failed to delete the resume.");
        }
    };

    return (
        <>
            <div className="group flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4 transition-all duration-250 hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] hover:shadow-md active:shadow-md">
                <div className="flex items-start gap-4 min-w-0 flex-1 w-full">
                    {/* ---- Icon Wrapper ---- */}
                    <div className="flex size-9 xs:size-10 sm:size-11 items-center justify-center rounded-lg bg-[rgb(var(--bg-primary))]/10 text-[rgb(var(--bg-primary))] shrink-0 transition-transform group-hover:scale-105 mt-0.5 sm:mt-0">
                        <FileText className="size-4 xs:size-4.5 sm:size-5" />
                    </div>

                    {/* ---- Card Content ---- */}
                    <div className="flex-1 flex flex-col min-w-0 pr-2">
                        {/* ---- Resume title + type badge ---- */}
                        <div className="flex items-center gap-2 min-w-0">
                            <h3 className="truncate flex-1 min-w-0 text-xs xs:text-sm sm:text-base font-heading font-semibold text-foreground leading-tight">
                                {resumeTitle}
                            </h3>
                            <span
                                className={cn(
                                    "shrink-0 inline-flex items-center px-1.5 py-0.5 xs:px-2 rounded-md border text-[9px] xs:text-[10px] font-sans font-bold uppercase tracking-wider",
                                    resumeType === "Fresher"
                                        ? "bg-violet-50 text-violet-700 border-violet-200"
                                        : "bg-sky-50 text-sky-700 border-sky-200"
                                )}
                                title={`Resume type: ${resumeType}`}
                            >
                                {resumeType}
                            </span>
                        </div>

                        <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 mt-1">
                            {/* ---- Full name ---- */}
                            <div className="flex items-center gap-1 min-w-0">
                                <User className="size-4 xs:size-4.5 shrink-0 text-[rgb(var(--text-tertiary))]" />
                                <p className="truncate text-xs xs:text-sm font-semibold text-foreground/80 font-sans">
                                    {personalInfo?.fullName}
                                </p>
                            </div>

                            {/* ---- Completeness indicators ---- */}
                            <div className="flex items-center gap-2 min-w-0 flex-wrap">
                                {/* ---- Experience ---- */}
                                {experienceLabel && (
                                    <div className="flex items-center gap-1.5 text-[rgb(var(--text-tertiary))] font-sans">
                                        <Briefcase className="size-4 xs:size-4.5 shrink-0" />
                                        <span className="text-xs xs:text-sm font-medium">{experienceLabel}</span>
                                    </div>
                                )}

                                {/* ---- Separator dot ---- */}
                                {experienceLabel && (projectCount > 0 || hasSkills) && (
                                    <span className="text-[rgb(var(--text-tertiary))] text-sm font-bold select-none">·</span>
                                )}

                                {/* ---- Projects ---- */}
                                {projectCount > 0 && (
                                    <div className="flex items-center gap-1.5 text-[rgb(var(--text-tertiary))] font-sans">
                                        <FolderGit2 className="size-4 xs:size-4.5 shrink-0" />
                                        <span className="text-xs xs:text-sm font-medium">{projectCount === 1 ? "1 project" : `${projectCount} projects`}</span>
                                    </div>
                                )}

                                {/* ---- Separator dot ---- */}
                                {projectCount > 0 && hasSkills && (
                                    <span className="text-[rgb(var(--text-tertiary))] text-sm font-medium select-none">·</span>
                                )}

                                {/* ---- Skills ---- */}
                                {hasSkills && (
                                    <div className="flex items-center gap-1.5 text-[rgb(var(--text-tertiary))] font-sans">
                                        <Code2 className="size-4 xs:size-4.5 shrink-0" />
                                        <span className="text-xs xs:text-sm font-medium">Skills added</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ---- Status ---- */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-1.5">
                            <div className={cn(
                                "flex items-center gap-1 px-1 py-0.5 xs:gap-1.5 xs:px-1.5 xs:py-1 rounded-full shrink-0",
                                getStatusBgClass(status)
                            )}>
                                <div className={cn("size-1 xs:size-1.5 rounded-full", getStatusDotClass(status))} />
                                <span className={cn(
                                    "text-[10px] xs:text-xs font-sans font-medium capitalize",
                                    getStatusTextClass(status)
                                )}>
                                    {status}
                                </span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-1.5 text-[10px] xs:text-xs text-[rgb(var(--text-tertiary))] font-sans shrink-0">
                                <CalendarDays className="size-3 xs:size-3.5" />
                                <span>{formattedDate}</span>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-1.5 text-[10px] xs:text-xs text-[rgb(var(--text-tertiary))] font-sans shrink-0">
                                <Clock className="size-3 xs:size-3.5" />
                                <span>{formattedTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---- Action Buttons — identical to ResumeCard ---- */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto lg:opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                    <Button
                        variant="outline"
                        title="Open Built Resume"
                        className="size-7 xs:size-8 sm:size-9 border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] text-foreground transition-colors"
                        onClick={() => setOpen(true)}
                        disabled={status !== "completed"}
                    >
                        <ExternalLink className="size-3.5 xs:size-4" />
                    </Button>

                    <Button
                        variant="outline"
                        title="Delete Record"
                        className="size-7 xs:size-8 sm:size-9 border-[rgb(var(--border-default))] text-red-500 hover:text-red-500 active:text-red-500 hover:border-red-500 active:border-red-500 transition-colors"
                        onClick={() => setShowDeletePopup(true)}
                    >
                        <Trash2 className="size-3.5 xs:size-4" />
                    </Button>
                </div>
            </div>

            {/* ---- Resume Preview Modal ---- */}
            {
                open && <ResumePreviewModal
                    isLoading={false}
                    onClose={() => setOpen(false)}
                    result={data}
                />
            }

            {/* ---- Delete Confirmation Popup ---- */}
            {showDeletePopup && (
                <ConfirmationModal
                    title="Delete the Built Resume?"
                    ref={modalRef}
                    onClose={() => setShowDeletePopup(false)}
                    action={handleDelete}
                />
            )}
        </>
    );
};

export default BuiltResumeCard;
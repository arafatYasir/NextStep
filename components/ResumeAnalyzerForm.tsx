"use client";

import { SubmitEventHandler, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Upload, FileText, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import SignInAlertModal from "./SignInAlertModal";
import ResumeAnalysisModal from "./analysis/resume/ResumeAnalysisModal";
import {
    formatCharCountHint,
    JOB_DESCRIPTION_MIN,
    JOB_TITLE_MAX,
    JOB_TITLE_MIN,
    RESUME_JOB_DESCRIPTION_MAX,
    validateJobDescription,
    validateJobTitle,
} from "@/src/helpers/validation";

interface ErrorState {
    jobRole?: string;
    jobDescription?: string;
    resume?: string;
}

const ACCEPTED_RESUME_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ResumeAnalyzerForm = () => {
    // States
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<ErrorState>({});
    const [isDragging, setIsDragging] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResumeAnalysis | null>(null);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
    const resumeInputRef = useRef<HTMLInputElement | null>(null);
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Handling outside clicks
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setShowSignInModal(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Clearing polling interval on component unmount
    useEffect(() => {
        if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
        }
    }, []);

    const isAcceptedResumeFile = (resumeFile: File) => {
        return ACCEPTED_RESUME_TYPES.includes(resumeFile.type);
    }

    // Handlers
    const handleChangeJobRole = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobRole(e.target.value.slice(0, 50));

        if (errors.jobRole) {
            setErrors(prev => ({
                ...prev,
                jobRole: ""
            }));
        }
    };

    const handleChangeJobDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJobDescription(e.target.value.slice(0, 2000));

        if (errors.jobDescription) {
            setErrors(prev => ({
                ...prev,
                jobDescription: ""
            }));
        }
    };

    const handleCheckErrors = () => {
        const tempErrors: ErrorState = {};

        const titleError = validateJobTitle(jobRole.trim());
        if (titleError) {
            tempErrors.jobRole = titleError;
        }

        const descriptionError = validateJobDescription(
            jobDescription.trim(),
            RESUME_JOB_DESCRIPTION_MAX
        );
        if (descriptionError) {
            tempErrors.jobDescription = descriptionError;
        }

        if (!file) {
            tempErrors.resume = "Resume is required";
        }
        else if (!isAcceptedResumeFile(file)) {
            tempErrors.resume = "File type must be PDF or DOCX";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length > 0;
    };

    const handleClickResumeUpload = () => {
        if (resumeInputRef.current) {
            resumeInputRef.current.click();
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();

        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];

        if (droppedFile && isAcceptedResumeFile(droppedFile)) {
            setFile(droppedFile);

            if (errors.resume) {
                setErrors(prev => ({
                    ...prev,
                    resume: ""
                }));
            }
        }
        else {
            toast.error("File is missing or file type is not supported!");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        if (isAcceptedResumeFile(selectedFile)) {
            setFile(selectedFile);

            if (errors.resume) {
                setErrors(prev => ({
                    ...prev,
                    resume: ""
                }));
            }
        }
        else {
            toast.error("File type is not supported! Please upload a PDF or DOCX file.");
        }
    };

    const removeFile = () => setFile(null);

    const formatFileSize = (size: number) => {
        if (size < 1024) return `${size} bytes`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;

        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }

    const handleAnalyze: SubmitEventHandler<HTMLFormElement> = async (e) => {
        // Prevent the default behavior
        e.preventDefault();

        try {
            // Clear previous errors
            setErrors({});

            // Check for errors
            if (handleCheckErrors()) {
                return;
            }

            // Checking if the user is logged in or not
            const supabase = createClient();

            const { data: { user } } = await supabase.auth.getUser();

            // If user is not logged in return
            if (!user) {
                setShowSignInModal(true);
                return;
            }

            // Start the loading
            setLoading(true);

            // Creating a form data
            const formData = new FormData();
            formData.append("jobTitle", jobRole.trim());
            formData.append("jobDescription", jobDescription.trim());
            formData.append("resume", file!);

            // Calling the API
            const res = await fetch("/api/analyze-resume", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            const { resumeId, status, message } = data;

            // If any error happens
            if (status === "ERROR") {
                toast.error(message);
                setLoading(false);
                return;
            }
            // If resume id is not found
            else if (!resumeId) {
                toast.error("Failed to upload resume. Please try again.");
                setLoading(false);
                return;
            }

            // Clear any active polling interval first to prevent leakage
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }

            // Check for the result every 2 seconds with interval
            pollIntervalRef.current = setInterval(async () => {
                try {
                    const res = await fetch(`/api/resume-results/${resumeId}`);
                    const resumeData = await res.json();

                    // If response contains 'error' property
                    if (resumeData?.error) {
                        console.error(resumeData?.error);

                        setLoading(false);
                        toast.error(resumeData?.error);

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }

                    if (resumeData.status === "completed") {
                        setResult(resumeData.result);
                        setLoading(false);

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }
                    else if (resumeData.status === "failed") {
                        setResult(null);
                        setLoading(false);

                        toast.error("Failed to analyze resume. Please try again.");

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }
                } catch (e) {
                    console.error("Polling error:", e);
                    toast.error("Network error while checking status.");

                    setLoading(false);

                    if (pollIntervalRef.current) {
                        clearInterval(pollIntervalRef.current);
                    }
                }
            }, 2000);
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong, please try again later.");
        }
    }

    return (
        <>
            <form onSubmit={handleAnalyze} className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-xl p-4 xs:p-6 sm:p-8">
                {/* ---- Job Title Input ---- */}
                <div className="mb-6">
                    <label htmlFor="job-role" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                        Targeted Job Title
                    </label>
                    <Input
                        id="job-role"
                        value={jobRole}
                        onChange={handleChangeJobRole}
                        placeholder="Enter the job title as it appears in the job posting"
                        required={true}
                    />

                    {errors.jobRole && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.jobRole}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatCharCountHint(jobRole.length, JOB_TITLE_MIN, JOB_TITLE_MAX)}
                    </p>
                </div>

                {/* ---- Job Description Input ---- */}
                <div className="mb-6">
                    <label htmlFor="job-description" className="block font-semibold font-heading text-foreground text-sm sm:text-base mb-2">
                        Job Description
                    </label>
                    <Textarea
                        id="job-description"
                        value={jobDescription}
                        onChange={handleChangeJobDescription}
                        placeholder="Paste the full job description to compare against your resume"
                        className="h-40 resize-none scrollbar-custom"
                        required={true}
                    />

                    {errors.jobDescription && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.jobDescription}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatCharCountHint(
                            jobDescription.length,
                            JOB_DESCRIPTION_MIN,
                            RESUME_JOB_DESCRIPTION_MAX
                        )}
                    </p>
                </div>

                {/* ---- Resume Upload Area ---- */}
                <div className="mb-8">
                    <label className="block font-semibold font-heading text-foreground text-sm sm:text-base mb-2">
                        Upload Resume
                    </label>

                    {!file ? (
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={cn(
                                "relative flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed rounded-xl transition-all duration-250 cursor-pointer",
                                isDragging
                                    ? "border-[rgb(var(--border-hover))] bg-[rgb(var(--bg-primary))]/10"
                                    : "border-[rgb(var(--border-default))] bg-slate-50/50 hover:border-[rgb(var(--border-hover))] hover:bg-[rgb(var(--bg-primary))]/10"
                            )}
                            onClick={handleClickResumeUpload}
                        >
                            <Input
                                type="file"
                                className="hidden"
                                accept=".pdf,.docx"
                                onChange={handleFileChange}
                                ref={resumeInputRef}
                            />

                            <div className="size-14 rounded-full bg-card shadow-sm border border-[rgb(var(--border-default))] flex items-center justify-center mb-4 text-[rgb(var(--bg-primary))]">
                                <Upload className="size-6" />
                            </div>
                            <h4 className="text-base font-bold font-heading text-foreground mb-1">
                                Click or drag resume here
                            </h4>
                            <p className="text-sm font-sans text-[rgb(var(--text-secondary))]">
                                Supports PDF and DOCX (Max 5MB)
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-[rgb(var(--border-hover))] bg-[rgb(var(--bg-primary))]/5 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="size-12 rounded-lg bg-[rgb(var(--bg-primary))] flex items-center justify-center text-white">
                                <FileText className="size-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-foreground truncate">
                                    {file.name}
                                </p>
                                <p className="text-sm font-semibold text-[rgb(var(--text-secondary))] truncate">
                                    Size: {formatFileSize(file.size)}
                                </p>
                            </div>
                            <button
                                onClick={removeFile}
                                className="p-2 hover:bg-white active:bg-white border border-transparent hover:border-red-500 active:border-red-500 hover:shadow-md active:shadow-md rounded-full transition-colors text-[rgb(var(--text-tertiary))] hover:text-red-500 active:text-red-500 active:scale-95 cursor-pointer"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                    )}

                    {errors.resume && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.resume}</p>
                    )}
                </div>

                {/* Action Button */}
                <Button
                    className="hover:-translate-y-0.5 active:-translate-y-0.5 transition-all w-full"
                    type="submit"
                >
                    <span className="flex items-center gap-x-2">
                        Analyze Resume
                        <Sparkles className="size-4.5" />
                    </span>
                </Button>
            </form>

            {/* ---- Showing modal to show the result ---- */}
            {(result !== null || loading) && (
                <ResumeAnalysisModal
                    analysis={result}
                    onClose={() => setResult(null)}
                    isLoading={loading}
                />
            )}

            {/* ---- Sign In Modal ---- */}
            {showSignInModal && (
                <SignInAlertModal
                    title="Please sign in to continue your analysis"
                    description="Sign in to generate detailed insights and keep your analysis accessible anytime."
                    onClose={() => setShowSignInModal(false)}
                    ref={modalRef}
                />
            )}
        </>
    );
};

export default ResumeAnalyzerForm;

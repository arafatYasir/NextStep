"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import SignInAlertModal from "./SignInAlertModal";

const ResumeAnalyzerInputForm = () => {
    // States
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Handlers
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

        if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            setFile(droppedFile);
        }
        else {
            toast.error("File is missing or file type is not supported!");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setFile(selectedFile);
    };

    const removeFile = () => setFile(null);

    const formatFileSize = (size: number) => {
        if (size < 1024) return `${size} bytes`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;

        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Checking if the user is logged in or not
            const supabase = createClient();

            const { data: { user } } = await supabase.auth.getUser();

            // If user is not logged in return
            if (!user) {
                setShowSignInModal(true);
                return;
            }

            // Creating a form data
            const formData = new FormData();
            formData.append("jobTitle", jobRole.trim());
            formData.append("jobDescription", jobDescription.trim());
            formData.append("resume", file!);
            formData.append("userId", user.id);

            // Calling the API
            const res = await fetch("/api/analyze-resume", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            const { resumeId, status, message } = data;

            // If job id is not found return
            if (status === "ERROR") {
                toast.error(message);
                setLoading(false);
                return;
            }
            else if (!resumeId) {
                toast.error("Failed to upload resume. Please try again.");
                setLoading(false);
                return;
            }
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong, please try again later.");
        }
    }

    const isDisabled = !jobRole.trim() || !jobDescription.trim() || !file;

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-xl p-4 xs:p-6 sm:p-8">
                {/* ---- Job Title Input ---- */}
                <div className="mb-6">
                    <label htmlFor="job-role" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                        Targeted Job Title
                    </label>
                    <Input
                        id="job-role"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value.slice(0, 50))}
                        placeholder="Enter the job title as it appears in the job posting"
                    />
                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {jobRole.length}/50 characters
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
                        onChange={(e) => setJobDescription(e.target.value.slice(0, 3000))}
                        placeholder="Paste the full job description to compare against your resume"
                        className="h-40 resize-none scrollbar-custom"
                    />
                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {jobDescription.length}/3000 characters
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
                            onClick={() => document.getElementById("resume-upload")?.click()}
                        >
                            <input
                                id="resume-upload"
                                type="file"
                                className="hidden"
                                accept=".pdf,.docx"
                                onChange={handleFileChange}
                            />
                            <div className="size-14 rounded-full bg-card shadow-sm border border-[rgb(var(--border-default))] flex items-center justify-center mb-4 text-[rgb(var(--bg-primary))]">
                                <Upload className="size-6" />
                            </div>
                            <h4 className="text-base font-bold font-heading text-foreground mb-1">
                                Click or drag resume here
                            </h4>
                            <p className="text-sm font-sans text-[rgb(var(--text-secondary))]">
                                Supports PDF and DOCX (Max 10MB)
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-[rgb(var(--border-hover))] bg-[rgb(var(--bg-primary))]/5 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="size-12 rounded-lg bg-[rgb(var(--bg-primary))] flex items-center justify-center text-white">
                                <FileText className="size-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate uppercase">
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
                </div>

                {/* Action Button */}
                <Button
                    disabled={isDisabled}
                    type="submit"
                    className="hover:-translate-y-0.5 active:-translate-y-0.5 transition-all w-full"
                >
                    Analyze Resume
                </Button>
            </form>

            {/* ---- Sign In Modal ---- */}
            {showSignInModal && (
                <SignInAlertModal
                    title="Please sign in to continue your analysis"
                    onClose={() => setShowSignInModal(false)}
                    ref={modalRef}
                />
            )}
        </>
    );
};

export default ResumeAnalyzerInputForm;

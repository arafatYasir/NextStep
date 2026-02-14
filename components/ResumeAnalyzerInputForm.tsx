"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ResumeAnalyzerInputForm = () => {
    // States
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

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
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setFile(selectedFile);
    };

    const removeFile = () => setFile(null);

    const isDisabled = !jobRole.trim() || !jobDescription.trim() || !file;

    return (
        <div className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-xl p-4 xs:p-6 sm:p-8">
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
                <label htmlFor="job-description" className="block font-semibold font-heading text-[rgb(var(--text-primary))] text-sm sm:text-base mb-2">
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
                <label className="block font-semibold font-heading text-[rgb(var(--text-primary))] text-sm sm:text-base mb-2">
                    Upload Resume
                </label>

                {!file ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={cn(
                            "relative flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed rounded-2xl transition-all duration-250 cursor-pointer",
                            isDragging
                                ? "border-[rgb(var(--border-hover))] bg-[rgb(var(--bg-primary))]/5"
                                : "border-[rgb(var(--border-default))] bg-slate-50/50 hover:border-[rgb(var(--border-hover))] hover:bg-[rgb(var(--bg-primary))]/5"
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
                        <div className="size-14 rounded-full bg-white shadow-sm border border-[rgb(var(--border-default))] flex items-center justify-center mb-4 text-[rgb(var(--bg-primary))]">
                            <Upload className="size-6" />
                        </div>
                        <h4 className="text-base font-bold font-heading text-[rgb(var(--text-primary))] mb-1">
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
                            <p className="text-sm font-semibold text-[rgb(var(--text-primary))] truncate uppercase">
                                {file.name}
                            </p>
                            <div className="flex items-center gap-1.5 text-emerald-600">
                                <CheckCircle2 className="size-3.5" />
                                <span className="text-xs font-medium">Ready for analysis</span>
                            </div>
                        </div>
                        <button
                            onClick={removeFile}
                            className="p-2 hover:bg-white rounded-full transition-colors text-[rgb(var(--text-tertiary))] hover:text-destructive active:scale-95"
                        >
                            <X className="size-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Action Button */}
            <Button
                disabled={isDisabled}
                className="hover:-translate-y-0.5 active:-translate-y-0.5 transition-all w-full font-heading font-bold text-base h-11"
            >
                Analyze Skill Gap
            </Button>
        </div>
    );
};

export default ResumeAnalyzerInputForm;

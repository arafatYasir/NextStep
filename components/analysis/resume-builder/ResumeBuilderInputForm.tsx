"use client";

import { SubmitEventHandler, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import SignInAlertModal from "@/components/SignInAlertModal";

const ResumeBuilderInputForm = () => {
    // States
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResumeAnalysis | null>(null);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
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

    const isDisabled = !jobRole.trim() || !jobDescription.trim();

    return (
        <>
            <form className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-xl p-4 xs:p-6 sm:p-8">
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
                        onChange={(e) => setJobDescription(e.target.value.slice(0, 2000))}
                        placeholder="Paste the full job description to compare against your resume"
                        className="h-40 resize-none scrollbar-custom"
                    />
                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {jobDescription.length}/2000 characters
                    </p>
                </div>

                {/* Action Button */}
                <Button
                    disabled={isDisabled || loading}
                    className="hover:-translate-y-0.5 active:-translate-y-0.5 transition-all w-full"
                    type="submit"
                >
                    <span className="flex items-center gap-x-2">
                        Build The Resume
                        <Sparkles className="size-4.5" />
                    </span>
                </Button>
            </form>

            {/* ---- Showing modal to show the result ---- */}
            {/* {(result !== null || loading) && (
                <ResumeAnalysisModal
                    analysis={result}
                    onClose={() => setResult(null)}
                    isLoading={loading}
                />
            )} */}

            {/* ---- Sign In Modal ---- */}
            {showSignInModal && (
                <SignInAlertModal
                    title="Please sign in to continue your build"
                    onClose={() => setShowSignInModal(false)}
                    ref={modalRef}
                />
            )}
        </>
    );
};

export default ResumeBuilderInputForm;

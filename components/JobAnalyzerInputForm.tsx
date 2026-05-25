"use client";

import { SubmitEventHandler, useEffect, useRef, useState } from "react";
import JobDescAnalysisModal from "./analysis/job/JobDescAnalysisModal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createClient } from "@/lib/supabase/client";
import SignInAlertModal from "./SignInAlertModal";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

interface ErrorState {
    jobRole?: string;
    jobDescription?: string;
}

const JobAnalyzerInputForm = () => {
    // States
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [errors, setErrors] = useState<ErrorState>({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<JobAnalysis | null>(null);
    const [showSignInModal, setShowSignInModal] = useState(false);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Handling outside clicks
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setShowSignInModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    // Clearing polling interval on component unmount
    useEffect(() => {
        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        }
    }, []);

    const isDisabled = !jobRole.trim() || !jobDescription.trim();

    // Functions
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
        setJobDescription(e.target.value.slice(0, 3000));

        if (errors.jobDescription) {
            setErrors(prev => ({
                ...prev,
                jobDescription: ""
            }));
        }
    };

    const handleCheckErrors = () => {
        const tempErrors: ErrorState = {};

        if (!jobRole.trim()) {
            tempErrors.jobRole = "Job title is required";
        }

        if (!jobDescription.trim()) {
            tempErrors.jobDescription = "Job description is required";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length > 0;
    };

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

            // If user is logged in proceed to analyze
            // Set loading to true
            setLoading(true);

            // Enqueue a new job record
            const res = await fetch("/api/analyze-job", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ jobRole, jobDescription, userId: user.id })
            });

            // Get the queued job id
            const data = await res.json();
            const { jobId, status, message } = data;

            // If any error happens
            if (status === "ERROR") {
                toast.error(message);
                setLoading(false);
                return;
            }
            // If job id is not found
            else if (!jobId) {
                toast.error("Failed to initialize job.");
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
                    const res = await fetch(`/api/job-results/${jobId}`);
                    const jobData = await res.json();

                    // If response contains 'error' property
                    if (jobData?.error) {
                        console.error(jobData?.error);

                        setResult(null);
                        setLoading(false);

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }

                        toast.error(jobData?.error);
                    }

                    if (jobData.status === "completed") {
                        setResult(jobData.result);
                        setLoading(false);

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }
                    else if (jobData.status === "failed") {
                        setResult(null);
                        setLoading(false);

                        toast.error("Failed to analyze job. Please try again.");

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }
                } catch (e) {
                    console.error("Polling error:", e);
                }
            }, 2000);
        }
        catch (e: any) {
            console.error("API Error: ", e);
            setLoading(false);
        }
    };

    return (
        <>
            {/* ---- Input Card ---- */}
            <form onSubmit={handleAnalyze} className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-xl p-4 xs:p-6 sm:p-8">
                {/* ---- Role Selector ---- */}
                <div className="mb-6">
                    <label
                        htmlFor="job-role"
                        className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading"
                    >
                        Targeted Job Title
                    </label>
                    <Input
                        id="job-role"
                        value={jobRole}
                        onChange={handleChangeJobRole}
                        placeholder="Enter the job title as it appears in the job posting"
                    />

                    {errors.jobRole && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.jobRole}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {jobRole.length}/50 characters
                    </p>
                </div>

                {/* ---- Job Description Input ---- */}
                <div className="mb-6">
                    <label
                        htmlFor="job-description"
                        className="block font-semibold font-heading text-[rgb(var(--text-primary))] text-sm sm:text-base mb-2"
                    >
                        Job Description
                    </label>

                    <Textarea
                        id="job-description"
                        value={jobDescription}
                        onChange={handleChangeJobDescription}
                        placeholder="Paste the full job description from the posting, including responsibilities and requirements"
                        className="h-40 resize-none scrollbar-custom"
                    />

                    {errors.jobDescription && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.jobDescription}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {jobDescription.length}/3000 characters
                    </p>
                </div>

                {/* Action Button */}
                <Button
                    disabled={isDisabled || loading}
                    type="submit"
                    className="hover:-translate-y-0.5 active:-translate-y-0.5 transition-all w-full"
                >
                    <span className="flex items-center gap-x-2">
                        Analyze Job Description
                        <Sparkles className="size-4.5" />
                    </span>
                </Button>
            </form>

            {/* ---- Showing modal to show the result ---- */}
            {(result !== null || loading) && (
                <JobDescAnalysisModal
                    analysis={result as JobAnalysis}
                    onClose={() => setResult(null)}
                    isLoading={loading}
                />
            )}

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

export default JobAnalyzerInputForm;
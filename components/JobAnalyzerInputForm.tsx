"use client";

import { useEffect, useRef, useState } from "react";
import JobDescAnalysisModal from "./analysis/JobDescAnalysisModal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createClient } from "@/lib/supabase/client";
import SignInAlertModal from "./SignInAlertModal";
import { toast } from "sonner";

const JobAnalyzerInputForm = () => {
    // States
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState({});
    const [showSignInModal, setShowSignInModal] = useState(false);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);

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

    // Functions
    const handleAnalyze = async () => {
        try {
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

            // If job id is not found return
            if (status === "ERROR") {
                toast.error(message);
                setLoading(false);
                return;
            }
            else if (!jobId) {
                toast.error("Failed to initialize job.");
                setLoading(false);
                return;
            }

            // Poll for the result every 2 seconds
            let interval = setInterval(async () => {
                try {
                    const res = await fetch(`/api/job-results/${jobId}`);
                    const pollData = await res.json();

                    if (pollData.status === "completed") {
                        setResult(pollData.result);
                        clearInterval(interval);
                        setLoading(false);
                    }
                    else if (pollData.status === "failed") {
                        setResult({});
                        clearInterval(interval);
                        setLoading(false);
                        toast.error("Failed to analyze job. Please try again.");
                    }
                } catch (err) {
                    console.error("Polling error:", err);
                }
            }, 2000);
        }
        catch (e: any) {
            console.error("API Error: ", e);
            setLoading(false);
        }
    };

    const isDisabled = !jobRole.trim() || !jobDescription.trim();

    return (
        <>
            {/* ---- Input Card ---- */}
            <div className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-xl p-4 xs:p-6 sm:p-8">
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
                        onChange={(e) => setJobRole(e.target.value.slice(0, 50))}
                        placeholder="Enter the job title as it appears in the job posting"
                    />

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
                        onChange={(e) => setJobDescription(e.target.value.slice(0, 3000))}
                        placeholder="Paste the full job description from the posting, including responsibilities and requirements"
                        className="h-40 resize-none scrollbar-custom"
                    />

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {jobDescription.length}/3000 characters
                    </p>
                </div>

                {/* Action Button */}
                <Button
                    disabled={isDisabled || loading}
                    onClick={handleAnalyze}
                    className="hover:-translate-y-0.5 active:-translate-y-0.5 transition-all w-full"
                >
                    Analyze Job Description
                </Button>

                {/* ---- Showing modal to show the result ---- */}
                {(Object.keys(result).length > 0 || loading) && (
                    <JobDescAnalysisModal
                        analysis={result as any}
                        onClose={() => setResult({} as any)}
                        isLoading={loading}
                    />
                )}
            </div>

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
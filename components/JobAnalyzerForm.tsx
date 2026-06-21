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
import {
    formatCharCountHint,
    JOB_DESCRIPTION_MAX,
    JOB_DESCRIPTION_MIN,
    JOB_TITLE_MAX,
    JOB_TITLE_MIN,
    validateJobDescription,
    validateJobTitle,
} from "@/src/helpers/validation";
import { JobAnalysis } from "@/types/global";

interface ErrorState {
    jobRole?: string;
    jobDescription?: string;
}

const data = {
    actionVerbs: [
        { count: 1, name: "hiring" },
        { count: 2, name: "work" },
        { count: 2, name: "contribute" },
        { count: 1, name: "Develop" },
        { count: 1, name: "maintain" },
        { count: 1, name: "Design" },
        { count: 1, name: "build" },
        { count: 1, name: "optimize" },
        { count: 1, name: "Collaborate" },
        { count: 1, name: "ensure" },
        { count: 1, name: "Write" },
        { count: 1, name: "following" },
        { count: 1, name: "Troubleshoot" },
        { count: 1, name: "debug" },
        { count: 1, name: "improve" },
        { count: 1, name: "Participate" },
        { count: 1, name: "Integrate" },
        { count: 1, name: "required" },
        { count: 1, name: "Learn" },
        { count: 1, name: "adapt" }
    ],
    educationalRequirements: ["Not specified"],
    phrases: [
        { count: 2, name: "Backend Developer (AI Application)" },
        { count: 1, name: "AI Application" },
        { count: 1, name: "offshore software development" },
        { count: 1, name: "Japanese clients" },
        { count: 1, name: "scalable AI-powered application development" },
        { count: 1, name: "scalable backend systems" },
        { count: 1, name: "REST APIs" },
        { count: 1, name: "API architecture" },
        { count: 2, name: "application performance" },
        { count: 1, name: "maintainable code" },
        { count: 1, name: "efficient code" },
        { count: 1, name: "scalable code" },
        { count: 1, name: "industry best practices" },
        { count: 1, name: "scalability" },
        { count: 1, name: "reliability" },
        { count: 1, name: "backend architecture improvement" },
        { count: 1, name: "feature development" },
        { count: 1, name: "AI-related technologies" },
        { count: 1, name: "emerging technologies" },
        { count: 1, name: "modern engineering practices" },
        { count: 1, name: "technical discussions" },
        { count: 1, name: "solution architecture" }
    ],
    salary: "Not specified",
    seniorityLevels: ["Senior (5+ years)"],
    skills: [
        { count: 3, name: "Backend Development" },
        { count: 1, name: "Laravel" },
        { count: 1, name: "Python" },
        { count: 1, name: "FastAPI" },
        { count: 6, name: "API" },
        { count: 1, name: "LLM integrations" },
        { count: 1, name: "AI APIs" },
        { count: 1, name: "RAG-based solutions" }
    ],
    softSkills: [
        { count: 2, name: "problem-solving" },
        { count: 1, name: "adapt to" },
        { count: 1, name: "technical planning" }
    ],
    tools: [
        { count: 2, name: "web applications" },
        { count: 1, name: "platform integrations" },
        { count: 1, name: "third-party services" },
        { count: 1, name: "external systems" },
        { count: 1, name: "development tools" },
        { count: 1, name: "engineering practices" }
    ]
};

const JobAnalyzerForm = () => {
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

        const titleError = validateJobTitle(jobRole.trim());
        if (titleError) {
            tempErrors.jobRole = titleError;
        }

        const descriptionError = validateJobDescription(jobDescription.trim());
        if (descriptionError) {
            tempErrors.jobDescription = descriptionError;
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
                body: JSON.stringify({ jobRole, jobDescription })
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
                    toast.error("Network error while checking status.");

                    setLoading(false);

                    if (pollIntervalRef.current) {
                        clearInterval(pollIntervalRef.current);
                    }
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
                        required={true}
                    />

                    {errors.jobDescription && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.jobDescription}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatCharCountHint(jobDescription.length, JOB_DESCRIPTION_MIN, JOB_DESCRIPTION_MAX)}
                    </p>
                </div>

                {/* Action Button */}
                <Button
                    type="submit"
                    className="hover:-translate-y-0.5 active:-translate-y-0.5 transition-all w-full"
                >
                    <span className="text-xs xs:text-sm flex items-center gap-x-2">
                        Analyze Job Description
                        <Sparkles className="size-4 xs:size-4.5" />
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
                    description="Sign in to generate detailed insights and keep your analysis accessible anytime."
                    onClose={() => setShowSignInModal(false)}
                    ref={modalRef}
                />
            )}
        </>
    );
};

export default JobAnalyzerForm;
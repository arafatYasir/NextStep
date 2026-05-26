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
import {
    emailRegex,
    formatCharCountHint,
    formatRequiredMaxHint,
    JOB_DESCRIPTION_MIN,
    JOB_TITLE_MAX,
    JOB_TITLE_MIN,
    PERSONAL_FIELD_MAX,
    phoneRegex,
    RESUME_JOB_DESCRIPTION_MAX,
    urlRegex,
    validateJobDescription,
    validateJobTitle,
} from "@/src/helpers/validation";

interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
}

interface JobInfo {
    jobTitle: string,
    jobDescription: string;
}

interface ErrorState {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    github?: string;
    linkedin?: string;
    jobTitle?: string,
    jobDescription?: string;
}

const ResumeBuilderInputForm = () => {
    // States
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        fullName: "", email: "", phone: "", location: "", github: "", linkedin: ""
    });
    const [jobInfo, setJobInfo] = useState<JobInfo>({
        jobTitle: "", jobDescription: ""
    });
    const [errors, setErrors] = useState<ErrorState>({});
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResumeData | null>(null);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Variables
    const isDisabled = !personalInfo.fullName.trim() || !personalInfo.email.trim() || !personalInfo.phone.trim() || !personalInfo.location.trim() || !personalInfo.github.trim() || !personalInfo.linkedin.trim() || !jobInfo.jobTitle.trim() || !jobInfo.jobDescription.trim();

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
        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        }
    }, []);

    // Functions
    const handleChangePersonalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setPersonalInfo(prev => ({
            ...prev,
            [id]: id === "phone" ? value.slice(0, 11) : value.slice(0, 50)
        }));

        // Clear error for this specific field if has any
        if (errors[id as keyof ErrorState]) {
            setErrors(prev => ({
                ...prev,
                [id]: ""
            }));
        }
    }

    const handleChangeJobInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        setJobInfo(prev => ({
            ...prev,
            [id]: id === "jobTitle" ? value.slice(0, 50) : value.slice(0, 2000)
        }));

        // Clear error for this specific field if has any
        if (errors[id as keyof ErrorState]) {
            setErrors(prev => ({
                ...prev,
                [id]: ""
            }));
        }
    }

    const handleCheckErrors = () => {
        // Initialize a new empty error object
        const tempErrors: ErrorState = {};

        // ---- Personal Informations ----
        if (!personalInfo.fullName.trim()) {
            tempErrors.fullName = "Full name is required";
        }
        else if (personalInfo.fullName.length < 4) {
            tempErrors.fullName = "Full name must be at least 4 characters";
        }

        if (!personalInfo.email.trim()) {
            tempErrors.email = "Email is required";
        }
        else if (!emailRegex.test(personalInfo.email)) {
            tempErrors.email = "Invalid email format"
        }

        if (!personalInfo.phone.trim()) {
            tempErrors.phone = "Phone number is required";
        }
        else if (!phoneRegex.test(personalInfo.phone)) {
            tempErrors.phone = "Invalid phone number format";
        }

        if (!personalInfo.location.trim()) {
            tempErrors.location = "Location is required";
        }

        if (!personalInfo.github.trim()) {
            tempErrors.github = "GitHub link is required";
        }
        else if (!urlRegex.test(personalInfo.github)) {
            tempErrors.github = "Invalid url format";
        }

        if (!personalInfo.linkedin.trim()) {
            tempErrors.linkedin = "LinkedIn link is required";
        }
        else if (!urlRegex.test(personalInfo.linkedin)) {
            tempErrors.linkedin = "Invalid url format";
        }

        // ---- Job Informations ----
        const jobTitleError = validateJobTitle(jobInfo.jobTitle.trim());
        if (jobTitleError) {
            tempErrors.jobTitle = jobTitleError;
        }

        const jobDescriptionError = validateJobDescription(
            jobInfo.jobDescription.trim(),
            RESUME_JOB_DESCRIPTION_MAX
        );
        if (jobDescriptionError) {
            tempErrors.jobDescription = jobDescriptionError;
        }

        // Set new erros in the state
        setErrors(tempErrors);

        return Object.keys(tempErrors).length > 0;
    }

    const handleBuild: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
        // Prevent default behavior
        e.preventDefault();

        try {
            // Clear previous error
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

            // Enqueue a new resume record
            const res = await fetch("/api/build-resume", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    fullName: personalInfo.fullName,
                    email: personalInfo.email,
                    phone: personalInfo.phone,
                    location: personalInfo.location,
                    github: personalInfo.github,
                    linkedin: personalInfo.linkedin,
                    jobTitle: jobInfo.jobTitle,
                    jobDescription: jobInfo.jobDescription
                })
            });

            // Get the queued resume id
            const data = await res.json();
            const { status, message, resumeId } = data;

            // If any error happens
            if (status === "ERROR") {
                toast.error(message);
                setLoading(false);
                return;
            }
            if (!resumeId) {
                toast.error("Failed to initialize resume.");
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
                    const res = await fetch(`/api/resumes/${resumeId}`);
                    const resumeData = await res.json();

                    // If error happens
                    if (resumeData.status === "ERROR") {
                        toast.error(resumeData.message);

                        setLoading(false);
                        setResult(null);

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }

                        console.error(resumeData.message);
                    }

                    if (resumeData.status === "completed") {
                        const { userId, status, ...resumeContent } = resumeData;

                        setResult(resumeContent);
                        setLoading(false);

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }
                    else if (resumeData.status === "failed") {
                        setResult(null);
                        setLoading(false);

                        toast.error("Failed to build resume. Please try again.");

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }
                }
                catch (e) {
                    console.error("Polling error:", e);
                    toast.error("Network error while checking status.");

                    setLoading(false);

                    if (pollIntervalRef.current) {
                        clearInterval(pollIntervalRef.current);
                    }
                }
            }, 2000);
        }
        catch (e) {
            console.error("API Error: ", e);
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleBuild} className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-xl p-4 xs:p-6 sm:p-8">
                {/* ---- Area Label: Personal Informations ---- */}
                <div className="relative my-4 xs:my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-dashed border-[rgb(var(--border-primary))]"></span>
                    </div>

                    <div className="relative flex justify-center text-xs xs:text-sm sm:text-[15px] uppercase font-semibold font-sans">
                        <span className="bg-card px-4 text-foreground">Personal Information</span>
                    </div>
                </div>

                {/* ---- Full Name Input ---- */}
                <div className="mb-6">
                    <label htmlFor="fullName" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                        Full Name
                    </label>
                    <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={handleChangePersonalInfo}
                        placeholder="Full name (eg. John Doe)"
                    />

                    {/* ---- Error Message ---- */}
                    {errors.fullName && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.fullName}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatRequiredMaxHint(personalInfo.fullName.length, PERSONAL_FIELD_MAX)}
                    </p>
                </div>

                {/* ---- Email Input ---- */}
                <div className="mb-6">
                    <label htmlFor="email" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={handleChangePersonalInfo}
                        placeholder="Email address (eg. johndoe@gmail.com)"
                    />

                    {/* ---- Error Message ---- */}
                    {errors.email && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.email}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatRequiredMaxHint(personalInfo.email.length, PERSONAL_FIELD_MAX)}
                    </p>
                </div>

                {/* ---- Phone Input ---- */}
                <div className="mb-6">
                    <label htmlFor="phone" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                        Phone
                    </label>
                    <Input
                        id="phone"
                        type="tel"
                        value={personalInfo.phone}
                        onChange={handleChangePersonalInfo}
                        placeholder="Phone number (eg. XXXXXXXXXX)"
                    />

                    {/* ---- Error Message ---- */}
                    {errors.phone && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.phone}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatRequiredMaxHint(personalInfo.phone.length, 11)}
                    </p>
                </div>

                {/* ---- Location Input ---- */}
                <div className="mb-6">
                    <label htmlFor="location" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                        Location
                    </label>
                    <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={handleChangePersonalInfo}
                        placeholder="Location (eg. San Francisco, USA)"
                    />

                    {/* ---- Error Message ---- */}
                    {errors.location && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.location}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatRequiredMaxHint(personalInfo.location.length, PERSONAL_FIELD_MAX)}
                    </p>
                </div>

                {/* ---- GitHub Input ---- */}
                <div className="mb-6">
                    <label htmlFor="github" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                        GitHub
                    </label>
                    <Input
                        id="github"
                        type="url"
                        value={personalInfo.github}
                        onChange={handleChangePersonalInfo}
                        placeholder="GitHub URL (eg. https://github.com/john)"
                    />

                    {/* ---- Error Message ---- */}
                    {errors.github && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.github}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatRequiredMaxHint(personalInfo.github.length, PERSONAL_FIELD_MAX)}
                    </p>
                </div>

                {/* ---- LinkedIn Input ---- */}
                <div className="mb-6">
                    <label htmlFor="linkedin" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                        LinkedIn
                    </label>
                    <Input
                        id="linkedin"
                        type="url"
                        value={personalInfo.linkedin}
                        onChange={handleChangePersonalInfo}
                        placeholder="LinkedIn URL (eg. https://linkedin.com/in/john)"
                    />

                    {/* ---- Error Message ---- */}
                    {errors.linkedin && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.linkedin}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatRequiredMaxHint(personalInfo.linkedin.length, PERSONAL_FIELD_MAX)}
                    </p>
                </div>


                {/* ---- Area Label: Job Specific Informations ---- */}
                <div className="relative my-4 xs:my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-dashed border-[rgb(var(--border-primary))]"></span>
                    </div>

                    <div className="relative flex justify-center text-xs xs:text-sm sm:text-[15px] uppercase font-semibold font-sans">
                        <span className="bg-card px-4 text-foreground">Job Specific Information</span>
                    </div>
                </div>

                {/* ---- Job Title Input ---- */}
                <div className="mb-6">
                    <label htmlFor="jobTitle" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                        Targeted Job Title
                    </label>
                    <Input
                        id="jobTitle"
                        value={jobInfo.jobTitle}
                        onChange={handleChangeJobInfo}
                        placeholder="Enter the job title as it appears in the job posting"
                    />

                    {/* ---- Error Message ---- */}
                    {errors.jobTitle && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.jobTitle}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatCharCountHint(jobInfo.jobTitle.length, JOB_TITLE_MIN, JOB_TITLE_MAX)}
                    </p>
                </div>

                {/* ---- Job Description Input ---- */}
                <div className="mb-6">
                    <label htmlFor="jobDescription" className="block font-semibold font-heading text-foreground text-sm sm:text-base mb-2">
                        Job Description
                    </label>
                    <Textarea
                        id="jobDescription"
                        value={jobInfo.jobDescription}
                        onChange={handleChangeJobInfo}
                        placeholder="Paste the full job description"
                        className="h-40 resize-none scrollbar-custom"
                    />

                    {/* ---- Error Message ---- */}
                    {errors.jobDescription && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.jobDescription}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatCharCountHint(
                            jobInfo.jobDescription.length,
                            JOB_DESCRIPTION_MIN,
                            RESUME_JOB_DESCRIPTION_MAX
                        )}
                    </p>
                </div>

                {/* ---- Action Button ---- */}
                <Button
                    disabled={isDisabled || loading}
                    className="hover:-translate-y-0.5 active:-translate-y-0.5 transition-all w-full"
                    type="submit"
                >
                    <span className="flex items-center gap-x-2">
                        Build the Resume
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
                    description="Sign in to build the resume and keep your resume accessible anytime."
                    onClose={() => setShowSignInModal(false)}
                    ref={modalRef}
                />
            )}
        </>
    );
};

export default ResumeBuilderInputForm;

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
    const [result, setResult] = useState<ResumeAnalysis | null>(null);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Variables
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(\d{3}[- .]?){2}\d{4}$/;
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
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
        if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
        }
    }, []);

    // Functions
    const handleChangePersonalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setPersonalInfo(prev => ({
            ...prev,
            [id]: value.slice(0, 50)
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
        if (!jobInfo.jobTitle.trim()) {
            tempErrors.jobTitle = "Job title is required";
        }
        if (!jobInfo.jobDescription.trim()) {
            tempErrors.jobDescription = "Job description is required";
        }

        // Set new erros in the state
        setErrors(tempErrors);

        return Object.keys(tempErrors).length > 0;
    }

    const handleBuild: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
        try {
            // Prevent default behavior
            e.preventDefault();

            // Clear previous error
            setErrors({});

            // Check for errors
            if (handleCheckErrors()) {
                return;
            }

            // Start the loading
            setLoading(true);
        }
        catch (e) {
            console.error(e);
        }
        finally {
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
                        {personalInfo.fullName.length}/50 characters
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
                        {personalInfo.email.length}/50 characters
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
                        placeholder="Phone number (eg. +XXXXXXXXXX)"
                    />

                    {/* ---- Error Message ---- */}
                    {errors.phone && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.phone}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {personalInfo.phone.length}/50 characters
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
                        {personalInfo.location.length}/50 characters
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
                        {personalInfo.github.length}/50 characters
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
                        {personalInfo.linkedin.length}/50 characters
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
                        {jobInfo.jobTitle.length}/50 characters
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
                        {jobInfo.jobDescription.length}/2000 characters
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
                    onClose={() => setShowSignInModal(false)}
                    ref={modalRef}
                />
            )}
        </>
    );
};

export default ResumeBuilderInputForm;

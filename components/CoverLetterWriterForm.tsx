"use client";

import { Briefcase, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { COMPANY_NAME_MAX, COMPANY_NAME_MIN, formatCharCountHint, JOB_DESCRIPTION_MIN, JOB_TITLE_MAX, JOB_TITLE_MIN, MANAGER_NAME_MAX, MANAGER_NAME_MIN, NAME_MAX, NAME_MIN, RESUME_JOB_DESCRIPTION_MAX, validateCompanyName, validateJobDescription, validateJobTitle, validateManagerName, validateName } from "@/src/helpers/validation";
import { Textarea } from "./ui/textarea";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useAppSelector } from "@/src/store/hooks";
import SignInAlertModal from "./SignInAlertModal";
import { toast } from "sonner";
import { CoverLetter } from "@/types/global";
import CoverLetterModal from "./analysis/cover-letter/CoverLetterModal";

interface FormData {
    name: string;
    jobTitle: string;
    jobDescription: string;
    companyName: string;
    hiringManagerName?: string;
    letterTone: "Professional" | "Enthusiastic" | "Confident" | "Friendly" | "Formal";
}

interface ErrorState {
    name?: string;
    jobTitle?: string;
    jobDescription?: string;
    companyName?: string;
    hiringManagerName?: string;
    letterTone?: string;
}

const COVER_LETTER_TONES = ["Professional", "Enthusiastic", "Confident", "Friendly", "Formal"]

const CoverLetterWriterForm = () => {
    // States
    const [letterType, setLetterType] = useState<"Experienced" | "Fresher">("Experienced");
    const [formData, setFormData] = useState<FormData>({
        name: "", jobTitle: "", jobDescription: "", companyName: "", hiringManagerName: "", letterTone: "Professional"
    });
    const [errors, setErrors] = useState<ErrorState>({});
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CoverLetter | null>(null);

    const user = useAppSelector((state) => state.auth.user);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Preventing background scrolling when modal is open
    useEffect(() => {
        if (result !== null || loading) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "unset";
        }
    }, [result, loading]);

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
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        let sliceValue = 50;

        if (id === "jobDescription") sliceValue = 2000;

        setFormData(prev => ({
            ...prev,
            [id]: value.slice(0, sliceValue)
        }));
    }

    const handleCheckErrors = () => {
        const tempErrors: ErrorState = {};

        const nameError = validateName(formData.name.trim());
        if (nameError) {
            tempErrors.name = nameError;
        }

        const jobTitleError = validateJobTitle(formData.jobTitle.trim());
        if (jobTitleError) {
            tempErrors.jobTitle = jobTitleError;
        }

        const jobDescriptionError = validateJobDescription(
            formData.jobDescription.trim(),
            RESUME_JOB_DESCRIPTION_MAX
        );
        if (jobDescriptionError) {
            tempErrors.jobDescription = jobDescriptionError;
        }

        const companyNameError = validateCompanyName(formData.companyName.trim());
        if (companyNameError) {
            tempErrors.companyName = companyNameError;
        }

        if (formData.hiringManagerName?.trim()) {
            const hiringManagerNameError = validateManagerName(formData.hiringManagerName.trim());

            if (hiringManagerNameError) {
                tempErrors.hiringManagerName = hiringManagerNameError;
            }
        }

        if (!COVER_LETTER_TONES.includes(formData.letterTone)) {
            tempErrors.letterTone = "Invalid Letter Tone";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length > 0;
    }

    const handleGenerateLetter: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
        // Prevent default behaviour
        e.preventDefault();

        try {
            // Clear previous errors
            setErrors({});

            // Check for errors
            if (handleCheckErrors()) {
                return;
            }

            // If not logged in then stop
            if (!user) {
                setShowSignInModal(true);
                return;
            }

            // Start the loading
            setLoading(true);

            // Enqueue a new cover letter record
            const res = await fetch("/api/generate-letter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    jobTitle: formData.jobTitle,
                    jobDescription: formData.jobDescription,
                    companyName: formData.companyName,
                    hiringManagerName: formData.hiringManagerName,
                    letterTone: formData.letterTone,
                    letterType
                })
            });

            const data = await res.json();
            const { coverLetterId } = data;

            if (!res.ok) {
                throw new Error(data.message || "Failed to generate cover letter");
            }

            // Clear any active polling interval first to prevent leakage
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }

            // Check for the result every 2 seconds with interval
            pollIntervalRef.current = setInterval(async () => {
                try {
                    const res = await fetch(`/api/cover-letters/${coverLetterId}`);
                    const coverLetterData = await res.json();

                    // If error happens
                    if (!res.ok) {
                        setResult(null);
                        setLoading(false);

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }

                        throw new Error(coverLetterData.message || "Failed to generate cover letter");
                    }
                    if (coverLetterData.status === "completed") {
                        setResult(coverLetterData);
                        setLoading(false);

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }
                    else if (coverLetterData.status === "failed") {
                        setResult(null);
                        setLoading(false);

                        toast.error("Failed to generate letter. Please try again.");

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }
                }
                catch (e: any) {
                    console.error("Polling error:", e.message);
                    toast.error(e.message);

                    if (pollIntervalRef.current) {
                        clearInterval(pollIntervalRef.current);
                    }
                    setLoading(false);
                }
            }, 2000);
        } catch (e: any) {
            toast.error(e.message);
            console.error("API Error:", e.message);

            setLoading(false);
        }
    }

    return (
        <>
            {/* ---- Input Card ---- */}
            <form onSubmit={handleGenerateLetter} className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-xl p-4 xs:p-6 sm:p-8">
                {/* ---- Candidate Type Selector ---- */}
                <div className="mb-6">
                    <label className="block font-semibold text-foreground text-sm sm:text-base mb-3 font-heading">
                        Letter Type
                    </label>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                        {/* ---- Experienced Button ---- */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setLetterType("Experienced")}
                            className={cn(
                                "relative flex flex-col items-center justify-center gap-2 h-auto py-5 px-4 w-full text-center cursor-pointer whitespace-normal",
                                letterType === "Experienced" && "border-[rgb(var(--border-hover))]!"
                            )}
                        >
                            <div className="flex size-10 items-center justify-center rounded-full bg-[rgb(var(--border-default))]">
                                <Briefcase className="size-5" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold font-heading text-sm sm:text-base">
                                    Experienced
                                </p>
                                <p className="font-sans text-xs mt-0.5 leading-snug">
                                    Has prior work experience
                                </p>
                            </div>
                            {letterType === "Experienced" && (
                                <CheckCircle2 className="absolute right-2.5 top-2.5 size-5 text-[rgb(var(--text-accent))]" />
                            )}
                        </Button>

                        {/* ---- Fresher Button ---- */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setLetterType("Fresher")}
                            className={cn(
                                "relative flex flex-col items-center justify-center gap-2 h-auto py-5 px-4 w-full text-center cursor-pointer whitespace-normal",
                                letterType === "Fresher" && "border-[rgb(var(--border-hover))]!"
                            )}
                        >
                            <div className="flex size-10 items-center justify-center rounded-full bg-[rgb(var(--border-default))]">
                                <Briefcase className="size-5" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold font-heading text-sm sm:text-base">
                                    Fresher
                                </p>
                                <p className="font-sans text-xs mt-0.5 leading-snug">
                                    New graduate or entry level
                                </p>
                            </div>
                            {letterType === "Fresher" && (
                                <CheckCircle2 className="absolute right-2.5 top-2.5 size-5 text-[rgb(var(--text-accent))]" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* ---- Your Name ---- */}
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading"
                    >
                        Your Name
                    </label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChangeValue}
                        placeholder="Enter your name"
                        required={true}
                    />

                    {errors.name && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.name}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatCharCountHint(formData.name.length, NAME_MIN, NAME_MAX)}
                    </p>
                </div>

                {/* ---- Job Title ---- */}
                <div className="mb-6">
                    <label
                        htmlFor="jobTitle"
                        className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading"
                    >
                        Targeted Job Title
                    </label>
                    <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChangeValue}
                        placeholder="Enter the job title as it appears in the job posting"
                        required={true}
                    />

                    {errors.jobTitle && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.jobTitle}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatCharCountHint(formData.jobTitle.length, JOB_TITLE_MIN, JOB_TITLE_MAX)}
                    </p>
                </div>

                {/* ---- Job Description ---- */}
                <div className="mb-6">
                    <label
                        htmlFor="jobDescription"
                        className="block font-semibold font-heading text-[rgb(var(--text-primary))] text-sm sm:text-base mb-2"
                    >
                        Job Description
                    </label>

                    <Textarea
                        id="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleChangeValue}
                        placeholder="Paste the full job description from the posting, including responsibilities and requirements"
                        className="h-40 resize-none scrollbar-custom"
                        required={true}
                    />

                    {errors.jobDescription && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.jobDescription}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatCharCountHint(formData.jobDescription.length, JOB_DESCRIPTION_MIN, RESUME_JOB_DESCRIPTION_MAX)}
                    </p>
                </div>

                {/* ---- Company Name ---- */}
                <div className="mb-6">
                    <label
                        htmlFor="companyName"
                        className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading"
                    >
                        Company Name
                    </label>
                    <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChangeValue}
                        placeholder="Enter the company name"
                        required={true}
                    />

                    {errors.companyName && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.companyName}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatCharCountHint(formData.companyName.length, COMPANY_NAME_MIN, COMPANY_NAME_MAX)}
                    </p>
                </div>

                {/* ---- Hiring Manger Name ---- */}
                <div className="mb-6">
                    <label
                        htmlFor="hiringManagerName"
                        className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading"
                    >
                        <span>Hiring Manger Name</span>
                        <span className="ml-1 text-[rgb(var(--text-tertiary))] font-normal">(Optional)</span>
                    </label>
                    <Input
                        id="hiringManagerName"
                        value={formData.hiringManagerName}
                        onChange={handleChangeValue}
                        placeholder="Enter the Hiring Manager's name"
                    />

                    {errors.hiringManagerName && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.hiringManagerName}</p>
                    )}

                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                        {formatCharCountHint(formData?.hiringManagerName?.length || 0, MANAGER_NAME_MIN, MANAGER_NAME_MAX)}
                    </p>
                </div>

                {/* ---- Letter Tone ---- */}
                <div className="mb-6">
                    <label
                        htmlFor="letterTone"
                        className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading"
                    >
                        Letter Tone
                    </label>
                    <Select
                        value={formData.letterTone}
                        required={true}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, letterTone: val as FormData["letterTone"] }))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Start Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {COVER_LETTER_TONES.map((val, i) => (
                                    <SelectItem key={i} value={val}>{val}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {errors.letterTone && (
                        <p className="text-red-500 text-[15px] mt-1.5">{errors.letterTone}</p>
                    )}
                </div>

                {/* Action Button */}
                <Button
                    type="submit"
                    className="hover:-translate-y-0.5 active:-translate-y-0.5 transition-all w-full"
                >
                    <span className="text-xs xs:text-sm flex items-center gap-x-2">
                        Generate Cover Letter
                        <Sparkles className="size-4 xs:size-4.5" />
                    </span>
                </Button>
            </form>

            {/* ---- Showing modal to show the result ---- */}
            {(result !== null || loading) && (
                <CoverLetterModal
                    result={result as CoverLetter}
                    onClose={() => setResult(null)}
                    isLoading={loading}
                />
            )}

            {/* ---- Sign In Modal ---- */}
            {showSignInModal && (
                <SignInAlertModal
                    title="Please sign in to continue generating letter"
                    description="Sign in to generate professional cover letter for your job application."
                    onClose={() => setShowSignInModal(false)}
                    ref={modalRef}
                />
            )}
        </>
    );
}

export default CoverLetterWriterForm
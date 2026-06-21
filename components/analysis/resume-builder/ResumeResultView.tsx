"use client";

import Container from "@/components/Container";
import ResumeSection from "./ResumeSection";
import ResumeSkillGroup from "./ResumeSkillGroup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ResumeData } from "@/types/global";

const ResumeResultView = ({ result, isPrintMode = false }: { result: ResumeData, isPrintMode?: boolean }) => {
    // States
    const [loading, setLoading] = useState<boolean>(false);

    // Variables
    const resumeId = result?.resumeId || result?._id;

    // Functions
    const handleDownloadResume = async () => {
        try {
            setLoading(true);

            // Send request to backend
            const res = await fetch(`/api/resumes/${resumeId}/download`);

            if (!res.ok) {
                throw new Error("Failed to generate PDF");
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `resume-${resumeId}.pdf`;
            a.click();

            URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Resume download error: ", e);
            toast.error("Failed to downlaod resume. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container removeDefault={isPrintMode}>
            <div className={cn(
                !isPrintMode && "py-8 lg:py-12 flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center gap-3"
            )}>
                {/* ---- Resume ---- */}
                <div className={cn("w-full space-y-3",
                    !isPrintMode && "max-w-3xl bg-card rounded-xl shadow-xl border border-[rgb(var(--border-default))] p-5 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
                )}>
                    {/* ---- Header: Name + Title + Contact ---- */}
                    <div className="text-center space-y-1 pb-3 border-b border-[rgb(var(--border-default))]">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground">
                                {result.personalInfo.fullName}
                            </h1>
                            <h2 className="text-lg font-semibold font-heading tracking-tight text-[rgb(var(--text-accent))]">{result.resumeTitle}</h2>
                        </div>
                        <div className="flex items-center justify-center gap-x-2 gap-y-1 flex-wrap text-[13px] font-sans text-[rgb(var(--text-secondary))]">
                            <span>{result.personalInfo.email}</span>
                            <span className="text-[rgb(var(--text-muted))]">•</span>
                            <span>{result.personalInfo.phone}</span>
                            <span className="text-[rgb(var(--text-muted))]">•</span>
                            <span>{result.personalInfo.location}</span>
                        </div>
                        <div className="flex items-center justify-center gap-x-3 gap-y-1 flex-wrap text-sm font-sans">
                            <a href={result.personalInfo.github} target="_blank" className="text-[rgb(var(--text-accent))] hover:underline">
                                GitHub
                            </a>
                            <a href={result.personalInfo.linkedin} target="_blank" className="text-[rgb(var(--text-accent))] hover:underline">
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* ---- Summary ---- */}
                    <ResumeSection title="Professional Summary">
                        <p className="text-sm font-sans text-[rgb(var(--text-secondary))] leading-relaxed">
                            {result.summary}
                        </p>
                    </ResumeSection>

                    {/* ---- Skills ---- */}
                    <ResumeSection title="Skills">
                        <div className="space-y-1">
                            <ResumeSkillGroup label="Languages" skills={result.skills.languages} />
                            <ResumeSkillGroup label="Frameworks & Libraries" skills={result.skills.frameworksAndLibraries} />
                            <ResumeSkillGroup label="Tools & Platforms" skills={result.skills.toolsAndPlatforms} />
                            <ResumeSkillGroup label="Soft Skills" skills={result.skills.softSkills} />
                        </div>
                    </ResumeSection>

                    {/* ---- Experience ---- */}
                    {result.experience?.length > 0 && (
                        <ResumeSection title="Work Experience">
                            <div className="space-y-2.5">
                                {result.experience.map((exp, idx) => (
                                    <div key={idx} className="pl-4 border-l border-[rgb(var(--bg-primary))]/40 space-y-1.5">
                                        <div className="flex items-center justify-between flex-wrap gap-x-4 gap-y-1">
                                            <h4 className="font-heading font-semibold text-foreground text-sm">
                                                {exp.jobTitle}
                                            </h4>
                                            <span className="text-xs font-sans text-[rgb(var(--text-tertiary))] whitespace-nowrap">
                                                {exp.duration}
                                            </span>
                                        </div>

                                        <p className="text-sm font-sans text-[rgb(var(--text-accent))] font-medium">{exp.company}</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            {exp.responsibilities.map((r, i) => (
                                                <li key={i} className="text-sm font-sans text-[rgb(var(--text-secondary))]">
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </ResumeSection>
                    )}

                    {/* ---- Projects ---- */}
                    {result.projects?.length > 0 && (
                        <ResumeSection title="Projects">
                            <div className="space-y-2.5">
                                {result.projects.map((proj, idx) => (
                                    <div key={idx} className="pl-4 border-l border-[rgb(var(--bg-primary))]/40 space-y-1.5">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-heading font-semibold text-foreground text-sm">
                                                {proj.projectName}
                                            </h4>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" className="text-xs text-[rgb(var(--text-accent))] hover:underline font-sans">
                                                    View
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {proj.techStack.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs font-sans text-[rgb(var(--text-accent))] font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <ul className="list-disc list-inside space-y-1">
                                            {proj.highlights.map((h, i) => (
                                                <li key={i} className="text-sm font-sans text-[rgb(var(--text-secondary))]">
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </ResumeSection>
                    )}

                    {/* ---- Education ---- */}
                    {result.education?.length > 0 && (
                        <ResumeSection title="Education">
                            <div className="space-y-2.5">
                                {result.education.map((edu, idx) => (
                                    <div key={idx} className="flex items-start justify-between flex-wrap gap-x-4 gap-y-1">
                                        <div>
                                            <h4 className="font-heading font-semibold text-foreground text-sm">{edu.degree}</h4>
                                            <p className="text-[13px] sm:text-sm font-sans text-[rgb(var(--text-secondary))]">{edu.institution}</p>
                                        </div>
                                        <span className="text-xs font-sans text-[rgb(var(--text-tertiary))] whitespace-nowrap">
                                            {edu.duration}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </ResumeSection>
                    )}
                </div>

                {/* ---- Download Button ---- */}
                <div className={cn(
                    isPrintMode ? "hidden" : "block"
                )}>
                    <Button
                        variant="outline"
                        className="flex items-center gap-x-2 text-xs xs:text-sm"
                        disabled={loading}
                        onClick={handleDownloadResume}
                    >
                        {
                            loading ? (
                                <Spinner />
                            ) : (
                                <Download className="size-4 xs:size-4.5" />
                            )
                        }

                        <span className="">
                            {
                                loading ? "Downloading..." : " Download"
                            }
                        </span>
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default ResumeResultView;
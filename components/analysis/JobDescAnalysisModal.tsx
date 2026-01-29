"use client";

import { X, Briefcase, GraduationCap, DollarSign, Wrench, MessageSquare, Zap, Target, BookOpen } from "lucide-react";
import { useEffect } from "react";
import EmptyState from "./EmptyState";
import JobDescAnalysisSection from "./JobDescAnalysisSection";
import Badge from "./badges/Badge";
import InfoCard from "./job info card/InfoCard";
import BadgesLoadingSkeleton from "./badges/BadgesLoadingSkeleton";
import { Button } from "../ui/button";

const JobDescAnalysisModal = ({ analysis, onClose, isLoading }: { analysis: JobAnalysis, onClose: () => void, isLoading: boolean }) => {

    // Preventing background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-100 flex flex-col bg-[rgb(var(--bg-body))]">
            {/* ---- Header ---- */}
            <div className="flex-none py-4 border-b border-[rgb(var(--border-default))] bg-card z-10 shadow-sm">
                <div className="container mx-auto flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground font-heading tracking-tight">
                            Job Description Insights
                        </h2>
                        <p className="text-foreground/80 mt-1.5 font-sans">
                            A clear breakdown of the skills, experience, and expectations the employer is looking for.
                        </p>
                    </div>
                    <Button
                        onClick={onClose}
                        disabled={isLoading}
                        variant="secondary"
                        className="border border-[rgb(var(--border-default))] text-foreground/80 hover:text-foreground active:text-foreground"
                        aria-label="Close Analysis"
                    >
                        <X size={24} />
                    </Button>
                </div>
            </div>

            {/* ---- Scrollable Content ---- */}
            <div className="flex-1 overflow-y-auto scrollbar-custom bg-[rgb(var(--bg-body))] scroll-smooth">
                <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
                    {/* Top Stats / Summary Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                        {/* LEFT COLUMN (Technical & Hard Requirements) */}
                        <div className="xl:col-span-7 space-y-6">
                            {/* Hard Skills */}
                            <JobDescAnalysisSection
                                title="Hard Skills"
                                description="Core technical competencies required like languages, frameworks, libraries."
                                icon={<Zap size={20} className="text-blue-500" />}
                                copyContent={analysis?.skills?.map(s => s.name).join(", ")}
                            >
                                <div className="flex flex-wrap gap-3">
                                    {
                                        (!analysis?.skills?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={8} />
                                        ) : (analysis?.skills?.length > 0 && !isLoading) ? (
                                            analysis?.skills?.map((skill, idx) => (
                                                <Badge key={idx} name={skill.name} count={skill.count} variant="blue" />
                                            ))
                                        ) : <EmptyState text="Not found" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                            {/* Tools & Technologies */}
                            <JobDescAnalysisSection
                                title="Tools & Technologies"
                                description="Software, platforms, and services."
                                icon={<Wrench size={20} className="text-indigo-500" />}
                                copyContent={analysis?.tools?.map(t => t.name).join(", ")}
                            >
                                <div className="flex flex-wrap gap-3">
                                    {
                                        (!analysis?.tools?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={8} />
                                        ) : (analysis?.tools?.length > 0 && !isLoading) ? (
                                            analysis?.tools?.map((tool, idx) => (
                                                <Badge key={idx} name={tool.name} count={tool.count} variant="indigo" />
                                            ))
                                        ) : <EmptyState text="Not found" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                            {/* Key Phrases */}
                            <JobDescAnalysisSection
                                title="Key Phrases & Terminology"
                                description="Important technical concepts and industry terms."
                                icon={<BookOpen size={20} className="text-teal-500" />}
                                copyContent={analysis?.phrases?.map(p => p.name).join(", ")}
                            >
                                <div className="flex flex-wrap gap-3">
                                    {
                                        (!analysis?.phrases?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={8} />
                                        ) : (analysis?.phrases?.length > 0 && !isLoading) ? (
                                            analysis?.phrases?.map((phrase, idx) => (
                                                <Badge key={idx} name={phrase.name} count={phrase.count} variant="teal" />
                                            ))
                                        ) : <EmptyState text="Not found" />
                                    }
                                </div>
                            </JobDescAnalysisSection>
                        </div>

                        {/* RIGHT COLUMN (Soft Skills, Context, Requirements) */}
                        <div className="xl:col-span-5 space-y-6">
                            {/* Soft Skills */}
                            <JobDescAnalysisSection
                                title="Soft Skills"
                                description="Interpersonal and behavioral traits."
                                icon={<MessageSquare size={20} className="text-emerald-500" />}
                                copyContent={analysis?.softSkills?.map(s => s.name).join(", ")}
                            >
                                <div className="flex flex-wrap gap-2.5">
                                    {
                                        (!analysis?.softSkills?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={6} />
                                        ) : (analysis?.softSkills?.length > 0 && !isLoading) ? (
                                            analysis?.softSkills?.map((skill, idx) => (
                                                <Badge key={idx} name={skill.name} count={skill.count} variant="emerald" />
                                            ))
                                        ) : <EmptyState text="Not found" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                            {/* Action Verbs */}
                            <JobDescAnalysisSection
                                title="Action Verbs"
                                description="Impact words for your resume."
                                icon={<Target size={20} className="text-rose-500" />}
                                copyContent={analysis?.actionVerbs?.map(v => v.name).join(", ")}
                            >
                                <div className="flex flex-wrap gap-2">
                                    {
                                        (!analysis?.actionVerbs?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={6} />
                                        ) : (analysis?.actionVerbs?.length > 0 && !isLoading) ? (
                                            analysis?.actionVerbs?.map((verb, idx) => (
                                                <Badge key={idx} name={verb.name} count={verb.count} variant="rose" />
                                            ))
                                        ) : <EmptyState text="Not found" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                            {/* Requirements Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
                                <InfoCard
                                    title="Education & Qualifications"
                                    icon={<GraduationCap size={20} className="text-blue-500" />}
                                    items={analysis?.educationalRequirements}
                                    isLoading={isLoading}
                                />
                                <InfoCard
                                    title="Experience & Seniority"
                                    icon={<Briefcase size={20} className="text-orange-500" />}
                                    items={analysis?.seniorityLevels}
                                    isLoading={isLoading}
                                />
                            </div>

                            {/* Salary */}
                            <div className="group relative overflow-hidden p-5 rounded-2xl bg-linear-to-br from-[rgb(var(--bg-primary))] to-[rgb(var(--bg-primary-hover))] text-white shadow-xl shadow-indigo-500/10">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <DollarSign size={60} className="transform rotate-12 -mr-6 -mt-6" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-2 opacity-90">
                                        <DollarSign size={20} />
                                        <span className="text-sm font-semibold uppercase tracking-wider">Target Compensation</span>
                                    </div>
                                    <p className="text-2xl font-bold tracking-tight">
                                        {analysis?.salary && analysis?.salary !== "Not specified" ? analysis?.salary : "Not disclosed"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescAnalysisModal;
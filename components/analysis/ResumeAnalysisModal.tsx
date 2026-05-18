"use client";

import { X, Target, Briefcase, GraduationCap, Wrench, AlertTriangle, CheckCircle, Search, TrendingUp, AlertCircle, FileText, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import EmptyState from "./EmptyState";
import JobDescAnalysisSection from "./JobDescAnalysisSection";
import Badge from "./badges/Badge";
import JobInfoCard from "./job info card/JobInfoCard";
import BadgesLoadingSkeleton from "./badges/BadgesLoadingSkeleton";
import { Button } from "../ui/button";
import Container from "../Container";
import InfoLoadingSkeleton from "./job info card/InfoLoadingSkeleton";

interface ResumeAnalysisModalProps {
    analysis: ResumeAnalysis | null;
    onClose: () => void;
    isLoading: boolean;
}

const ProgressBar = ({ label, score, isLoading }: { label: string, score: number, isLoading: boolean }) => {
    if (isLoading) {
        return (
            <div className="mb-4 last:mb-0">
                <div className="flex justify-between items-center mb-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-8 animate-pulse"></div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div className="h-full bg-slate-200 dark:bg-slate-700 w-full animate-pulse"></div>
                </div>
            </div>
        )
    }

    const getColor = (val: number) => {
        if (val >= 80) return 'bg-emerald-500';
        if (val >= 60) return 'bg-amber-500';
        return 'bg-rose-500';
    };

    return (
        <div className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-foreground">{label}</span>
                <span className="text-sm font-bold text-foreground">{score}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-[rgb(var(--bg-body))] rounded-full h-2.5">
                <div className={`h-2.5 rounded-full transition-all duration-1000 ${getColor(score)}`} style={{ width: `${score}%` }}></div>
            </div>
        </div>
    );
}

const ResumeAnalysisModal = ({ analysis, onClose, isLoading }: ResumeAnalysisModalProps) => {

    // Preventing background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const scoreColor = (analysis?.atsScore || 0) >= 80 ? 'from-emerald-500 to-emerald-700' : (analysis?.atsScore || 0) >= 60 ? 'from-amber-500 to-amber-700' : 'from-rose-500 to-rose-700';

    return (
        <div className="fixed inset-0 z-100 flex flex-col bg-[rgb(var(--bg-body))]">
            {/* ---- Header ---- */}
            <div className="flex-none py-4 border-b border-[rgb(var(--border-default))] bg-card z-10 shadow-sm">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground font-heading tracking-tight">
                                Resume Analysis Insights
                            </h2>
                            <p className="text-foreground/80 mt-1.5 font-sans">
                                A detailed breakdown of how well your resume matches the job description.
                            </p>
                        </div>
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            variant="secondary"
                            className="border border-[rgb(var(--border-default))] text-foreground/80 hover:text-foreground active:text-foreground has-[>svg]:p-2"
                            aria-label="Close Analysis"
                        >
                            <X size={24} />
                        </Button>
                    </div>
                </Container>
            </div>

            {/* ---- Scrollable Content ---- */}
            <div className="flex-1 overflow-y-auto scrollbar-custom bg-[rgb(var(--bg-body))] scroll-smooth pt-10 pb-20">
                <Container>
                    {/* Top Stats / Summary Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                        
                        {/* LEFT COLUMN (Scores & Matches) */}
                        <div className="xl:col-span-7 space-y-6">
                            
                            {/* ---- Overall ATS Score ---- */}
                            <div className={`relative overflow-hidden p-6 rounded-xl bg-linear-to-br ${scoreColor} text-white shadow-md`}>
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Target size={80} className="transform rotate-12 -mr-6 -mt-6" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target size={20} />
                                        <span className="text-sm font-semibold uppercase tracking-wider font-heading">Overall ATS Score</span>
                                    </div>
                                    {isLoading ? (
                                        <div className="h-10 w-24 bg-white/20 rounded animate-pulse mt-2"></div>
                                    ) : (
                                        <div className="flex items-baseline gap-2">
                                            <p className="text-5xl font-bold tracking-tight font-sans">
                                                {analysis?.atsScore}
                                            </p>
                                            <span className="text-xl font-medium opacity-80">/ 100</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ---- Score Breakdown ---- */}
                            <div className="bg-card rounded-xl p-6 border border-[rgb(var(--border-default))] shadow-sm">
                                <h3 className="font-bold font-heading text-lg text-foreground leading-tight mb-6 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-blue-500" />
                                    Score Breakdown
                                </h3>
                                <div>
                                    <ProgressBar label="Skills Match" score={analysis?.scoreBreakdown?.skillsMatch || 0} isLoading={isLoading} />
                                    <ProgressBar label="Experience Match" score={analysis?.scoreBreakdown?.experienceMatch || 0} isLoading={isLoading} />
                                    <ProgressBar label="Education Match" score={analysis?.scoreBreakdown?.educationMatch || 0} isLoading={isLoading} />
                                    <ProgressBar label="Keyword Match" score={analysis?.scoreBreakdown?.keywordMatch || 0} isLoading={isLoading} />
                                    <ProgressBar label="Formatting Score" score={analysis?.scoreBreakdown?.formattingScore || 0} isLoading={isLoading} />
                                </div>
                            </div>

                            {/* ---- Match Insights: Strong Matches ---- */}
                            <JobDescAnalysisSection
                                title="Strong Matches"
                                description="Keywords and skills perfectly aligned with the job description."
                                icon={<CheckCircle size={20} className="text-emerald-500" />}
                                isLoading={isLoading}
                            >
                                <div className="flex flex-wrap gap-3">
                                    {
                                        (!analysis?.matchInsights?.strongMatches?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={5} />
                                        ) : (analysis?.matchInsights?.strongMatches?.length && analysis.matchInsights.strongMatches.length > 0 && !isLoading) ? (
                                            analysis.matchInsights.strongMatches.map((match, idx) => (
                                                <Badge key={idx} name={match} count={0} variant="emerald" />
                                            ))
                                        ) : <EmptyState text="No strong matches found" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                            {/* ---- Match Insights: Partial Matches ---- */}
                            <JobDescAnalysisSection
                                title="Partial Matches"
                                description="Skills you have that partially meet requirements."
                                icon={<Search size={20} className="text-blue-500" />}
                                isLoading={isLoading}
                            >
                                <div className="flex flex-wrap gap-3">
                                    {
                                        (!analysis?.matchInsights?.partialMatches?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={4} />
                                        ) : (analysis?.matchInsights?.partialMatches?.length && analysis.matchInsights.partialMatches.length > 0 && !isLoading) ? (
                                            analysis.matchInsights.partialMatches.map((match, idx) => (
                                                <Badge key={idx} name={match} count={0} variant="blue" />
                                            ))
                                        ) : <EmptyState text="No partial matches found" />
                                    }
                                </div>
                            </JobDescAnalysisSection>
                            
                            {/* ---- Match Insights: Missing Critical Skills ---- */}
                            <JobDescAnalysisSection
                                title="Missing Critical Skills"
                                description="Highly important keywords required by the job that are missing from your resume."
                                icon={<AlertTriangle size={20} className="text-rose-500" />}
                                isLoading={isLoading}
                            >
                                <div className="flex flex-wrap gap-3">
                                    {
                                        (!analysis?.matchInsights?.missingCriticalSkills?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={4} />
                                        ) : (analysis?.matchInsights?.missingCriticalSkills?.length && analysis.matchInsights.missingCriticalSkills.length > 0 && !isLoading) ? (
                                            analysis.matchInsights.missingCriticalSkills.map((match, idx) => (
                                                <Badge key={idx} name={match} count={0} variant="rose" />
                                            ))
                                        ) : <EmptyState text="No critical skills missing" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                        </div>

                        {/* RIGHT COLUMN (Improvements & Meta) */}
                        <div className="xl:col-span-5 space-y-6">
                            
                            {/* ---- Meta Analysis ---- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
                                <JobInfoCard
                                    title="ATS Readability"
                                    icon={<FileText size={20} className="text-indigo-500" />}
                                    items={analysis?.metaAnalysis?.atsReadability ? [analysis.metaAnalysis.atsReadability] : []}
                                    isLoading={isLoading}
                                />
                                <JobInfoCard
                                    title="Resume Tone"
                                    icon={<MessageSquare size={20} className="text-teal-500" />}
                                    items={analysis?.metaAnalysis?.resumeTone ? [analysis.metaAnalysis.resumeTone] : []}
                                    isLoading={isLoading}
                                />
                            </div>

                            {/* ---- Priority Fixes ---- */}
                            <JobDescAnalysisSection
                                title="Priority Fixes"
                                description="Top actions to take to improve your ATS score."
                                icon={<AlertCircle size={20} className="text-amber-500" />}
                                isLoading={isLoading}
                            >
                                <ul className="space-y-3">
                                    {
                                        (!analysis?.improvementInsights?.priorityFixes?.length && isLoading) ? (
                                            <InfoLoadingSkeleton count={3} />
                                        ) : (analysis?.improvementInsights?.priorityFixes?.length && analysis.improvementInsights.priorityFixes.length > 0 && !isLoading) ? (
                                            analysis.improvementInsights.priorityFixes.map((fix, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-foreground font-medium leading-relaxed bg-[rgb(var(--bg-body))] p-3 rounded-lg border border-[rgb(var(--border-default))]">
                                                    <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                                                    <span>{fix}</span>
                                                </li>
                                            ))
                                        ) : <EmptyState text="No priority fixes needed" />
                                    }
                                </ul>
                            </JobDescAnalysisSection>

                            {/* ---- Weak Action Verbs ---- */}
                            <JobDescAnalysisSection
                                title="Weak Action Verbs"
                                description="Replace these with stronger, more impactful verbs."
                                icon={<Wrench size={20} className="text-amber-500" />}
                                isLoading={isLoading}
                            >
                                <div className="flex flex-wrap gap-2">
                                    {
                                        (!analysis?.matchInsights?.weakActionVerbs?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={4} />
                                        ) : (analysis?.matchInsights?.weakActionVerbs?.length && analysis.matchInsights.weakActionVerbs.length > 0 && !isLoading) ? (
                                            analysis.matchInsights.weakActionVerbs.map((verb, idx) => (
                                                <Badge key={idx} name={verb} count={0} variant="indigo" />
                                            ))
                                        ) : <EmptyState text="No weak verbs found" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                            {/* ---- Section Advice ---- */}
                            <div className="bg-card rounded-xl p-6 border border-[rgb(var(--border-default))] shadow-sm">
                                <h3 className="font-bold font-heading text-lg text-foreground leading-tight mb-6 flex items-center gap-2">
                                    <Briefcase size={20} className="text-emerald-500" />
                                    Section-by-Section Advice
                                </h3>
                                <div className="space-y-4">
                                    {
                                        (!analysis?.improvementInsights?.resumeSectionAdvice?.length && isLoading) ? (
                                            <InfoLoadingSkeleton count={3} />
                                        ) : (analysis?.improvementInsights?.resumeSectionAdvice?.length && analysis.improvementInsights.resumeSectionAdvice.length > 0 && !isLoading) ? (
                                            analysis.improvementInsights.resumeSectionAdvice.map((adviceItem, idx) => (
                                                <div key={idx} className="bg-[rgb(var(--bg-body))] p-4 rounded-xl border border-[rgb(var(--border-default))]">
                                                    <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                        {adviceItem.section}
                                                    </h4>
                                                    <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                                                        {adviceItem.advice}
                                                    </p>
                                                </div>
                                            ))
                                        ) : <EmptyState text="No specific section advice" />
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default ResumeAnalysisModal;

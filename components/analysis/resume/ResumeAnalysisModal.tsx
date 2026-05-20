"use client";

import { X, Target, Briefcase, AlertTriangle, CheckCircle, Search, AlertCircle, FileText, MessageSquare, ChartColumn, TableOfContents, ListChecks, ListCheck } from "lucide-react";
import { useEffect } from "react";
import EmptyState from "../EmptyState";
import JobDescAnalysisSection from "../job/JobDescAnalysisSection";
import Badge from "../badges/Badge";
import JobInfoCard from "../job info card/JobInfoCard";
import BadgesLoadingSkeleton from "../badges/BadgesLoadingSkeleton";
import { Button } from "../../ui/button";
import Container from "../../Container";
import InfoLoadingSkeleton from "../job info card/InfoLoadingSkeleton";
import { Skeleton } from "../../ui/skeleton";
import ProgressBar from "./ProgressBar";

interface ResumeAnalysisModalProps {
    analysis: ResumeAnalysis | null;
    onClose: () => void;
    isLoading: boolean;
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

    let matchedKeywordsCopyContent, missingKeywordsCopyContent, overusedKeywordsCopyContent;

    if (analysis?.keywordAnalysis?.matchedKeywords?.length) {
        matchedKeywordsCopyContent = analysis.keywordAnalysis.matchedKeywords.join(", ");
    }
    if (analysis?.keywordAnalysis?.missingKeywords?.length) {
        missingKeywordsCopyContent = analysis.keywordAnalysis.missingKeywords.join(", ");
    }
    if (analysis?.keywordAnalysis?.overusedKeywords?.length) {
        overusedKeywordsCopyContent = analysis.keywordAnalysis.overusedKeywords.join(", ");
    }

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
                    {/* ---- Top Stats / Summary Grid ---- */}
                    <div className="flex gap-6">
                        {/* ---- LEFT COLUMN (Scores & Matches) ---- */}
                        <div className="space-y-6 w-1/2">
                            {/* ---- Overall ATS Score ---- */}
                            <div className={`relative overflow-hidden p-6 rounded-xl ${!isLoading ? `${scoreColor} bg-linear-to-br text-white` : "text-foreground bg-card border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] transition-colors duration-250"} `}>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Target size={20} />
                                        <span className="text-lg font-bold uppercase tracking-wider font-heading">Overall ATS Score</span>
                                    </div>
                                    {isLoading ? (
                                        <Skeleton className="h-10 w-30 mt-2" />
                                    ) : (
                                        <div className="flex items-baseline gap-2 font-sans">
                                            <p className="text-4xl font-bold tracking-tight">
                                                {analysis?.atsScore}
                                            </p>
                                            <span className="text-xl font-medium opacity-80">/ 100</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ---- Score Breakdown ---- */}
                            <JobDescAnalysisSection
                                title="Score Breakdown"
                                description="Breakdown of your resume performance."
                                icon={<ChartColumn size={20} className="text-blue-500" />}
                                isLoading={isLoading}
                            >
                                <div className="space-y-4">
                                    <ProgressBar label="Skills Match" score={analysis?.scoreBreakdown?.skillsMatch || 0} isLoading={isLoading} />

                                    <ProgressBar label="Experience Match" score={analysis?.scoreBreakdown?.experienceMatch || 0} isLoading={isLoading} />

                                    {(isLoading || (analysis?.scoreBreakdown?.educationMatch !== null && analysis?.scoreBreakdown?.educationMatch !== undefined)) && (
                                        <ProgressBar label="Education Match" score={analysis?.scoreBreakdown?.educationMatch || 0} isLoading={isLoading} />
                                    )}

                                    <ProgressBar label="Keyword Match" score={analysis?.scoreBreakdown?.keywordMatch || 0} isLoading={isLoading} />

                                    <ProgressBar label="Formatting Score" score={analysis?.scoreBreakdown?.formattingScore || 0} isLoading={isLoading} />
                                </div>
                            </JobDescAnalysisSection>

                            {/* ---- Section Scores ---- */}
                            <JobDescAnalysisSection
                                title="Section Scores"
                                description="Performance insights for every section."
                                icon={<TableOfContents size={20} className="text-indigo-500" />}
                                isLoading={isLoading}
                            >
                                <div className="space-y-4">
                                    <ProgressBar label="Summary" score={analysis?.sectionScores?.summary || 0} isLoading={isLoading} />

                                    <ProgressBar label="Experience" score={analysis?.sectionScores?.experience || 0} isLoading={isLoading} />

                                    <ProgressBar label="Projects" score={analysis?.sectionScores?.projects || 0} isLoading={isLoading} />

                                    <ProgressBar label="Skills" score={analysis?.sectionScores?.skills || 0} isLoading={isLoading} />

                                    <ProgressBar label="Education" score={analysis?.sectionScores?.education || 0} isLoading={isLoading} />
                                </div>
                            </JobDescAnalysisSection>

                            {/* ---- Match Insights: Strong Matches ---- */}
                            <JobDescAnalysisSection
                                title="Strong Matches"
                                description="Keywords and skills perfectly aligned with the job."
                                icon={<ListChecks size={20} className="text-emerald-500" />}
                                isLoading={isLoading}
                            >
                                <ul className="space-y-3">
                                    {
                                        (!analysis?.matchInsights?.strongMatches?.length && isLoading) ? (
                                            <div className="space-y-3">
                                                <Skeleton className="w-full h-16" />
                                                <Skeleton className="w-full h-16" />
                                            </div>
                                        ) : (analysis?.matchInsights?.strongMatches?.length && analysis.matchInsights.strongMatches.length > 0 && !isLoading) ? (
                                            analysis.matchInsights.strongMatches.map((match, idx) => (
                                                <li key={idx} className="flex flex-col gap-1 bg-[rgb(var(--bg-body))] p-3 rounded-lg border border-[rgb(var(--border-default))]">
                                                    <span className="text-sm font-bold font-heading text-foreground flex items-center gap-2">
                                                        <Search size={14} className="text-emerald-500 shrink-0" />
                                                        {match.requirement}
                                                    </span>
                                                    <span className="text-sm text-foreground/80 font-normal font-sans leading-relaxed pl-5">
                                                        {match.reason}
                                                    </span>
                                                </li>
                                            ))
                                        ) : <EmptyState text="No partial matches found" />
                                    }
                                </ul>
                            </JobDescAnalysisSection>

                            {/* ---- Match Insights: Partial Matches ---- */}
                            <JobDescAnalysisSection
                                title="Partial Matches"
                                description="Keywords and skills that partially meet requirements."
                                icon={<ListCheck size={20} className="text-amber-500" />}
                                isLoading={isLoading}
                            >
                                <ul className="space-y-3">
                                    {
                                        (!analysis?.matchInsights?.partialMatches?.length && isLoading) ? (
                                            <div className="space-y-3">
                                                <Skeleton className="w-full h-16" />
                                                <Skeleton className="w-full h-16" />
                                            </div>
                                        ) : (analysis?.matchInsights?.partialMatches?.length && analysis.matchInsights.partialMatches.length > 0 && !isLoading) ? (
                                            analysis.matchInsights.partialMatches.map((match, idx) => (
                                                <li key={idx} className="flex flex-col gap-1 bg-[rgb(var(--bg-body))] p-3 rounded-lg border border-[rgb(var(--border-default))]">
                                                    <span className="text-sm font-bold font-heading text-foreground flex items-center gap-2">
                                                        <Search size={14} className="text-amber-500 shrink-0" />
                                                        {match.requirement}
                                                    </span>
                                                    <span className="text-sm text-foreground/80 font-sans font-normal leading-relaxed pl-5">
                                                        {match.reason}
                                                    </span>
                                                </li>
                                            ))
                                        ) : <EmptyState text="No partial matches found" />
                                    }
                                </ul>
                            </JobDescAnalysisSection>
                        </div>

                        {/* RIGHT COLUMN (Improvements & Meta) */}
                        <div className="space-y-6 w-1/2">
                            {/* ---- Keyword Analysis: Matched Keywords ---- */}
                            <JobDescAnalysisSection
                                title="Matched Keywords"
                                description="Keywords found in both job description and your resume."
                                icon={<CheckCircle size={20} className="text-emerald-500" />}
                                isLoading={isLoading}
                                copyContent={matchedKeywordsCopyContent}
                            >
                                <div className="flex flex-wrap gap-3">
                                    {
                                        (!analysis?.keywordAnalysis?.matchedKeywords?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={4} />
                                        ) : (analysis?.keywordAnalysis?.matchedKeywords?.length && analysis.keywordAnalysis.matchedKeywords.length > 0 && !isLoading) ? (
                                            analysis.keywordAnalysis.matchedKeywords.map((keyword, idx) => (
                                                <Badge key={idx} name={keyword} count={0} variant="emerald" />
                                            ))
                                        ) : <EmptyState text="No matched keywords" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                            {/* ---- Keyword Analysis: Missing Keywords ---- */}
                            <JobDescAnalysisSection
                                title="Missing Keywords"
                                description="Keywords from the job description missing in your resume."
                                icon={<X size={20} className="text-rose-500" />}
                                isLoading={isLoading}
                                copyContent={missingKeywordsCopyContent}
                            >
                                <div className="flex flex-wrap gap-3">
                                    {
                                        (!analysis?.keywordAnalysis?.missingKeywords?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={4} />
                                        ) : (analysis?.keywordAnalysis?.missingKeywords?.length && analysis.keywordAnalysis.missingKeywords.length > 0 && !isLoading) ? (
                                            analysis.keywordAnalysis.missingKeywords.map((keyword, idx) => (
                                                <Badge key={idx} name={keyword} count={0} variant="rose" />
                                            ))
                                        ) : <EmptyState text="No missing keywords" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                            {/* ---- Keyword Analysis: Overused Keywords ---- */}
                            <JobDescAnalysisSection
                                title="Overused Keywords"
                                description="Keywords appearing too frequently that might hurt readability."
                                icon={<AlertTriangle size={20} className="text-amber-500" />}
                                isLoading={isLoading}
                                copyContent={overusedKeywordsCopyContent}
                            >
                                <div className="flex flex-wrap gap-3">
                                    {
                                        (!analysis?.keywordAnalysis?.overusedKeywords?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={4} />
                                        ) : (analysis?.keywordAnalysis?.overusedKeywords?.length && analysis.keywordAnalysis.overusedKeywords.length > 0 && !isLoading) ? (
                                            analysis.keywordAnalysis.overusedKeywords.map((keyword, idx) => (
                                                <Badge key={idx} name={keyword} count={0} variant="yellow" />
                                            ))
                                        ) : <EmptyState text="No overused keywords" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                            {/* ---- Skill Gaps to Address ---- */}
                            <JobDescAnalysisSection
                                title="Skill Gaps to Address"
                                description="Skills you should consider learning or adding to match the role better."
                                icon={<Search size={20} className="text-indigo-500" />}
                                isLoading={isLoading}
                            >
                                <div className="flex flex-wrap gap-2">
                                    {
                                        (!analysis?.improvementInsights?.skillGapsToAddress?.length && isLoading) ? (
                                            <BadgesLoadingSkeleton count={4} />
                                        ) : (analysis?.improvementInsights?.skillGapsToAddress?.length && analysis.improvementInsights.skillGapsToAddress.length > 0 && !isLoading) ? (
                                            analysis.improvementInsights.skillGapsToAddress.map((gap, idx) => (
                                                <Badge key={idx} name={gap} count={0} variant="indigo" />
                                            ))
                                        ) : <EmptyState text="No skill gaps found" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

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
                                            <div className="space-y-3">
                                                <Skeleton className="w-full h-16" />
                                                <Skeleton className="w-full h-16" />
                                            </div>
                                        ) : (analysis?.improvementInsights?.priorityFixes?.length && analysis.improvementInsights.priorityFixes.length > 0 && !isLoading) ? (
                                            analysis.improvementInsights.priorityFixes.map((fix, idx) => (
                                                <li key={idx} className="flex flex-col gap-1 text-sm text-foreground font-medium leading-relaxed bg-[rgb(var(--bg-body))] p-3 rounded-lg border border-[rgb(var(--border-default))]">
                                                    <div className="flex items-center gap-2 w-full">
                                                        <AlertCircle size={14} className="text-amber-500 shrink-0" />

                                                        <span className="font-bold font-heading flex items-center justify-between w-full gap-2 text-foreground">
                                                            {fix.issue}

                                                            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold shrink-0 ${fix.impact === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-300' : fix.impact === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-300' : 'bg-blue-50 text-blue-700 border border-blue-300'}`}>
                                                                {fix.impact}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <span className="text-foreground/80 font-normal pl-5 font-sans">{fix.fix}</span>
                                                </li>
                                            ))
                                        ) : <EmptyState text="No priority fixes needed" />
                                    }
                                </ul>
                            </JobDescAnalysisSection>

                            {/* ---- Formatting Issues ---- */}
                            <JobDescAnalysisSection
                                title="Formatting Issues"
                                description="Issues with resume layout, structure, or readability."
                                icon={<AlertTriangle size={20} className="text-rose-500" />}
                                isLoading={isLoading}
                            >
                                <ul className="space-y-3">
                                    {
                                        (!analysis?.formattingAnalysis?.issues?.length && isLoading) ? (
                                            <div className="space-y-3">
                                                <Skeleton className="w-full h-16" />
                                                <Skeleton className="w-full h-16" />
                                            </div>
                                        ) : (analysis?.formattingAnalysis?.issues?.length && analysis.formattingAnalysis.issues.length > 0 && !isLoading) ? (
                                            analysis.formattingAnalysis.issues.map((issue, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-foreground font-bold font-heading leading-relaxed bg-[rgb(var(--bg-body))] p-3 rounded-lg border border-[rgb(var(--border-default))]">
                                                    <AlertTriangle size={16} className="text-rose-500 shrink-0 mt-1" />
                                                    <span>{issue}</span>
                                                </li>
                                            ))
                                        ) : <EmptyState text="No formatting issues" />
                                    }
                                </ul>
                            </JobDescAnalysisSection>

                            {/* ---- Section by Section Advice ---- */}
                            <JobDescAnalysisSection
                                title="Section-by-Section Advice"
                                description="Improvement advices for each sections."
                                icon={<Briefcase size={20} className="text-emerald-500" />}
                                isLoading={isLoading}
                            >
                                <div className="space-y-4">
                                    {
                                        (!analysis?.improvementInsights?.resumeSectionAdvice?.length && isLoading) ? (
                                            <div className="space-y-3">
                                                <Skeleton className="w-full h-16" />
                                                <Skeleton className="w-full h-16" />
                                            </div>
                                        ) : (analysis?.improvementInsights?.resumeSectionAdvice?.length && analysis.improvementInsights.resumeSectionAdvice.length > 0 && !isLoading) ? (
                                            analysis.improvementInsights.resumeSectionAdvice.map((adviceItem, idx) => (
                                                <div key={idx} className="bg-[rgb(var(--bg-body))] p-4 rounded-lg border border-[rgb(var(--border-default))]">
                                                    <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2 font-heading">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                        {adviceItem.section}
                                                    </h4>
                                                    <p className="text-sm text-foreground/80 font-sans font-medium leading-relaxed">
                                                        {adviceItem.advice}
                                                    </p>
                                                </div>
                                            ))
                                        ) : <EmptyState text="No specific section advice" />
                                    }
                                </div>
                            </JobDescAnalysisSection>

                            {/* ---- ATS Readability ---- */}
                            <JobInfoCard
                                title="ATS Readability"
                                icon={<FileText size={20} className="text-indigo-500" />}
                                items={analysis?.metaAnalysis?.atsReadability ? [analysis.metaAnalysis.atsReadability] : []}
                                isLoading={isLoading}
                                loadingSkeletons={1}
                            />

                            {/* ---- Resume Tone ---- */}
                            <JobInfoCard
                                title="Resume Tone"
                                icon={<MessageSquare size={20} className="text-teal-500" />}
                                items={analysis?.metaAnalysis?.resumeTone ? [analysis.metaAnalysis.resumeTone] : []}
                                isLoading={isLoading}
                                loadingSkeletons={1}
                            />

                            {/* ---- Confidence Level ---- */}
                            <JobInfoCard
                                title="Confidence Level"
                                icon={<Target size={20} className="text-amber-500" />}
                                items={analysis?.metaAnalysis?.confidenceLevel ? [analysis.metaAnalysis.confidenceLevel] : []}
                                isLoading={isLoading}
                                loadingSkeletons={1}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default ResumeAnalysisModal;

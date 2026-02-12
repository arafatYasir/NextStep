"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HorizontalBarProps {
    name: string;
    count: number;
    maxCount: number;
}

const HorizontalBar = ({ name, count, maxCount }: HorizontalBarProps) => {
    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

    return (
        <div className="space-y-1.5 w-full">
            <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-[rgb(var(--text-primary))] truncate pr-4">
                    {name}
                </span>
                <span className="text-xs font-semibold text-[rgb(var(--text-tertiary))] tabular-nums">
                    {count} {count === 1 ? 'Job' : 'Jobs'}
                </span>
            </div>
            <div className="h-2 w-full bg-[rgb(var(--border-light))] rounded-full overflow-hidden">
                <div
                    className="h-full bg-[rgb(var(--bg-primary))] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

interface SkillChartProps {
    title: string;
    description: string;
    data: { name: string; count: number }[];
}

const SkillChart = ({ title, description, data }: SkillChartProps) => {
    const maxCount = data.length > 0 ? Math.max(...data.map(d => d.count)) : 0;

    return (
        <div className="bg-card p-6 rounded-xl border border-[rgb(var(--border-default))] shadow-sm flex flex-col h-full">
            <div className="mb-6">
                <h4 className="text-lg font-bold font-heading text-[rgb(var(--text-primary))]">
                    {title}
                </h4>
                <p className="text-sm font-sans text-[rgb(var(--text-secondary))]">
                    {description}
                </p>
            </div>

            <div className="flex-1 space-y-5">
                {data.length > 0 ? (
                    data.map((item, idx) => (
                        <HorizontalBar
                            key={idx}
                            name={item.name}
                            count={item.count}
                            maxCount={maxCount}
                        />
                    ))
                ) : (
                    <div className="h-full flex items-center justify-center py-8">
                        <p className="text-sm text-[rgb(var(--text-muted))] italic">
                            No data available yet
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

interface JobAnalysisTabProps {
    data: {
        hardSkills: { name: string; count: number }[];
        softSkills: { name: string; count: number }[];
        tools: { name: string; count: number }[];
        actionVerbs: { name: string; count: number }[];
        phrases: { name: string; count: number }[];
    };
}

const JobAnalysisTab = ({ data }: JobAnalysisTabProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            <SkillChart
                title="Top Hard Skills"
                description="Most frequent technical requirements found in your analyzed jobs."
                data={data.hardSkills}
            />
            <SkillChart
                title="Essential Tools"
                description="Software and platforms mentioned most across all job roles."
                data={data.tools}
            />
            <SkillChart
                title="Soft Skills"
                description="Interpersonal and leadership skills highlighted by recruiters."
                data={data.softSkills}
            />

            {/* Action Verbs - Simplified List */}
            <div className="bg-card p-6 rounded-xl border border-[rgb(var(--border-default))] shadow-sm">
                <div className="mb-6">
                    <h4 className="text-lg font-bold font-heading text-[rgb(var(--text-primary))]">
                        Target Action Verbs
                    </h4>
                    <p className="text-sm font-sans text-[rgb(var(--text-secondary))]">
                        Use these verbs to mirror the language in job descriptions.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.actionVerbs.length > 0 ? (
                        data.actionVerbs.map((verb, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 bg-[rgb(var(--bg-primary))]/5 border border-[rgb(var(--bg-primary))]/20 text-[rgb(var(--bg-primary))] rounded-full text-sm font-medium"
                            >
                                {verb.name}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-[rgb(var(--text-muted))] italic">No verbs detected</p>
                    )}
                </div>
            </div>

            {/* Key Phrases - Badge Grid */}
            <div className="bg-card p-6 rounded-xl border border-[rgb(var(--border-default))] shadow-sm">
                <div className="mb-6">
                    <h4 className="text-lg font-bold font-heading text-[rgb(var(--text-primary))]">
                        Common Key Phrases
                    </h4>
                    <p className="text-sm font-sans text-[rgb(var(--text-secondary))]">
                        Keywords the ATS systems are likely scanning for.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.phrases.length > 0 ? (
                        data.phrases.map((phrase, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 bg-secondary border border-[rgb(var(--border-default))] text-secondary-foreground rounded-md text-sm font-sans"
                            >
                                {phrase.name}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-[rgb(var(--text-muted))] italic">No phrases detected</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobAnalysisTab;

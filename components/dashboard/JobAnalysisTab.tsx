"use client";

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
                <span className="text-sm font-bold text-foreground truncate pr-4 font-heading">
                    {name}
                </span>
                <span className="text-sm font-bold text-foreground tabular-nums font-sans">
                    {count} {count === 1 ? 'time' : 'times'}
                </span>
            </div>
            <div className="h-2 w-full bg-[rgb(var(--border-default))] rounded-full overflow-hidden">
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
    data: { name: string; count: number }[];
    className?: string;
}

const SkillChart = ({ title, data, className }: SkillChartProps) => {
    const maxCount = data.length > 0 ? Math.max(...data.map(d => d.count)) : 0;

    return (
        <div className={cn("bg-card p-6 rounded-xl border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] transition-colors duration-250 shadow-sm flex flex-col h-full", className)}>
            <h4 className="text-lg font-bold font-heading text-foreground mb-6">
                {title}
            </h4>

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
                    <div className="h-full py-8">
                        <p className="text-sm text-[rgb(var(--text-tertiary))] italic font-semibold text-center">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillChart
                title="Top Hard Skills"
                data={data.hardSkills}
            />
            <SkillChart
                title="Top Essential Tools"
                data={data.tools}
            />
            <SkillChart
                title="Top Soft Skills"
                data={data.softSkills}
            />
            <SkillChart
                title="Top Action Verbs"
                data={data.actionVerbs}
            />
            <SkillChart
                title="Top Key Phrases"
                data={data.phrases}
                className="col-span-2"
            />
        </div>
    );
};

export default JobAnalysisTab;
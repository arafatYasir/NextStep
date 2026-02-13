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
    className?: string;
}

const SkillChart = ({ title, description, data, className }: SkillChartProps) => {
    const maxCount = data.length > 0 ? Math.max(...data.map(d => d.count)) : 0;

    return (
        <div className={cn("bg-card p-6 rounded-xl border border-[rgb(var(--border-default))] shadow-sm flex flex-col h-full", className)}>
            <div className="mb-6">
                <h4 className="text-lg font-bold font-heading text-foreground">
                    {title}
                </h4>
                <p className="text-sm font-sans text-foreground/80">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <SkillChart
                title="Action Verbs"
                description="Use these verbs to mirror the language in job descriptions."
                data={data.actionVerbs}
            />
            <SkillChart
                title="Key Phrases"
                description="Keywords the ATS systems are likely scanning for."
                data={data.phrases}
                className="col-span-2"
            />
        </div>
    );
};

export default JobAnalysisTab;

"use client";

import { cn } from "@/lib/utils";
import HorizontalBar from "./HorizontalBar";
import CopyBtn from "../CopyBtn";

interface SkillChartProps {
    title: string;
    data: { name: string; count: number }[];
    className?: string;
}

const SkillChart = ({ title, data, className }: SkillChartProps) => {
    // Constants
    const maxCount = data.length > 0 ? Math.max(...data.map(d => d.count)) : 0;
    const copyContent = data.map((item) => item.name).join(", ");

    return (
        <div className={cn("bg-card p-6 rounded-xl border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] transition-colors duration-250 shadow-sm flex flex-col h-full", className)}>
            <div className="mb-6 flex items-center justify-between">
                <h4 className="text-lg font-bold font-heading text-foreground">
                    {title}
                </h4>

                {
                    copyContent.trim() && (
                        <CopyBtn copyContent={copyContent} />
                    )
                }
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

export default SkillChart;
"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import HorizontalBar from "./HorizontalBar";

interface SkillChartProps {
    title: string;
    data: { name: string; count: number }[];
    className?: string;
}

const SkillChart = ({ title, data, className }: SkillChartProps) => {
    // States
    const [copied, setCopied] = useState(false);

    // Constants
    const maxCount = data.length > 0 ? Math.max(...data.map(d => d.count)) : 0;
    const copyContent = data.map(({ name, count }) => name).join(", ");

    // Functions
    const handleCopy = async () => {
        try {
            if (!copyContent) return;

            await navigator.clipboard.writeText(copyContent);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
        catch (e) {
            toast.error("Failed to copy!");
        }
    }

    return (
        <div className={cn("bg-card p-6 rounded-xl border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] transition-colors duration-250 shadow-sm flex flex-col h-full", className)}>
            <div className="mb-6 flex items-center justify-between">
                <h4 className="text-lg font-bold font-heading text-foreground">
                    {title}
                </h4>
                <Button
                    type="button"
                    onClick={handleCopy}
                    title="Copy to clipboard"
                    variant="secondary"
                    className="has-[>svg]:p-2 text-foreground/80 hover:text-foreground active:text-foreground transition-all active:scale-95 border border-[rgb(var(--border-default))]"
                >
                    {copied ? (
                        <Check size={18} className="text-emerald-500 animate-in zoom-in duration-250" />
                    ) : (
                        <Copy size={18} />
                    )}
                </Button>
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
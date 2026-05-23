"use client";

import { useState, useEffect } from "react";
import JobAnalysisTab from "./JobAnalysisTab";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import OverviewSkeleton from "./OverviewSkeleton";
import ResumeAnalysisTab from "./ResumeAnalysisTab";

interface OverviewData {
    jobAnalysisData: {
        hardSkills: {name: string, count: number}[],
        softSkills: {name: string, count: number}[],
        tools: {name: string, count: number}[],
        actionVerbs: {name: string, count: number}[],
        phrases: {name: string, count: number}[],
    },
    resumeAnalysisData: {
        matchedKeywords: {name: string, count: number}[],
        missingKeywords: {name: string, count: number}[],
        overusedKeywords: {name: string, count: number}[],
        skillGaps: {name: string, count: number}[],
    }
}

const OverviewContainer = ({ userId }: { userId: string }) => {
    // States
    const [activeTab, setActiveTab] = useState<"job" | "resume">("job");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<OverviewData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/dashboard/overview?userId=${userId}`);
                const data = await res.json();
                setData(data);
            } catch (e) {
                console.error("Failed to fetch dashboard overview data: ", e);
                toast.error("Failed to get overview data");
            } finally {
                setLoading(false);
            }
        };

        // Fetching overview data
        fetchData();
    }, []);

    if (loading) return <OverviewSkeleton />;

    if (!data) {
        return (
            <div className="flex-1 p-8">
                <p className="text-base font-semibold font-heading text-center text-foreground/80">
                    Could not load overview data. Please refresh the page.
                </p>
            </div>
        );
    }

    return (
        <div className="">
            {/* ---- Tabs Section ---- */}
            <div className="space-y-6">
                <div className="flex border-b border-[rgb(var(--border-default))]">
                    <button
                        onClick={() => setActiveTab("job")}
                        className={cn(
                            "px-6 py-3 text-sm font-semibold transition-all relative cursor-pointer font-heading",
                            activeTab === "job"
                                ? "text-[rgb(var(--bg-primary))]"
                                : "text-foreground/80 hover:text-foreground active:text-foreground"
                        )}
                    >
                        Job Analysis
                        {activeTab === "job" && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(var(--bg-primary))]" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("resume")}
                        className={cn(
                            "px-6 py-3 text-sm font-semibold transition-all relative cursor-pointer font-heading",
                            activeTab === "resume"
                                ? "text-[rgb(var(--bg-primary))]"
                                : "text-foreground/80 hover:text-foreground active:text-foreground"
                        )}
                    >
                        Resume Analysis
                        {activeTab === "resume" && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(var(--bg-primary))]" />
                        )}
                    </button>
                </div>

                {activeTab === "job" ? (
                    <JobAnalysisTab data={data.jobAnalysisData} />
                ) : (
                    <ResumeAnalysisTab data={data.resumeAnalysisData} />
                )}
            </div>
        </div>
    );
};

export default OverviewContainer;

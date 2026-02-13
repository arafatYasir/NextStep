"use client";

import { useState, useEffect } from "react";
import ServiceMetricCards from "./ServiceMetricCards";
import JobAnalysisTab from "../JobAnalysisTab";
import { cn } from "@/lib/utils";
import { Spinner } from "../../ui/spinner";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const OverviewContainer = ({ userId }: { userId: string }) => {
    // States
    const [activeTab, setActiveTab] = useState<"job" | "resume">("job");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    // Extra hooks
    const router = useRouter();

    // If no user found then redirect to sign in page
    if (!userId) router.push("/sign-in");

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

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <Spinner className="size-8 text-[rgb(var(--bg-primary))]" />
            </div>
        );
    }

    return (
        <div className="flex-1 p-8 space-y-10 max-w-7xl">
            {/* ---- Header ---- */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">
                    Dashboard Overview
                </h1>
                <p className="text-foreground/80 font-sans text-base">
                    Actionable intelligence from your career progression activities.
                </p>
            </div>

            {/* ---- Metric Cards ---- */}
            <ServiceMetricCards stats={data.stats} />

            {/* ---- Tabs Section ---- */}
            <div className="space-y-6">
                <div className="flex border-b border-[rgb(var(--border-default))]">
                    <button
                        onClick={() => setActiveTab("job")}
                        className={cn(
                            "px-6 py-3 text-sm font-semibold transition-all relative cursor-pointer",
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
                            "px-6 py-3 text-sm font-semibold transition-all relative cursor-pointer",
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
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-[rgb(var(--border-default))] rounded-2xl bg-slate-50/50">
                        <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <svg className="size-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold font-heading text-[rgb(var(--text-primary))] mb-2">No Resume Analysis Yet</h3>
                        <p className="text-[rgb(var(--text-secondary))] max-w-sm mb-6">
                            Start analyzing your resumes against job descriptions to see personal skill gap insights here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OverviewContainer;

"use client";

import { useState } from "react";
import Button from "./Button";
import JobDescAnalysisModal from "./JobDescAnalysisModal";

const InputCard = () => {
    // States
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState({});

    const handleAnalyze = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ jobRole, jobDescription })
            });

            const data = await res.json();
            setResult(data);
        }
        catch (e: any) {
            console.log("API Error: ", e);
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = !jobRole.trim() || !jobDescription.trim();

    return (
        <div className="w-full max-w-3xl mx-auto bg-[rgb(var(--bg-surface))] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[rgb(var(--border-light))] p-8">
            {/* ---- Role Selector ---- */}
            <div className="mb-6">
                <label
                    htmlFor="job-role"
                    className="block text-sm font-semibold text-[rgb(var(--text-primary))] mb-2"
                >
                    Job Role
                </label>
                <input
                    id="job-role"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value.slice(0, 30))}
                    placeholder="Write the job role"
                    className="w-full bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-default))] rounded-lg px-4 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] hover:border-[rgb(var(--border-hover))] focus:ring-2 focus:border-[rgb(var(--border-focus))] focus:ring-[rgba(var(--ring-focus),var(--alpha-ring))] outline-none"
                />
                <p className="text-sm text-[rgb(var(--text-tertiary))] mt-1.5">
                    {jobRole.length}/30 characters
                </p>
            </div>

            {/* ---- Job Description Input ---- */}
            <div className="mb-6">
                <label
                    htmlFor="job-description"
                    className="block text-sm font-semibold text-[rgb(var(--text-primary))] mb-2"
                >
                    Job Description
                </label>
                <textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value.slice(0, 3000))}
                    placeholder="Paste the job description here..."
                    className="w-full h-64 bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-default))] rounded-lg px-4 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] hover:border-[rgb(var(--border-hover))] focus:ring-2 focus:border-[rgb(var(--border-focus))] focus:ring-[rgba(var(--ring-focus),var(--alpha-ring))] resize-none outline-none"
                />
                <p className="text-sm text-[rgb(var(--text-tertiary))]">
                    {jobDescription.length}/3000 characters
                </p>
            </div>

            {/* Action Button */}
            <Button
                text={loading ? "Analyzing..." : "Analyze Keywords"}
                disabled={isDisabled || loading}
                paddingY="8px"
                onClick={handleAnalyze}
            />

            {/* ---- Showing modal to show the result ---- */}
            {Object.keys(result).length > 0 && (
                <JobDescAnalysisModal
                    analysis={result as any}
                    onClose={() => setResult({})}
                />
            )}
        </div>
    );
};

export default InputCard;
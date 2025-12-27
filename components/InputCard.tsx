"use client";

import { useState } from "react";
import JobDescAnalysisModal from "./analysis/JobDescAnalysisModal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
const jobInsights = {
  actionVerbs: [
    { name: "building", count: 2 },
    { name: "hiring", count: 1 },
    { name: "develop", count: 1 },
    { name: "convert", count: 2 },
    { name: "understand", count: 2 },
    { name: "optimize", count: 1 },
    { name: "build", count: 1 },
    { name: "contribute", count: 1 },
    { name: "use", count: 2 },
    { name: "collaborate", count: 1 },
    { name: "debug", count: 1 },
    { name: "write", count: 1 },
    { name: "perform", count: 1 },
    { name: "stay updated", count: 1 }
  ],

  educationalRequirements: [
    "Graduate from a reputed university in CSE or Software Engineering (final-year project experience acceptable).",
    "Bachelor in Engineering (BEngg) in Computer Science & Engineering"
  ],

  phrases: [
    { name: "scalable, high-performance", count: 1 },
    { name: "software development", count: 1 },
    { name: "modern, user-focused interfaces", count: 1 },
    { name: "responsive, interactive front-end applications", count: 1 },
    { name: "front end solution", count: 1 },
    { name: "end-to-end front-end flow", count: 1 },
    { name: "component and interface integration", count: 1 },
    { name: "UI/UX designs", count: 1 },
    { name: "client requirements", count: 2 },
    { name: "fully functional systems", count: 1 },
    { name: "applications for performance, SEO, and scalability", count: 1 },
    { name: "Next.js SSR/ISR", count: 1 },
    { name: "reusable components", count: 1 },
    { name: "proper frontend architecture", count: 1 },
    { name: "frontend–backend integrations", count: 1 },
    { name: "front-end workflow", count: 1 },
    { name: "interaction patterns", count: 1 },
    { name: "proper interface integration", count: 1 },
    { name: "HTML5, CSS3, responsive design", count: 1 },
    { name: "component layout", count: 1 },
    { name: "database operations", count: 1 },
    { name: "version control", count: 2 },
    { name: "Blockchain exposure", count: 1 },
    { name: "final-year project experience", count: 1 },
    { name: "Software Company", count: 1 },
    { name: "UI/UX Design", count: 1 }
  ],

  salary: "Tk. 20000 - 25000 (Monthly)",

  seniorityLevels: ["Junior"],

  skills: [
    { name: "React.js", count: 2 },
    { name: "Next.js", count: 4 },
    { name: "JavaScript", count: 2 },
    { name: "JavaScript ES6+", count: 2 },
    { name: "Node.js", count: 2 },
    { name: "HTML5", count: 2 },
    { name: "CSS3", count: 2 },
    { name: "Python", count: 1 }
  ],

  softSkills: [
    { name: "passionate", count: 1 },
    { name: "user-focused", count: 1 },
    { name: "problem-solving", count: 1 },
    { name: "positive attitude", count: 1 },
    { name: "willingness to learn", count: 1 },
    { name: "benevolent behaviour", count: 1 },
    { name: "good team collaboration", count: 1 }
  ],

  tools: [
    { name: "Git", count: 3 },
    { name: "REST APIs", count: 2 },
    { name: "MySQL", count: 1 },
    { name: "PostgreSQL", count: 1 },
    { name: "MongoDB", count: 1 }
  ]
};

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
            console.error("API Error: ", e);
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = !jobRole.trim() || !jobDescription.trim();

    return (
        <div className="w-full max-w-3xl mx-auto bg-[rgb(var(--bg-surface))] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-[rgb(var(--border-light))] p-8">
            {/* ---- Role Selector ---- */}
            <div className="mb-6">
                <label
                    htmlFor="job-role"
                    className="block font-semibold text-[rgb(var(--text-primary))] mb-2"
                >
                    Targeted Job Title
                </label>
                <Input 
                    id="job-role"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value.slice(0, 50))}
                    placeholder="Enter the job title as it appears in the job posting"
                />

                <p className="text-sm text-[rgb(var(--text-tertiary))] mt-1.5">
                    {jobRole.length}/50 characters
                </p>
            </div>

            {/* ---- Job Description Input ---- */}
            <div className="mb-6">
                <label
                    htmlFor="job-description"
                    className="block font-semibold text-[rgb(var(--text-primary))] mb-2"
                >
                    Job Description
                </label>

                <Textarea 
                    id="job-description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value.slice(0, 3000))}
                    placeholder="Paste the full job description from the posting, including responsibilities and requirements"
                    className="h-40 resize-none scrollbar-custom"
                />

                <p className="text-sm text-[rgb(var(--text-tertiary))] mt-1.5">
                    {jobDescription.length}/3000 characters
                </p>
            </div>

            {/* Action Button */}
            <Button 
                disabled={isDisabled || loading}
                onClick={handleAnalyze}
                className="w-full bg-[rgb(var(--bg-surface))] bg-linear-to-r from-[rgb(var(--bg-primary-hover))] to-[rgb(var(--bg-primary))]/80 text-white hover:-translate-y-0.5 transition-all duration-300"
            >
                Analyze Job Description
            </Button>

            {/* ---- Showing modal to show the result ---- */}
            {(Object.keys(result).length > 0 || loading) && (
                <JobDescAnalysisModal
                    analysis={result as any}
                    onClose={() => setResult({} as any)}
                    isLoading={loading}
                />
            )}
        </div>
    );
};

export default InputCard;
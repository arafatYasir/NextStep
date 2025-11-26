"use client";

import { useState } from "react";
import Button from "./Button";

const InputCard = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const roles = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "MERN Stack Developer",
        "Web Designer",
        "Video Editor",
        "DevOps Engineer",
        "Mobile Developer",
    ];

    const handleAnalyze = () => {
        // TODO: Connect to API
        console.log("Analyzing...", { selectedRole, jobDescription });
    };

    const isDisabled = !selectedRole || !jobDescription.trim();

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            {/* Role Selector */}
            <div className="mb-6">
                <label
                    htmlFor="role-selector"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                >
                    Target Role
                </label>
                <select
                    id="role-selector"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                >
                    <option value="">Select a role...</option>
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>

            {/* Job Description Input */}
            <div className="mb-6">
                <label
                    htmlFor="job-description"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                >
                    Job Description
                </label>
                <textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="w-full h-64 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none outline-none"
                />
                <p className="text-xs text-slate-500 mt-2">
                    {jobDescription.length} characters
                </p>
            </div>

            {/* Action Button */}
            <Button
                text="Analyze Keywords"
                disabled={isDisabled}
                paddingY="8px"
                onClick={handleAnalyze}
            />
        </div>
    );
};

export default InputCard;
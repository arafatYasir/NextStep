"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { jobCategories } from "@/lib/data";

const InputCard = () => {
    // States
    const [jobCategory, setJobCategory] = useState("");
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
    const [jobDescription, setJobDescription] = useState("");

    // Extra hooks
    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const roleDropdownRef = useRef<HTMLDivElement>(null);

    // useEffect to change the selected role
    useEffect(() => {
        if(jobCategory) {
            setSelectedRole("");
        }
    }, [jobCategory]);

    // useEffect to handle outside clicks
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
                setCategoryDropdownOpen(false);
            }
            if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
                setRoleDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAnalyze = () => {
        // TODO: Connect to API
        console.log("Analyzing...", { selectedRole, jobDescription });
    };

    const isDisabled = !jobCategory || !selectedRole || !jobDescription.trim();

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            {/* ---- Job Category Selector ---- */}
            <div className="mb-6">
                <label
                    className="block text-base font-semibold text-slate-900 mb-2">
                    Job Category
                </label>

                <div
                    className="relative"
                    ref={categoryDropdownRef}
                >
                    <div
                        onClick={() => setCategoryDropdownOpen(prev => !prev)}
                        className={`w-full bg-slate-50 border ${categoryDropdownOpen ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200'} rounded-xl px-4 py-3 text-slate-900 cursor-pointer flex items-center justify-between transition-all hover:border-indigo-300`}
                    >
                        <span className={!jobCategory ? "text-slate-400" : "font-medium"}>
                            {jobCategory || "Select a job category..."}
                        </span>

                        {/* ---- Angle Icon ---- */}
                        <svg className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${categoryDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {categoryDropdownOpen && (
                        <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                            {Object.keys(jobCategories).map((category) => (
                                <div
                                    key={category}
                                    onClick={() => {
                                        setJobCategory(category);
                                        setCategoryDropdownOpen(false);
                                    }}
                                    className={`px-4 py-3 ${category === jobCategory ? "bg-indigo-600 text-slate-50" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600 hover:border-slate-200 border-b border-slate-100"} cursor-pointer transition-colors last:border-0`}
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ---- Role Selector ---- */}
            <div className="mb-6">
                <label
                    className="block text-base font-semibold text-slate-900 mb-2">
                    Your Role
                </label>

                <div
                    className="relative"
                    ref={roleDropdownRef}
                >
                    <div
                        onClick={jobCategory ? () => setRoleDropdownOpen(prev => !prev) : undefined}
                        className={`w-full bg-slate-50 border ${roleDropdownOpen ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200'} ${jobCategory ? "cursor-pointer hover:border-indigo-300" : "cursor-not-allowed"} rounded-xl px-4 py-3 text-slate-900 flex items-center justify-between transition-all`}
                    >
                        <span className={!selectedRole ? "text-slate-400" : "font-medium"}>
                            {selectedRole || "Select a job role..."}
                        </span>

                        {/* ---- Angle Icon ---- */}
                        <svg className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${roleDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {jobCategory && roleDropdownOpen && (
                        <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                            {jobCategories[jobCategory as keyof typeof jobCategories].map((role: string) => (
                                <div
                                    key={role}
                                    onClick={() => {
                                        setSelectedRole(role);
                                        setRoleDropdownOpen(false);
                                    }}
                                    className={`px-4 py-3 ${role === selectedRole ? "bg-indigo-600 text-slate-50" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600 hover:border-slate-200 border-b border-slate-100"} cursor-pointer transition-colors last:border-0`}
                                >
                                    {role}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ---- Job Description Input ---- */}
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
                <p className="text-sm text-slate-500">
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
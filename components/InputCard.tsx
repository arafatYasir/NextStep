"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { jobCategories } from "@/lib/data";
import Dropdown from "./Dropdown";

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
            <Dropdown
                label="Job Category"
                ref={categoryDropdownRef}
                options={Object.keys(jobCategories)}
                isOpen={categoryDropdownOpen}
                setIsOpen={setCategoryDropdownOpen}
                value={jobCategory}
                setValue={setJobCategory}
            />

            {/* ---- Role Selector ---- */}
            <Dropdown
                label="Your Role"
                ref={roleDropdownRef}
                options={jobCategories[jobCategory as keyof typeof jobCategories]}
                isOpen={roleDropdownOpen}
                setIsOpen={setRoleDropdownOpen}
                value={selectedRole}
                setValue={setSelectedRole}
            />

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
                    className="w-full h-64 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 placeholder:text-slate-400 hover:border-indigo-300 focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all resize-none outline-none"
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
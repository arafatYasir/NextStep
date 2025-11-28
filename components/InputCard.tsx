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
        if (jobCategory) {
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
        <div className="w-full max-w-3xl mx-auto bg-[rgb(var(--bg-surface))] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[rgb(var(--border-light))] p-8">
            {/* ---- Job Category Selector ---- */}
            <Dropdown
                label="Job Category"
                ref={categoryDropdownRef}
                options={Object.keys(jobCategories)}
                isOpen={categoryDropdownOpen}
                setIsOpen={setCategoryDropdownOpen}
                value={jobCategory}
                setValue={setJobCategory}
                anyDependency={false}
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
                anyDependency={true}
                dependency={jobCategory}
            />

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
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="w-full h-64 bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-default))] rounded-xl p-4 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] hover:border-[rgb(var(--border-hover))] focus:ring-2 focus:border-[rgb(var(--border-focus))] focus:ring-[rgba(var(--ring-focus),var(--alpha-ring))] resize-none outline-none"
                />
                <p className="text-sm text-[rgb(var(--text-tertiary))]">
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
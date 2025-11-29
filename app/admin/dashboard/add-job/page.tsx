"use client";

import { useState, KeyboardEvent } from "react";
import KeywordInput from "@/components/dashboard/KeywordInput";

interface JobFormData {
    jobRole: string;
    hardSkills: string[];
    softSkills: string[];
    processKeywords: string[];
    actionVerbs: string[];
    domainKeywords: string[];
    tools: string[];
    senioritySignals: string[];
}

const AddJob = () => {
    const [formData, setFormData] = useState<JobFormData>({
        jobRole: "",
        hardSkills: [],
        softSkills: [],
        processKeywords: [],
        actionVerbs: [],
        domainKeywords: [],
        tools: [],
        senioritySignals: [],
    });

    const [currentInputs, setCurrentInputs] = useState({
        hardSkills: "",
        softSkills: "",
        processKeywords: "",
        actionVerbs: "",
        domainKeywords: "",
        tools: "",
        senioritySignals: "",
    });

    const [loading, setLoading] = useState(false);

    // Add keyword to array
    const addKeyword = (field: keyof Omit<JobFormData, "jobRole">) => {
        const value = currentInputs[field].trim();
        if (value && !formData[field].includes(value)) {
            setFormData({
                ...formData,
                [field]: [...formData[field], value],
            });
            setCurrentInputs({ ...currentInputs, [field]: "" });
        }
    };

    // Remove keyword from array
    const removeKeyword = (field: keyof Omit<JobFormData, "jobRole">, index: number) => {
        setFormData({
            ...formData,
            [field]: formData[field].filter((_, i) => i !== index),
        });
    };

    // Handle Enter key press
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, field: keyof Omit<JobFormData, "jobRole">) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addKeyword(field);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        console.log("Form Data:", formData);

        // Here you would make your API call
        setTimeout(() => {
            alert("Job role added successfully! (Check console for data)");
            setLoading(false);
            // Reset form
            setFormData({
                jobRole: "",
                hardSkills: [],
                softSkills: [],
                processKeywords: [],
                actionVerbs: [],
                domainKeywords: [],
                tools: [],
                senioritySignals: [],
            });
        }, 1000);
    };

    return (
        <>
            {/* Top Bar */}
            <div className="flex items-center bg-[rgb(var(--bg-surface))] border-b border-[rgb(var(--border-default))] px-8 h-[89px]">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                        Add New Job Role
                    </h1>
                    <p className="text-sm text-[rgb(var(--text-secondary))] mt-1">
                        Create a new job role with associated keywords and skills
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Form Card */}
                    <div className="bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] rounded-2xl shadow-lg overflow-hidden">
                        <form onSubmit={handleSubmit}>
                            <div className="p-8 space-y-8">
                                {/* Job Role Input */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-[rgb(var(--text-primary))]">
                                        Job Role Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.jobRole}
                                        onChange={(e) =>
                                            setFormData({ ...formData, jobRole: e.target.value })
                                        }
                                        placeholder="e.g., Frontend Developer, Data Scientist"
                                        required
                                        className="w-full bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] focus:border-[rgb(var(--border-focus))] focus:ring-2 focus:ring-[rgba(var(--ring-focus),var(--alpha-ring))] rounded-lg px-4 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] focus:outline-none transition-all duration-200 text-lg font-medium"
                                    />
                                </div>

                                {/* Divider */}
                                <div className="border-t border-[rgb(var(--border-default))]"></div>

                                {/* Keywords Section */}
                                <div className="space-y-6">
                                    <h2 className="text-lg font-bold text-[rgb(var(--text-primary))] flex items-center gap-2">
                                        <span className="w-1 h-6 bg-[rgb(var(--bg-primary))] rounded-full"></span>
                                        Keywords & Skills
                                    </h2>

                                    <div className="grid gap-6">
                                        <KeywordInput
                                            label="Hard Skills"
                                            field="hardSkills"
                                            placeholder="e.g., JavaScript, Python, React"
                                            description="Technical skills and programming languages"
                                            currentValue={currentInputs.hardSkills}
                                            keywords={formData.hardSkills}
                                            onInputChange={(value) =>
                                                setCurrentInputs({ ...currentInputs, hardSkills: value })
                                            }
                                            onAdd={() => addKeyword("hardSkills")}
                                            onRemove={(index) => removeKeyword("hardSkills", index)}
                                            onKeyPress={(e) => handleKeyPress(e, "hardSkills")}
                                        />

                                        <KeywordInput
                                            label="Soft Skills"
                                            field="softSkills"
                                            placeholder="e.g., Communication, Leadership, Problem Solving"
                                            description="Interpersonal and professional skills"
                                            currentValue={currentInputs.softSkills}
                                            keywords={formData.softSkills}
                                            onInputChange={(value) =>
                                                setCurrentInputs({ ...currentInputs, softSkills: value })
                                            }
                                            onAdd={() => addKeyword("softSkills")}
                                            onRemove={(index) => removeKeyword("softSkills", index)}
                                            onKeyPress={(e) => handleKeyPress(e, "softSkills")}
                                        />

                                        <KeywordInput
                                            label="Process Keywords"
                                            field="processKeywords"
                                            placeholder="e.g., Agile, Scrum, CI/CD"
                                            description="Methodologies and processes"
                                            currentValue={currentInputs.processKeywords}
                                            keywords={formData.processKeywords}
                                            onInputChange={(value) =>
                                                setCurrentInputs({ ...currentInputs, processKeywords: value })
                                            }
                                            onAdd={() => addKeyword("processKeywords")}
                                            onRemove={(index) => removeKeyword("processKeywords", index)}
                                            onKeyPress={(e) => handleKeyPress(e, "processKeywords")}
                                        />

                                        <KeywordInput
                                            label="Action Verbs"
                                            field="actionVerbs"
                                            placeholder="e.g., Develop, Design, Implement"
                                            description="Common action verbs for this role"
                                            currentValue={currentInputs.actionVerbs}
                                            keywords={formData.actionVerbs}
                                            onInputChange={(value) =>
                                                setCurrentInputs({ ...currentInputs, actionVerbs: value })
                                            }
                                            onAdd={() => addKeyword("actionVerbs")}
                                            onRemove={(index) => removeKeyword("actionVerbs", index)}
                                            onKeyPress={(e) => handleKeyPress(e, "actionVerbs")}
                                        />

                                        <KeywordInput
                                            label="Domain Keywords"
                                            field="domainKeywords"
                                            placeholder="e.g., E-commerce, FinTech, Healthcare"
                                            description="Industry and domain-specific terms"
                                            currentValue={currentInputs.domainKeywords}
                                            keywords={formData.domainKeywords}
                                            onInputChange={(value) =>
                                                setCurrentInputs({ ...currentInputs, domainKeywords: value })
                                            }
                                            onAdd={() => addKeyword("domainKeywords")}
                                            onRemove={(index) => removeKeyword("domainKeywords", index)}
                                            onKeyPress={(e) => handleKeyPress(e, "domainKeywords")}
                                        />

                                        <KeywordInput
                                            label="Tools"
                                            field="tools"
                                            placeholder="e.g., Git, Docker, VS Code"
                                            description="Software tools and platforms"
                                            currentValue={currentInputs.tools}
                                            keywords={formData.tools}
                                            onInputChange={(value) =>
                                                setCurrentInputs({ ...currentInputs, tools: value })
                                            }
                                            onAdd={() => addKeyword("tools")}
                                            onRemove={(index) => removeKeyword("tools", index)}
                                            onKeyPress={(e) => handleKeyPress(e, "tools")}
                                        />

                                        <KeywordInput
                                            label="Seniority Signals"
                                            field="senioritySignals"
                                            placeholder="e.g., Senior, Lead, Principal"
                                            description="Keywords indicating experience level"
                                            currentValue={currentInputs.senioritySignals}
                                            keywords={formData.senioritySignals}
                                            onInputChange={(value) =>
                                                setCurrentInputs({ ...currentInputs, senioritySignals: value })
                                            }
                                            onAdd={() => addKeyword("senioritySignals")}
                                            onRemove={(index) => removeKeyword("senioritySignals", index)}
                                            onKeyPress={(e) => handleKeyPress(e, "senioritySignals")}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Footer */}
                            <div className="bg-[rgb(var(--bg-body))] border-t border-[rgb(var(--border-default))] px-8 py-6 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to reset the form?")) {
                                            setFormData({
                                                jobRole: "",
                                                hardSkills: [],
                                                softSkills: [],
                                                processKeywords: [],
                                                actionVerbs: [],
                                                domainKeywords: [],
                                                tools: [],
                                                senioritySignals: [],
                                            });
                                            setCurrentInputs({
                                                hardSkills: "",
                                                softSkills: "",
                                                processKeywords: "",
                                                actionVerbs: "",
                                                domainKeywords: "",
                                                tools: "",
                                                senioritySignals: "",
                                            });
                                        }
                                    }}
                                    className="px-6 py-3 border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] text-[rgb(var(--text-primary))] rounded-lg transition-all duration-200 font-medium hover:bg-[rgb(var(--bg-surface))] active:scale-95"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 bg-linear-to-r from-[rgb(var(--bg-primary))] to-[rgb(var(--text-accent))] hover:from-[rgb(var(--bg-primary-hover))] hover:to-[rgb(var(--bg-primary))] text-white rounded-lg transition-all duration-200 font-semibold shadow-lg shadow-[rgba(var(--shadow-primary),var(--alpha-shadow-primary))] hover:shadow-xl hover:shadow-[rgba(var(--shadow-primary),0.4)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                >
                                    {loading ? "Adding Job Role..." : "Add Job Role"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 p-4 bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] rounded-lg">
                        <p className="text-sm text-[rgb(var(--text-secondary))]">
                            <span className="font-semibold text-[rgb(var(--text-primary))]">💡 Tip:</span> Press{" "}
                            <kbd className="px-2 py-1 bg-[rgb(var(--bg-body))] border border-[rgb(var(--border-default))] rounded text-xs font-mono">
                                Enter
                            </kbd>{" "}
                            to quickly add keywords without clicking the Add button.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddJob;
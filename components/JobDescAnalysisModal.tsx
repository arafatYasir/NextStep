import { X, CheckCircle2, Briefcase, GraduationCap, DollarSign, Wrench, MessageSquare, Zap } from "lucide-react";

interface Analysis {
    skills: { name: string, count: number }[],
    softSkills: { name: string, count: number }[],
    tools: { name: string, count: number }[],
    phrases: string[],
    actionVerbs: string[],
    seniorityLevels: string[],
    educationalRequirements: string[],
    salary: string
}

const JobDescAnalysisModal = ({ analysis, onClose }: { analysis: Analysis, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl max-h-[90vh] bg-[rgb(var(--bg-surface))] rounded-2xl shadow-2xl border border-[rgb(var(--border-light))] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-[rgb(var(--border-light))] bg-[rgb(var(--bg-surface))] z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-[rgb(var(--text-primary))] font-heading">
                            Analysis Results
                        </h2>
                        <p className="text-sm text-[rgb(var(--text-secondary))] mt-1">
                            Here's exactly what the ATS is looking for
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-[rgb(var(--bg-hover))] text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 scrollbar-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Left Column: Skills & Tools */}
                        <div className="space-y-8">
                            {/* Hard Skills */}
                            <Section title="Hard Skills" icon={<Zap className="w-5 h-5 text-amber-500" />}>
                                <div className="flex flex-wrap gap-3">
                                    {analysis.skills?.map((skill, idx) => (
                                        <Badge key={idx} name={skill.name} count={skill.count} color="blue" />
                                    ))}
                                </div>
                            </Section>

                            {/* Tools & Tech */}
                            <Section title="Tools & Technologies" icon={<Wrench className="w-5 h-5 text-purple-500" />}>
                                <div className="flex flex-wrap gap-3">
                                    {analysis.tools?.map((tool, idx) => (
                                        <Badge key={idx} name={tool.name} count={tool.count} color="purple" />
                                    ))}
                                </div>
                            </Section>

                            {/* Soft Skills */}
                            <Section title="Soft Skills" icon={<MessageSquare className="w-5 h-5 text-emerald-500" />}>
                                <div className="flex flex-wrap gap-3">
                                    {analysis.softSkills?.map((skill, idx) => (
                                        <Badge key={idx} name={skill.name} count={skill.count} color="emerald" />
                                    ))}
                                </div>
                            </Section>
                        </div>

                        {/* Right Column: Context & Details */}
                        <div className="space-y-8">
                            {/* Key Phrases */}
                            <Section title="Key Phrases & Context" icon={<Briefcase className="w-5 h-5 text-indigo-500" />}>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.phrases?.map((phrase, idx) => (
                                        <span key={idx} className="px-3 py-1.5 text-sm bg-[rgb(var(--bg-input))] text-[rgb(var(--text-secondary))] rounded-md border border-[rgb(var(--border-default))]">
                                            {phrase}
                                        </span>
                                    ))}
                                </div>
                            </Section>

                            {/* Action Verbs */}
                            <Section title="Action Verbs" icon={<CheckCircle2 className="w-5 h-5 text-rose-500" />}>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.actionVerbs?.map((verb, idx) => (
                                        <span key={idx} className="px-3 py-1 text-sm text-[rgb(var(--text-tertiary))] italic">
                                            {verb}
                                        </span>
                                    ))}
                                </div>
                            </Section>

                            {/* Requirements Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoCard
                                    title="Education"
                                    icon={<GraduationCap className="w-4 h-4" />}
                                    items={analysis.educationalRequirements}
                                />
                                <InfoCard
                                    title="Seniority"
                                    icon={<Briefcase className="w-4 h-4" />}
                                    items={analysis.seniorityLevels}
                                />
                            </div>

                            {/* Salary */}
                            <div className="p-4 rounded-xl bg-gradient-to-r from-[rgb(var(--bg-primary))] to-[rgb(var(--bg-primary-hover))] text-white shadow-lg">
                                <div className="flex items-center gap-2 mb-1 opacity-90">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-sm font-medium">Compensation</span>
                                </div>
                                <p className="text-lg font-bold">
                                    {analysis.salary || "Not specified"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper Components
const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[rgb(var(--border-light))]">
            {icon}
            <h3 className="font-semibold text-[rgb(var(--text-primary))]">{title}</h3>
        </div>
        {children}
    </div>
);

const Badge = ({ name, count, color }: { name: string, count: number, color: "blue" | "purple" | "emerald" }) => {
    const colors = {
        blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
        purple: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
        emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
    };

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colors[color]} transition-all hover:scale-105`}>
            <span className="font-medium text-sm">{name}</span>
            {count > 1 && (
                <span className="flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-white/50 dark:bg-black/20">
                    {count}
                </span>
            )}
        </div>
    );
};

const InfoCard = ({ title, icon, items }: { title: string, icon: React.ReactNode, items: string[] }) => (
    <div className="p-4 rounded-xl bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-default))]">
        <div className="flex items-center gap-2 mb-3 text-[rgb(var(--text-secondary))]">
            {icon}
            <span className="text-sm font-semibold">{title}</span>
        </div>
        <ul className="space-y-1">
            {items?.length > 0 ? items.map((item, idx) => (
                <li key={idx} className="text-sm text-[rgb(var(--text-primary))] font-medium">
                    • {item}
                </li>
            )) : (
                <li className="text-sm text-[rgb(var(--text-muted))] italic">Not specified</li>
            )}
        </ul>
    </div>
);

export default JobDescAnalysisModal;
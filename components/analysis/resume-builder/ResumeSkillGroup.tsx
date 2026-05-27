const ResumeSkillGroup = ({ label, skills }: { label: string; skills: string[] }) => {
    if (!skills || skills.length === 0) return null;

    return (
        <div className="space-y-1.5">
            <p className="text-xs font-sans font-semibold text-[rgb(var(--text-tertiary))] uppercase tracking-wider">
                {label}
            </p>
            <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                    <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-sans rounded-full border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-body))] text-[rgb(var(--text-secondary))] font-medium"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ResumeSkillGroup;
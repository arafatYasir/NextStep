const ResumeSkillGroup = ({ label, skills }: { label: string; skills: string[] }) => {
    if (!skills || skills.length === 0) return null;

    return (
        <p>
            <span className="font-heading text-[13px] sm:text-sm font-semibold text-foreground">
                {label}:
            </span>
            <span className="font-sans text-[13px] sm:text-sm text-[rgb(var(--text-secondary))]">
                {" " + skills.join(", ")}
            </span>
        </p>
    );
};

export default ResumeSkillGroup;
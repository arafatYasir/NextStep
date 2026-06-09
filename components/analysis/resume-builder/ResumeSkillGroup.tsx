const ResumeSkillGroup = ({ label, skills }: { label: string; skills: string[] }) => {
    if (!skills || skills.length === 0) return null;

    return (
        <p>
            <span className="font-heading text-sm sm:text-[15px] font-semibold text-foreground tracking-wider">
                {label}:
            </span>
            <span className="font-sans text-[13px] sm:text-sm text-[rgb(var(--text-secondary))]">
                {" " + skills.join(", ")}
            </span>
        </p>
    );
};

export default ResumeSkillGroup;
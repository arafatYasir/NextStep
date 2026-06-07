import Container from "@/components/Container";
import ResumeSection from "./ResumeSection";
import ResumeSkillGroup from "./ResumeSkillGroup";

const ResumeResultView = ({ result }: { result: ResumeData }) => {
    return (
        <Container>
            <div className="py-8 lg:py-12 flex justify-center">
                <div className="w-full max-w-3xl bg-card rounded-xl shadow-xl border border-[rgb(var(--border-default))] p-6 sm:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* ---- Header: Name + Title + Contact ---- */}
                    <div className="text-center space-y-2 pb-6 border-b border-dashed border-[rgb(var(--border-default))]">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground">
                                {result.personalInfo.fullName}
                            </h1>
                            <h2 className="text-lg sm:text-xl font-semibold font-heading tracking-tight text-[rgb(var(--text-accent))]">{result.resumeTitle}</h2>
                        </div>
                        <div className="flex items-center justify-center gap-x-2 gap-y-1 flex-wrap text-sm font-sans text-[rgb(var(--text-secondary))]">
                            <span>{result.personalInfo.email}</span>
                            <span className="text-[rgb(var(--text-muted))]">•</span>
                            <span>{result.personalInfo.phone}</span>
                            <span className="text-[rgb(var(--text-muted))]">•</span>
                            <span>{result.personalInfo.location}</span>
                        </div>
                        <div className="flex items-center justify-center gap-x-3 gap-y-1 flex-wrap text-sm font-sans">
                            <a href={result.personalInfo.github} target="_blank" className="text-[rgb(var(--text-accent))] hover:underline">
                                GitHub
                            </a>
                            <a href={result.personalInfo.linkedin} target="_blank" className="text-[rgb(var(--text-accent))] hover:underline">
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* ---- Summary ---- */}
                    <ResumeSection title="Professional Summary">
                        <p className="text-sm sm:text-[15px] font-sans text-[rgb(var(--text-secondary))] leading-relaxed">
                            {result.summary}
                        </p>
                    </ResumeSection>

                    {/* ---- Skills ---- */}
                    <ResumeSection title="Skills">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ResumeSkillGroup label="Languages" skills={result.skills.languages} />
                            <ResumeSkillGroup label="Frameworks & Libraries" skills={result.skills.frameworksAndLibraries} />
                            <ResumeSkillGroup label="Tools & Platforms" skills={result.skills.toolsAndPlatforms} />
                            <ResumeSkillGroup label="Soft Skills" skills={result.skills.softSkills} />
                        </div>
                    </ResumeSection>

                    {/* ---- Experience ---- */}
                    {result.experience?.length > 0 && (
                        <ResumeSection title="Work Experience">
                            <div className="space-y-5">
                                {result.experience.map((exp, idx) => (
                                    <div key={idx} className="pl-4 border-l-2 border-[rgb(var(--bg-primary))]/25 space-y-1.5">
                                        <div className="flex items-start justify-between flex-wrap gap-x-4 gap-y-1">
                                            <h4 className="font-heading font-semibold text-foreground text-[15px]">
                                                {exp.jobTitle}
                                            </h4>
                                            <span className="text-xs font-sans text-[rgb(var(--text-tertiary))] whitespace-nowrap">
                                                {exp.duration}
                                            </span>
                                        </div>
                                        <p className="text-sm font-sans text-[rgb(var(--text-accent))] font-medium">{exp.company}</p>
                                        <ul className="list-disc list-inside space-y-1 mt-1.5">
                                            {exp.responsibilities.map((r, i) => (
                                                <li key={i} className="text-sm font-sans text-[rgb(var(--text-secondary))] leading-relaxed">
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </ResumeSection>
                    )}

                    {/* ---- Projects ---- */}
                    {result.projects?.length > 0 && (
                        <ResumeSection title="Projects">
                            <div className="space-y-5">
                                {result.projects.map((proj, idx) => (
                                    <div key={idx} className="pl-4 border-l-2 border-[rgb(var(--bg-primary))]/25 space-y-1.5">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-heading font-semibold text-foreground text-[15px]">
                                                {proj.projectName}
                                            </h4>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" className="text-xs text-[rgb(var(--text-accent))] hover:underline font-sans">
                                                    ↗ View
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {proj.techStack.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-0.5 text-xs font-sans rounded-full bg-[rgb(var(--bg-primary))]/8 text-[rgb(var(--text-accent))] font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <ul className="list-disc list-inside space-y-1 mt-1">
                                            {proj.highlights.map((h, i) => (
                                                <li key={i} className="text-sm font-sans text-[rgb(var(--text-secondary))] leading-relaxed">
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </ResumeSection>
                    )}

                    {/* ---- Education ---- */}
                    {result.education?.length > 0 && (
                        <ResumeSection title="Education">
                            <div className="space-y-4">
                                {result.education.map((edu, idx) => (
                                    <div key={idx} className="flex items-start justify-between flex-wrap gap-x-4 gap-y-1">
                                        <div>
                                            <h4 className="font-heading font-semibold text-foreground text-[15px]">{edu.degree}</h4>
                                            <p className="text-sm font-sans text-[rgb(var(--text-secondary))]">{edu.institution}</p>
                                        </div>
                                        <span className="text-xs font-sans text-[rgb(var(--text-tertiary))] whitespace-nowrap">
                                            {edu.duration}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </ResumeSection>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default ResumeResultView;
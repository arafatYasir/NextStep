import { Bot, FileWarning, HelpCircle, Clock } from 'lucide-react';

const insights = [
    {
        icon: Bot,
        title: "Job Descriptions Aren't Written for Candidates",
        description: "Recruiters write job descriptions for ATS systems, not humans. They hide critical signals inside tools, skills, experience levels, and phrasing. Reading them normally means missing what actually matters."
    },
    {
        icon: FileWarning,
        title: "One Resume Cannot Win Every Job",
        description: "Using the same resume for multiple roles feels efficient, but ATS scores are job-specific. If your resume isn't aligned with that exact description, it gets filtered instantly."
    },
    {
        icon: HelpCircle,
        title: "You Never Know What's Missing",
        description: "No feedback. No clarity. No score. So you keep applying blindly, unsure whether you're rejected because of skills — or formatting and keyword gaps."
    },
    {
        icon: Clock,
        title: "Manual Tailoring Is a Time Trap",
        description: "Extracting keywords, rewriting bullets, adjusting phrasing — 30 to 60 minutes per application. That's time you could spend applying smarter and faster."
    }
];

const InsightSection = () => {
    return (
        <section className="container mx-auto px-6 py-20 space-y-20">
            <div className="text-center space-y-5 max-w-5xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
                    It's Not That You're Underqualified. <br className="hidden md:block" />
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-[rgb(var(--bg-primary))]/80 to-[rgb(var(--bg-primary-hover))]">It's That You're Playing The Game Blind.</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
                    Most developers resumes fail even before a human ever sees them.
                    <br className="hidden md:block" />
                    Not because of skills or experience — but because they don't match how hiring systems actually work.
                </p>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px"
            }}>
                {insights.map((item, index) => (
                    <div key={index} className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-secondary/20 border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] hover:bg-[rgb(var(--bg-primary))]/10 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-xl bg-[rgb(var(--bg-primary))] text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-250">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-[rgb(var(--bg-primary))]">
                            {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="text-center pt-8 border-t border-border/40 max-w-2xl mx-auto">
                <p className="text-lg font-medium text-foreground/80">
                    This is the gap NextStep was built to close.
                </p>
            </div>
        </section>
    );
};

export default InsightSection;

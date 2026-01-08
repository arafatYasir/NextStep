import { Bot, FileWarning, HelpCircle, Clock } from 'lucide-react';

const insights = [
    {
        icon: Bot,
        title: "Job Descriptions Aren’t Written for Candidates",
        description: "Recruiters write job descriptions for ATS systems, not humans. They hide critical signals inside tools, skills, experience levels, and phrasing. Reading them normally means missing what actually matters."
    },
    {
        icon: FileWarning,
        title: "One Resume Cannot Win Every Job",
        description: "Using the same resume for multiple roles feels efficient, but ATS scores are job-specific. If your resume isn’t aligned with that exact description, it gets filtered instantly."
    },
    {
        icon: HelpCircle,
        title: "You Never Know What’s Missing",
        description: "No feedback. No clarity. No score. So you keep applying blindly, unsure whether you’re rejected because of skills—or formatting and keyword gaps."
    },
    {
        icon: Clock,
        title: "Manual Tailoring Is a Time Trap",
        description: "Extracting keywords, rewriting bullets, adjusting phrasing—30 to 60 minutes per application. That’s time you could spend applying smarter and faster."
    }
];

const InsightSection = () => {
    return (
        <section className="container mx-auto px-6 py-20 space-y-20">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    It’s Not That You’re Underqualified. <br className="hidden md:block" />
                    <span className="text-muted-foreground">You’re Playing the Hiring Game Blind.</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Most developer resumes fail before a human ever sees them.
                    <br className="hidden md:block" />
                    Not because of skills—but because they don’t match how hiring systems actually work.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {insights.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-secondary/20 border border-border/50 hover:bg-secondary/40 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
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

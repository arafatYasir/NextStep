import { Bot, FileWarning, HelpCircle, Clock } from 'lucide-react';
import InsightCard from './InsightCard';
import Container from '../Container';

const insights = [
    {
        icon: Bot,
        title: "Job Descriptions Aren't Written for Candidates",
        description: "Recruiters write job descriptions for ATS systems, not humans. They hide critical signals inside tools, skills, experience levels, and phrasing. Reading them normally means missing what actually matters."
    },
    {
        icon: FileWarning,
        title: "One Resume Will Never Win Every Job",
        description: "Using the same resume for multiple roles feels efficient. In reality, ATS scoring is job-specific. If your resume isn't aligned with that exact description, it gets filtered out instantly."
    },
    {
        icon: HelpCircle,
        title: "You Never Know What's Missing",
        description: "No feedback. No clarity. No score. So you keep applying blindly, unsure whether you're rejected because of skills — or formatting and keyword gaps."
    },
    {
        icon: Clock,
        title: "Manual Tailoring Is a Time Trap",
        description: "Extracting keywords, rewriting bullets, adjusting phrasing — 30 to 60 minutes per application. Time that could be spent applying to more jobs, with far better precision."
    }
];

const InsightSection = () => {
    return (
        <Container>
            <section className="py-20 space-y-20">
                <div className="text-center space-y-5 max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2] font-heading">
                        It's Not That You're Underqualified. <br className="hidden md:block" />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-[rgb(var(--bg-primary))]/80 to-[rgb(var(--bg-primary-hover))]">You're Playing The Hiring Game Blind.</span>
                    </h2>
                    <p className="text-lg font-sans text-muted-foreground text-center leading-relaxed">
                        Most developer resumes fail even before a human ever sees them.
                        <br className="hidden md:block" />
                        Not because of skills or experience — but because they don't align with how hiring systems actually work.
                    </p>
                </div>

                {/* ---- Insight Cards ---- */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px"
                }}>
                    {insights.map((item, index) => (
                        <InsightCard key={index} item={item} />
                    ))}
                </div>
            </section>
        </Container>
    );
};

export default InsightSection;

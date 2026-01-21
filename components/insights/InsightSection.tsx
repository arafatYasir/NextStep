import InsightCard from './InsightCard';
import Container from '../Container';
import { insights } from '@/lib/insights';
import Section from '../Section';

const InsightSection = () => {
    return (
        <Container>
            <Section>
                <div className="text-center space-y-6 max-w-5xl mx-auto flex flex-col items-center">
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-center tracking-tight text-foreground leading-[1.2]">
                        It's Not That You're Underqualified. <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-[rgb(var(--bg-primary))]/80 to-[rgb(var(--bg-primary-hover))]">You're Playing The Hiring Game Blind.</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg font-sans text-foreground/80 max-w-2xl leading-relaxed">
                        Most developer resumes fail even before a human ever sees them.
                        Not because of skills or experience — but because they don't align with how hiring systems actually work.
                    </p>
                </div>

                {/* ---- Insight Cards ---- */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px"
                }}>
                    {insights.map((item, index) => (
                        <InsightCard key={index} item={item} />
                    ))}
                </div>
            </Section>
        </Container>
    );
};

export default InsightSection;

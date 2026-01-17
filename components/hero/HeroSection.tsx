import { Sparkles } from "lucide-react";
import Container from "../Container";
import Section from "../Section";
import TextBadge from "../TextBadge";
import HeroButtons from "./HeroButtons"

const HeroSection = () => {
    return (
        <Section 
            resetStyles={true}
            className="relative overflow-hidden min-h-screen min-h-svh flex flex-col justify-center pt-30 pb-16 md:pb-20"
        >
            {/* ---- Background Gradient ---- */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-linear-to-br from-[rgb(var(--bg-primary))]/2 to-[rgb(var(--bg-primary-hover))]/40"></div>

            {/* ---- Container ---- */}
            <Container>
                <div className="flex flex-col items-center text-center gap-y-10">
                    {/* ---- Micro Positioning Line ---- */}
                    <TextBadge>
                        <span className="font-sans">
                            <Sparkles size={20} className="text-[rgb(var(--bg-primary-hover))]" />
                        </span>
                        <span className="font-sans ">Your AI Career Co-Pilot for Smarter Job Wins</span>
                    </TextBadge>

                    {/* ---- Main Heading ---- */}
                    <h1 className="max-w-5xl text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.2] font-heading">
                        Everything for <span className="bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary))]/75 to-[rgb(var(--bg-primary-hover))]">Applying Smarter</span> to be <span className="bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary-hover))] to-[rgb(var(--bg-primary))]/75">Hired Faster</span>
                    </h1>

                    {/* ---- Sub-heading ---- */}
                    <p className="text-lg font-sans text-foreground/80 max-w-2xl text-balance leading-relaxed">
                        Analyze job descriptions, evaluate your resume, and build tailored resumes — all powered by AI to help you stand out in a competitive job market.
                    </p>

                    {/* ---- CTA Buttons ---- */}
                    <HeroButtons />
                </div>
            </Container>
        </Section>
    );
}

export default HeroSection;
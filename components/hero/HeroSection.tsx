import Container from "../Container";
import TextBadge from "../TextBadge";
import HeroButtons from "./HeroButtons"

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24">
            {/* ---- Background ---- */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-linear-to-br from-[rgb(var(--bg-primary))]/2 to-[rgb(var(--bg-primary))]/20"></div>

            <Container>
                <div className="flex flex-col items-center text-center mx-auto space-y-10">
                    {/* ---- Micro Positioning Line ---- */}
                    <TextBadge>
                        <span className="font-sans">✨</span>
                        <span className="font-sans">The AI Career Co-Pilot for the Top 1%</span>
                    </TextBadge>

                    {/* ---- Main Heading ---- */}
                    <h1 className="max-w-5xl text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.2] font-heading">
                        Everything for <span className="bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary))]/80 to-[rgb(var(--bg-primary-hover))]">Applying Smarter</span> to be <span className="bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary-hover))] to-[rgb(var(--bg-primary))]/80">Hired Faster</span>
                    </h1>

                    {/* ---- Sub-heading ---- */}
                    <p className="text-lg font-sans text-muted-foreground max-w-2xl text-balance leading-relaxed">
                        Analyze job descriptions, evaluate your resume, and build tailored resumes — all powered by AI to help you stand out in a competitive hiring market.
                    </p>

                    {/* ---- CTA Buttons ---- */}
                    <HeroButtons />
                </div>
            </Container>
        </section>
    );
}

export default HeroSection;
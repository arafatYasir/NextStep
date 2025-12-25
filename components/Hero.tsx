import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24">
            {/* ---- Background ---- */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-linear-to-br from-[rgb(var(--bg-primary))]/2 to-[rgb(var(--bg-primary))]/20"></div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-10">

                    {/* ---- Micro Positioning Line ---- */}
                    <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md shadow-sm">
                        <span>✨</span>
                        <span>The AI Career Co-Pilot for the Top 1%</span>
                    </div>

                    {/* 3. Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
                        Everything You Need to <span className="text-primary">Apply Smarter</span> & Get Hired Quicker
                    </h1>

                    {/* 4. Sub-heading */}
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed">
                        Analyze job descriptions, evaluate your resume, and build tailored resumes — all powered by AI to help you stand out in a competitive hiring market.
                    </p>

                    {/* 5. CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-6">
                        <Button size="lg" className="w-full sm:w-auto text-base h-14 px-10 rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                            Land Your Dream Job
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-14 px-10 rounded-full bg-background/50 border-input hover:bg-background/80 hover:text-foreground backdrop-blur-sm transition-all duration-300">
                            See How It Works
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
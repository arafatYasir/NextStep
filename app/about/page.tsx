import Container from "@/components/Container"
import Section from "@/components/Section"
import TextBadge from "@/components/TextBadge"
import { aboutCards, aboutTargets } from "@/lib/about"
import {
    Sparkles,
    Flame
} from "lucide-react"

const AboutPage = () => {
    return (
        <main>
            <Section>
                <Container>
                    {/* ---- Header ---- */}
                    <div className="flex flex-col items-center text-center gap-y-6 mx-auto mb-16 sm:mb-24">
                        <TextBadge>
                            <span className="font-sans">
                                <Sparkles className="w-4 h-4 text-[rgb(var(--bg-primary-hover))]" />
                            </span>
                            <span className="font-sans text-xs xs:text-sm font-semibold tracking-wide uppercase">About NextStep</span>
                        </TextBadge>

                        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight font-heading text-balance">
                            Helping Job Seekers Make{" "}
                            <span className="bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary))]/75 to-[rgb(var(--bg-primary-hover))]">
                                Smarter Career Moves
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl font-sans text-foreground/80 leading-relaxed text-balance max-w-3xl mt-4">
                            Finding the right job is challenging. Understanding what employers actually want, tailoring resumes for each application, and ensuring ATS compatibility can make the job search process frustrating and time-consuming.
                        </p>
                    </div>

                    {/* ---- Introduction & Why We Built NextStep ---- */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-stretch">
                        <div className="md:col-span-7 flex flex-col justify-center space-y-5">
                            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
                                Simplify the Application Journey
                            </h2>
                            <p className="text-foreground/80 font-sans leading-relaxed text-base">
                                NextStep was built to simplify that process. We believe candidates shouldn't have to guess what recruiters are looking for when applying for roles.
                            </p>
                            <p className="text-foreground/80 font-sans leading-relaxed text-base">
                                We use AI to help early-career professionals understand job requirements, improve their resumes, build job-specific applications, and apply with greater confidence. Instead of guessing, you get clear insights, practical recommendations, and tools designed to help you make informed career decisions.
                            </p>
                        </div>

                        <div className="md:col-span-5 relative group flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[rgb(var(--border-light))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] bg-card/40 backdrop-blur-xs transition-all duration-250">
                            <div>
                                <div className="size-10 sm:size-12 rounded-xl bg-[rgb(var(--bg-primary))]/10 text-[rgb(var(--bg-primary))] flex items-center justify-center mb-6">
                                    <Flame className="size-6" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                                    Why We Built NextStep
                                </h3>
                                <div className="space-y-4 text-foreground/80 font-sans text-sm sm:text-base leading-relaxed">
                                    <p>
                                        Most candidates face the same problem: they spend hours applying for jobs without knowing whether their resume truly matches the role.
                                    </p>
                                    <p>
                                        Job descriptions are often filled with hidden requirements, specific keywords, and expectations that are easy to miss. As a result, qualified candidates frequently submit generic applications that fail to communicate their strengths effectively.
                                    </p>
                                    <p className="font-semibold text-[rgb(var(--bg-primary))]">
                                        NextStep helps bridge that gap.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* ---- What NextStep Helps You Do ---- */}
            <Section>
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-center tracking-tight text-foreground">
                            What NextStep Helps You Do
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-foreground/80 font-sans leading-relaxed mt-4">
                            Get all the tools you need to optimize your job application materials and understand employer expectations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {
                            aboutCards.map((card) => (
                                <div key={card.id} className="group relative flex flex-col gap-4 p-6 sm:p-8 rounded-xl border border-transparent hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] bg-card transition-all duration-250 shadow-md hover:shadow-lg">
                                    <div className="size-10 sm:size-12 rounded-xl bg-[rgb(var(--bg-primary))] text-white flex items-center justify-center shrink-0 shadow-sm">
                                        <card.icon className="size-6" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                                        {card.title}
                                    </h3>
                                    <p className="text-foreground/80 font-sans leading-relaxed text-sm sm:text-base text-justify">
                                        {card.description}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </Section>

            {/* ---- Target Audience & Mission ---- */}
            <Section>
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-center tracking-tight text-foreground">
                            Target Audience & Mission
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {
                            aboutTargets.map((target) => (
                                <div key={target.id} className="space-y-6 p-6 sm:p-8 rounded-2xl border border-[rgb(var(--border-light))] bg-card/40 backdrop-blur-xs transition-all duration-250 hover:border-[rgb(var(--border-hover))]">
                                    <div className="size-10 sm:size-12 rounded-xl bg-[rgb(var(--bg-primary))]/10 text-[rgb(var(--bg-primary))] flex items-center justify-center">
                                        <target.icon className="size-6" />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
                                        {target.title}
                                    </h2>
                                    <p className="text-foreground/80 font-sans leading-relaxed text-base">
                                        {target.description1}
                                    </p>
                                    <p className="text-foreground/80 font-sans leading-relaxed text-base">
                                        {target.description2}
                                    </p>
                                </div>
                            ))
                        }
                    </div>

                    {/* ---- Final Callout ---- */}
                    <div className="relative overflow-hidden mt-16 p-8 sm:p-12 rounded-2xl border border-[rgb(var(--border-hover))]/40 bg-linear-to-br from-[rgb(var(--bg-primary))]/5 to-[rgb(var(--bg-primary-hover))]/10 text-center max-w-4xl mx-auto shadow-sm">
                        <p className="text-sm font-sans text-[rgb(var(--bg-primary-hover))] uppercase tracking-wider font-semibold mb-3">Our Objective</p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground max-w-2xl mx-auto leading-relaxed">
                            Helping you take the <span className="bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary))]/75 to-[rgb(var(--bg-primary-hover))] font-extrabold">next step</span> in your career with confidence.
                        </h3>
                    </div>
                </Container>
            </Section>
        </main>
    )
}

export default AboutPage
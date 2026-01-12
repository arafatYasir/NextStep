import Link from "next/link";
import Image from "next/image";
import Container from "../Container";
import { Button } from "../ui/button";

const Footer = () => {
    return (
        <footer className="w-full py-16 mt-20 bg-[rgb(var(--bg-hover))] border-t border-[rgb(var(--border-default))]">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20 mb-8">
                    {/* ---- Left Column: Branding ---- */}
                    <div className="flex flex-col gap-5">
                        <Link href="/" className="flex items-center gap-x-2">
                            <div className="w-[140px] h-[30px] overflow-hidden">
                                <Image
                                    src="/images/logo.svg"
                                    alt="Logo"
                                    width={488}
                                    height={123}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Link>

                        <div className="space-y-4">
                            <p className="text-xl font-heading font-semibold text-foreground leading-snug">
                                Your personal AI career copilot.
                            </p>
                            <p className="font-sans text-muted-foreground leading-relaxed">
                                Building trust through providing precision and job-specific intelligence to help developers land more interviews.
                            </p>
                        </div>
                    </div>

                    {/* ---- Middle Column: Navigation ---- */}
                    <div className="grid grid-cols-2 gap-8 md:gap-12 text-nowrap">
                        {/* ---- Group 1: Product ---- */}
                        <div className="flex flex-col gap-5">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                                Product
                            </h4>
                            <ul className="flex flex-col gap-4 text-base">
                                {["AI Job Analyzer", "AI Resume Builder", "AI Resume Score", "AI Cover Letters"].map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--bg-primary-hover))] transition-colors hover:underline"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ---- Group 2: Company ---- */}
                        <div className="flex flex-col gap-5">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                                Company
                            </h4>
                            <ul className="flex flex-col gap-4 text-base">
                                {["About", "Pricing", "FAQ", "Contact"].map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--bg-primary-hover))] transition-colors hover:underline"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ---- Right Column: CTA ---- */}
                    <div className="flex flex-col items-start gap-8 p-8 rounded-2xl bg-card border border-[rgb(var(--border-default))] shadow-sm">
                        <div className="space-y-3">
                            <h3 className="text-xl font-heading font-bold text-foreground">
                                Are you ready to start?
                            </h3>
                            <p className="text-sm text-muted-foreground font-sans">
                                Join with thousands of developers who are using AI to land more interviews.
                            </p>
                        </div>
                        <Button size="lg" className="w-full text-base font-semibold cursor-pointer bg-[rgb(var(--bg-surface))] bg-linear-to-r from-[rgb(var(--bg-primary-hover))] to-[rgb(var(--bg-primary))]/75 text-white hover:-translate-y-0.5 transition-all duration-250">
                            Get Started Free
                        </Button>
                    </div>
                </div>

                {/* ---- Bottom Bar ---- */}
                <div className="pt-8 border-t border-[rgb(var(--border-default))] flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-muted-foreground font-sans font-medium">
                        © {new Date().getFullYear()} NextStep. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {["Privacy", "Terms", "Security"].map((legal) => (
                            <Link
                                key={legal}
                                href="#"
                                className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--bg-primary-hover))] transition-all hover:underline"
                            >
                                {legal}
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { XCircle, ArrowLeft, Tag } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import TextBadge from "@/components/TextBadge";
import { Button } from "@/components/ui/button";

const PaymentCancelPage = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Section
            resetStyles={true}
            className="relative overflow-hidden min-h-screen min-h-svh flex flex-col justify-center py-20"
        >
            <Container>
                <div className="flex flex-col items-center text-center gap-y-8 max-w-xl mx-auto">

                    {/* ---- Micro Positioning Line ---- */}
                    <TextBadge>
                        <span className="font-sans">
                            <XCircle className="w-4 h-4 xs:w-5 xs:h-5 text-[rgb(var(--text-tertiary))]" />
                        </span>
                        <span className="font-sans text-xs xs:text-sm font-semibold">Checkout Cancelled</span>
                    </TextBadge>

                    {/* ---- Icon ---- */}
                    <div
                        className={`flex items-center justify-center w-20 h-20 rounded-full border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] transition-all duration-700 ease-out ${mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"
                            }`}
                    >
                        <XCircle className="w-10 h-10 text-[rgb(var(--text-tertiary))]" strokeWidth={2} />
                    </div>

                    {/* ---- Heading ---- */}
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance leading-[1.2] font-heading">
                        No charge was made
                    </h1>

                    {/* ---- Sub-heading ---- */}
                    <p className="text-sm sm:text-base font-sans text-foreground/80 max-w-lg leading-relaxed">
                        You closed checkout before it finished, so nothing was charged to your card. You&apos;re still on the Free plan — upgrade whenever you&apos;re ready.
                    </p>

                    {/* ---- CTA Buttons ---- */}
                    <div className="flex flex-col xs:flex-row items-center gap-3 pt-2">
                        <Button asChild size="lg">
                            <Link href="/#pricing">
                                <Tag className="w-4 h-4" />
                                View Plans
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default PaymentCancelPage;
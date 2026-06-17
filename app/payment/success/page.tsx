"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, LayoutDashboard } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import TextBadge from "@/components/TextBadge";
import { Button } from "@/components/ui/button";

const PaymentSuccessPage = () => {
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
            {/* ---- Background Gradient ---- */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-linear-to-br from-[rgb(var(--bg-primary))]/2 to-[rgb(var(--bg-primary-hover))]/40" />

            <Container>
                <div className="flex flex-col items-center text-center gap-y-8 max-w-xl mx-auto">

                    {/* ---- Micro Positioning Line ---- */}
                    <TextBadge>
                        <span className="font-sans">
                            <CheckCircle2 className="w-4 h-4 xs:w-5 xs:h-5 text-[rgb(var(--bg-primary-hover))]" />
                        </span>
                        <span className="font-sans text-xs xs:text-sm font-semibold">Payment Confirmed</span>
                    </TextBadge>

                    {/* ---- Icon — gradient ring with a shimmer sweep while the plan activates ---- */}
                    <div
                        className={`relative flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-[rgb(var(--bg-primary))] to-[rgb(var(--bg-primary-hover))] transition-all duration-700 ease-out ${mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"
                            }`}
                    >
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                        <CheckCircle2 className="w-10 h-10 text-white relative z-10" strokeWidth={2} />
                    </div>

                    {/* ---- Heading ---- */}
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance leading-[1.2] font-heading">
                        You're <span className="bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary))]/75 to-[rgb(var(--bg-primary-hover))]">all set</span>
                    </h1>

                    {/* ---- Sub-heading ---- */}
                    <p className="text-sm sm:text-base font-sans text-foreground/80 max-w-lg leading-relaxed">
                        Your payment went through and your plan is being activated. This usually takes just a few seconds — refresh your dashboard if it doesn&apos;t update right away.
                    </p>

                    {/* ---- CTA Buttons ---- */}
                    <div className="flex flex-col xs:flex-row items-center gap-3 pt-2">
                        <Button asChild size="lg">
                            <Link href="/dashboard">
                                <LayoutDashboard className="w-4 h-4" />
                                Go to Dashboard
                            </Link>
                        </Button>
                        <Button variant="secondary" size="lg">
                            <Link href="/billing">
                                View Billing
                            </Link>
                        </Button>
                    </div>

                    <p className="text-xs text-foreground/50 font-sans pt-2">
                        A receipt has been sent to your email address.
                    </p>
                </div>
            </Container>
        </Section>
    );
};

export default PaymentSuccessPage;
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "../Section";
import Container from "../Container";
import TextBadge from "../TextBadge";

export default function ErrorState() {
    return (
        <Section
            resetStyles={true}
            className="relative overflow-hidden min-h-screen min-h-svh flex flex-col justify-center py-20"
        >
            {/* ---- Background Gradient (Shifted to error/destructive variable fallback or muted crimson) ---- */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-linear-to-br from-destructive/5 to-destructive/10" />

            <Container>
                <div className="flex flex-col items-center text-center gap-y-8 max-w-xl mx-auto">

                    {/* ---- Micro Positioning Line ---- */}
                    <TextBadge>
                        <span className="font-sans">
                            <AlertTriangle className="w-4 h-4 xs:w-5 xs:h-5 text-destructive" />
                        </span>
                        <span className="font-sans text-xs xs:text-sm font-semibold text-destructive">Verification Failed</span>
                    </TextBadge>

                    {/* ---- Icon ---- */}
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-destructive to-destructive/80 shadow-md shadow-destructive/20">
                        <AlertTriangle className="w-10 h-10 text-white relative z-10" strokeWidth={2} />
                    </div>

                    {/* ---- Heading ---- */}
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance leading-[1.2] font-heading">
                        Something went <span className="bg-linear-to-r text-transparent bg-clip-text from-destructive to-destructive/70">wrong</span>
                    </h1>

                    {/* ---- Sub-heading ---- */}
                    <p className="text-sm sm:text-base font-sans text-foreground/80 max-w-lg leading-relaxed">
                        We couldn't securely verify your checkout session. Your payment might still be processing on Stripe's side, or the session token could be invalid.
                    </p>

                    {/* ---- CTA Buttons ---- */}
                    <div className="flex flex-col xs:flex-row items-center gap-3 pt-2 w-full xs:w-auto">
                        <Button asChild variant="secondary" size="lg" className="w-full xs:w-auto">
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
}
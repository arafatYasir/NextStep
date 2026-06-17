import { Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "../Section";
import Container from "../Container";
import TextBadge from "../TextBadge";

export default function VerifyingState() {
    return (
        <Section
            resetStyles={true}
            className="relative overflow-hidden min-h-screen min-h-svh flex flex-col justify-center py-20"
        >
            {/* ---- Background Gradient (Matches Success) ---- */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-linear-to-br from-[rgb(var(--bg-primary))]/2 to-[rgb(var(--bg-primary-hover))]/40" />

            <Container>
                <div className="flex flex-col items-center text-center gap-y-8 max-w-xl mx-auto">

                    {/* ---- Micro Positioning Line ---- */}
                    <TextBadge>
                        <span className="font-sans">
                            <Loader2 className="w-4 h-4 xs:w-5 xs:h-5 text-[rgb(var(--bg-primary-hover))] animate-spin" />
                        </span>
                        <span className="font-sans text-xs xs:text-sm font-semibold">Security Check</span>
                    </TextBadge>

                    {/* ---- Icon — Ring with continuous rotating Loader ---- */}
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-[rgb(var(--bg-primary))]/10 to-[rgb(var(--bg-primary-hover))]/20 border border-[rgb(var(--bg-primary))]/20">
                        <Loader2 className="w-10 h-10 text-[rgb(var(--bg-primary-hover))] animate-spin" strokeWidth={2} />
                    </div>

                    {/* ---- Heading ---- */}
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance leading-[1.2] font-heading">
                        Verifying your <span className="bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary))]/75 to-[rgb(var(--bg-primary-hover))]">payment</span>
                    </h1>

                    {/* ---- Sub-heading ---- */}
                    <p className="text-sm sm:text-base font-sans text-foreground/80 max-w-lg leading-relaxed">
                        We are securing your subscription configuration directly with Stripe. Please do not close or refresh this tab — this will only take a moment.
                    </p>

                    {/* ---- Disabled/Skeleton CTA Buttons ---- */}
                    <div className="flex flex-col xs:flex-row items-center gap-3 pt-2 opacity-40 pointer-events-none select-none">
                        <Button size="lg" disabled>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Activating Account...
                        </Button>
                    </div>

                    <p className="text-xs text-foreground/40 font-sans pt-2 flex items-center gap-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Secure end-to-end encryption.
                    </p>
                </div>
            </Container>
        </Section>
    );
}
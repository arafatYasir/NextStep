"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface props {
    title: string;
    description?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    copyContent?: string;
    isLoading?: boolean;
}

const JobDescAnalysisSection = ({ title, description, icon, children, copyContent, isLoading }: props) => {
    // States
    const [copied, setCopied] = useState(false);

    // Functions
    const handleCopy = async () => {
        try {
            if (!copyContent) return;
            
            await navigator.clipboard.writeText(copyContent);
            setCopied(true);

            setTimeout(() => setCopied(false), 1200);
        } catch (e) {
            toast.error("Failed to copy!");
        }
    }

    return (
        <div className="bg-card rounded-xl p-4 sm:p-6 border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] transition-colors duration-250 w-full">
            <div className="flex items-start justify-between mb-6 gap-2 sm:gap-4">
                <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2.5 rounded-xl bg-card shadow-sm border border-[rgb(var(--border-default))] shrink-0">
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-bold font-heading text-sm sm:text-base md:text-lg text-foreground leading-tight">{title}</h3>

                        {description && <p className="text-xs sm:text-sm font-sans text-foreground/80 font-medium mt-0.5">{description}</p>}
                    </div>
                </div>

                {(!isLoading && copyContent) && (
                    <Button
                        type="button"
                        onClick={handleCopy}
                        title="Copy to clipboard"
                        variant="secondary"
                        className="has-[>svg]:p-1 xs:has-[>svg]:p-2 text-foreground/80 hover:text-foreground active:text-foreground transition-all active:scale-95 border border-[rgb(var(--border-default))]"
                    >
                        {copied ? (
                            <Check className="size-3.5 xs:size-4.5 text-emerald-500 animate-in zoom-in duration-250" />
                        ) : (
                            <Copy className="size-3.5 xs:size-4.5" />
                        )}
                    </Button>
                )}
            </div>
            {/* ---- Rendering Content ---- */}
            {children}
        </div>
    );
};

export default JobDescAnalysisSection;
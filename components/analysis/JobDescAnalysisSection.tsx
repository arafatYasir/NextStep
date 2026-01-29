"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
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

            setTimeout(() => setCopied(false), 1000);
        } catch (e) {
            toast.error("Failed to copy!");
        }
    }

    return (
        <div className="bg-card rounded-xl p-6 border border-[rgb(var(--border-default))] w-full">
            <div className="flex items-start justify-between mb-6 gap-4">
                <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-card shadow-sm border border-[rgb(var(--border-default))] shrink-0">
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-bold font-heading text-lg text-foreground leading-tight">{title}</h3>

                        {description && <p className="text-sm font-sans text-foreground/80 font-medium mt-0.5">{description}</p>}
                    </div>
                </div>

                {(!isLoading && copyContent) && (
                    <Button
                        onClick={handleCopy}
                        title="Copy to clipboard"
                        variant="secondary"
                        className="has-[>svg]:p-2 text-foreground/80 hover:text-foreground active:text-foreground transition-all active:scale-95 border border-[rgb(var(--border-default))]"
                    >
                        {copied ? (
                            <Check size={18} className="text-emerald-500 animate-in zoom-in duration-250" />
                        ) : (
                            <Copy size={18} />
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
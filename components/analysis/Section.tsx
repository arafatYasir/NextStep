"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface props {
    title: string;
    description?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    copyContent?: string;
    isLoading?: boolean;
}

const Section = ({ title, description, icon, children, copyContent, isLoading }: props) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            if (!copyContent) return;
            
            await navigator.clipboard.writeText(copyContent);
            setCopied(true);

            setTimeout(() => setCopied(false), 900);
        } catch (e) {
            console.log("Error while copying text: ", e);
        }
    }

    return (
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-[rgb(var(--border-light))] w-full">
            <div className="flex items-start justify-between mb-6 gap-4">
                <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-[rgb(var(--bg-input))] shadow-sm border border-[rgb(var(--border-light))] shrink-0">
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-bold font-heading text-lg text-[rgb(var(--text-primary))] leading-tight">{title}</h3>
                        {description && <p className="text-sm font-sans text-[rgb(var(--text-secondary))] font-medium mt-1">{description}</p>}
                    </div>
                </div>

                {(!isLoading && copyContent) && (
                    <button
                        onClick={handleCopy}
                        title="Copy to clipboard"
                        className="p-2 rounded-lg text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-hover))] transition-all active:scale-95 border border-transparent hover:border-[rgb(var(--border-light))]"
                    >
                        {copied ? (
                            <Check size={18} className="text-emerald-500 animate-in zoom-in duration-300" />
                        ) : (
                            <Copy size={18} />
                        )}
                    </button>
                )}
            </div>
            {/* ---- Rendering Content ---- */}
            {children}
        </div>
    );
};

export default Section;
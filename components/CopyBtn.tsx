"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface Props {
    copyContent: string;
}

const CopyBtn = ({ copyContent }: Props) => {
    // States
    const [copied, setCopied] = useState(false);

    // Functions
    const handleCopy = async () => {
        try {
            if (!copyContent || !copyContent.trim()) return;

            await navigator.clipboard.writeText(copyContent);
            setCopied(true);

            setTimeout(() => setCopied(false), 1000);
        }
        catch (e) {
            toast.error("Failed to copy!");
            console.log("Copy error: ", e);
        }
    }

    return (
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
    )
}

export default CopyBtn
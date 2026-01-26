"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const FaqItem = ({ item }: { item: { question: string; answer: string } }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={cn(
                "group rounded-xl border transition-all duration-250 bg-card overflow-hidden",
                isOpen
                    ? "border-[rgb(var(--border-hover))] shadow-xl shadow-primary/5 bg-primary/2"
                    : "border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] hover:shadow-md"
            )}
        >
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full flex items-center justify-between p-5 xs:p-6 text-left cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
            >
                <h3 className={cn(
                    "text-base xs:text-lg md:text-xl font-heading font-bold tracking-tight",
                )}>
                    {item.question}
                </h3>
                <div className={cn(
                    "p-1 sm:p-2 rounded-full bg-secondary transition-all duration-250",
                    isOpen ? "rotate-180 bg-foreground/10 text-foreground" : "text-muted-foreground"
                )}>
                    <ChevronDown size={20} className="transition-transform duration-250" />
                </div>
            </button>

            <div className={cn(
                "grid transition-all duration-250 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}>
                <div className="overflow-hidden">
                    <p className="px-5 pb-5 xs:px-6 xs:pb-6 text-sm xs:text-base md:text-lg text-justify text-foreground/80 font-sans leading-relaxed">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FaqItem
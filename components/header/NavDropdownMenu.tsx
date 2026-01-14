"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react";

const NavDropdownMenu = ({ option, setShowMenu }: { option: NavSubmenu, setShowMenu?: (value: boolean) => void}) => {
    // States
    const [showSubMenu, setShowSubMenu] = useState(false);

    return (
        <div className="flex-1">
            <div onClick={() => setShowSubMenu(prev => !prev)} className={cn("flex items-center gap-1 p-1.5 text-base sm:text-lg font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] active:text-[rgb(var(--bg-primary-hover))] hover:bg-[rgb(var(--bg-hover))] active:bg-[rgb(var(--bg-hover))] transition-colors duration-200 ease-in-out cursor-pointer group outline-none",
                showSubMenu ? "text-[rgb(var(--bg-primary-hover))]" : ""
            )}>
                <span>
                    {option.name}
                </span>
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200 opacity-70 group-hover:opacity-100", showSubMenu ? "rotate-180" : "")} />
            </div>

            <div onClick={() => setShowMenu?.(false)} className={cn("grid pl-2 border-l border-[rgb(var(--border-default))] transition-all duration-250 ease-in-out",
                showSubMenu ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}>
                <div className="overflow-hidden">
                    {option.childrens.map((child) => (
                        <Link key={child.id} href={child.url} className="flex items-start gap-4 w-full pl-3 py-2 text-sm font-sans text-foreground rounded-lg transition-colors duration-250 ease-in-out group hover:bg-[rgb(var(--bg-hover))] active:bg-[rgb(var(--bg-hover))]">
                            {child.icon && (
                                <div className="shrink-0">
                                    <child.icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-[rgb(var(--bg-primary-hover))] group-active:text-[rgb(var(--bg-primary-hover))] transition-colors duration-250 ease-in-out"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <span className="font-bold leading-none">{child.name}</span>

                                <span className="text-xs text-muted-foreground leading-snug group-hover:text-foreground group-active:text-foreground transition-colors duration-250 ease-in-out">
                                    {child.description}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NavDropdownMenu
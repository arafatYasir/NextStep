"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Zap,
    History,
    Settings,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Job Analyses", href: "/dashboard/job-analyses", icon: Briefcase },
    { label: "Resume Analyses", href: "/dashboard/resume-analyses", icon: FileText },
    { label: "Usage & Limits", href: "/dashboard/usage", icon: Zap },
    { label: "History", href: "/dashboard/history", icon: History },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const LeftSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-full max-w-80 flex-col border-r border-[rgb(var(--border-default))] bg-card lg:flex">
            {/* ---- Logo ---- */}
            <div className="flex h-16 items-center px-6 border-b border-[rgb(var(--border-default))]">
                <Link href="/">
                    <div className="w-[140px] h-[35px] overflow-hidden">
                        <Image src="/images/logo.svg" alt="Logo" width={488} height={123} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
                    </div>
                </Link>
            </div>

            {/* ---- Navigation Items ---- */}
            <nav className="flex-1 space-y-2 p-6 overflow-y-auto scrollbar-custom">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group relative flex items-center gap-3 rounded-lg p-3 transition-all duration-250 ease-in-out border border-transparent",
                                isActive
                                    ? "bg-[rgb(var(--bg-primary))]/10 text-[rgb(var(--bg-primary))] hover:bg-[rgb(var(--bg-primary-hover))]/15 active:bg-[rgb(var(--bg-primary-hover))]/15 hover:text-[rgb(var(--bg-primary-hover))] active:text-[rgb(var(--bg-primary-hover))]"
                                    : "text-foreground/80 hover:border-[rgb(var(--border-hover))] hover:text-[rgb(var(--bg-primary-hover))] active:border-[rgb(var(--border-hover))] active:text-[rgb(var(--bg-primary-hover))]"
                            )}
                        >
                            {/* ---- Active Indicator Bar ---- */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-[rgb(var(--bg-primary))] group-hover:bg-[rgb(var(--bg-primary-hover))] group-active:bg-[rgb(var(--bg-primary-hover))]" />
                            )}

                            <Icon className={cn(
                                "size-[18px] transition-colors",
                                isActive ? "text-[rgb(var(--bg-primary))]" : "text-foreground/80 group-hover:text-[rgb(var(--bg-primary-hover))] group-active:text-[rgb(var(--bg-primary-hover))]"
                            )} />

                            <span className={cn("text-base font-sans font-medium leading-none")}>
                                {item.label}
                            </span>

                            {isActive && (
                                <ChevronRight className="ml-auto size-4" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* ---- Footer / Account ---- */}
            <div className="border-t border-[rgb(var(--border-light))] p-4 bg-[rgb(var(--bg-body))]/30">
                <div className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[rgb(var(--bg-body))] cursor-pointer">
                    <div className="size-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">
                        AY
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="truncate text-sm font-heading font-semibold text-[rgb(var(--text-primary))]">
                            Arafat Yasir
                        </span>
                        <span className="truncate text-xs font-sans text-[rgb(var(--text-tertiary))]">
                            Pro Plan
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default LeftSidebar;

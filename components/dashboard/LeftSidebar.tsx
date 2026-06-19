"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Settings,
    ChevronRight,
    FileSearch,
    ScanText,
    FilePlusCorner,
    PenLine,
    PanelLeftClose,
    PanelLeftOpen
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
    { label: "Job Analyses", href: "/dashboard/job-analyses", icon: FileSearch },
    { label: "Resume Analyses", href: "/dashboard/resume-analyses", icon: ScanText },
    { label: "Resumes Built", href: "/dashboard/resumes-built", icon: FilePlusCorner },
    { label: "Letters Written", href: "/dashboard/letters-written", icon: PenLine },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const LeftSidebar = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("sidebar-collapsed");
        if (stored === "true") {
            setIsCollapsed(true);
        }
        // Snap layout instantly on mount, enable animations after 50ms
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    const toggleSidebar = () => {
        const nextState = !isCollapsed;
        setIsCollapsed(prev => !prev);
        localStorage.setItem("sidebar-collapsed", String(nextState));
    };

    return (
        <aside
            className={cn(
                "min-h-screen min-h-svh flex-col border-r border-[rgb(var(--border-default))] bg-card lg:flex",
                isMounted ? "transition-[width] duration-300 ease-in-out" : "",
                isCollapsed ? "w-20" : "w-80"
            )}
        >
            {/* ---- Logo & Toggle Section ---- */}
            <div
                className={cn(
                    "flex h-16 items-center border-b border-[rgb(var(--border-default))] shadow-xs transition-all duration-300",
                    isCollapsed ? "justify-center px-6" : "justify-between px-6"
                )}
            >
                {!isCollapsed && (
                    <Link href="/">
                        <div className="w-[140px] h-[35px] overflow-hidden">
                            <Image
                                src="/images/logo.svg"
                                alt="Logo"
                                width={488}
                                height={123}
                                className="w-full h-full object-cover"
                                loading="eager"
                                fetchPriority="high"
                            />
                        </div>
                    </Link>
                )}
                <button
                    onClick={toggleSidebar}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    aria-expanded={!isCollapsed}
                    className="flex items-center justify-center rounded-md p-1.5 text-foreground/80 hover:bg-[rgb(var(--bg-primary))]/10 hover:text-[rgb(var(--bg-primary))] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--bg-primary))] cursor-pointer"
                >
                    {isCollapsed ? (
                        <PanelLeftOpen className="size-5" />
                    ) : (
                        <PanelLeftClose className="size-5" />
                    )}
                </button>
            </div>

            {/* ---- Navigation Items ---- */}
            <nav
                className="flex-1 space-y-2 overflow-y-auto scrollbar-custom transition-all duration-300 p-6"
            >
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={isCollapsed ? item.label : undefined}
                            className={cn(
                                "group relative flex items-center rounded-lg p-3 transition-all duration-250 ease-in-out border border-transparent",
                                isCollapsed ? "justify-center" : "gap-3",
                                isActive
                                    ? "bg-[rgb(var(--bg-primary))]/10 text-[rgb(var(--bg-primary))] hover:bg-[rgb(var(--bg-primary-hover))]/15 active:bg-[rgb(var(--bg-primary-hover))]/15 hover:text-[rgb(var(--bg-primary-hover))] active:text-[rgb(var(--bg-primary-hover))]"
                                    : "text-foreground/80 hover:border-[rgb(var(--border-hover))] hover:text-[rgb(var(--bg-primary-hover))] active:border-[rgb(var(--border-hover))] active:text-[rgb(var(--bg-primary-hover))]"
                            )}
                        >
                            {/* ---- Active Indicator Bar ---- */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-[rgb(var(--bg-primary))] group-hover:bg-[rgb(var(--bg-primary-hover))] group-active:bg-[rgb(var(--bg-primary-hover))]" />
                            )}

                            <Icon
                                className={cn(
                                    "size-[18px] transition-colors shrink-0",
                                    isActive
                                        ? "text-[rgb(var(--bg-primary))]"
                                        : "text-foreground/80 group-hover:text-[rgb(var(--bg-primary-hover))] group-active:text-[rgb(var(--bg-primary-hover))]"
                                )}
                            />

                            <span
                                className={cn(
                                    "text-base font-sans font-medium leading-none whitespace-nowrap transition-all duration-300",
                                    isCollapsed
                                        ? "w-0 opacity-0 pointer-events-none overflow-hidden"
                                        : "w-auto opacity-100"
                                )}
                            >
                                {item.label}
                            </span>

                            {isActive && !isCollapsed && (
                                <ChevronRight className="ml-auto size-4 shrink-0 transition-opacity duration-300" />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default LeftSidebar;
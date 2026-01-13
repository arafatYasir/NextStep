"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, MoreHorizontal } from "lucide-react";
import { navOptions } from "@/lib/navOptions";
import { Button } from "../ui/button";
import GitHubIcon from "@/icons/GitHubIcon";
import Container from "../Container";
import AuthenticationMenus from "./AuthenticationMenus";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ResponsiveHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedSubmenu, setExpandedSubmenu] = useState<number | null>(null);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setExpandedSubmenu(null);
    };

    const toggleSubmenu = (id: number) => {
        setExpandedSubmenu(expandedSubmenu === id ? null : id);
    };

    // Tablet nav split: Tools + Contact visible, About/Blogs in overflow
    const primaryNav = navOptions.slice(0, 1);
    const overflowNav = navOptions.slice(1, -1);
    const tertiaryNav = navOptions.slice(-1);

    return (
        <header className="fixed top-0 w-full z-50 bg-[rgb(var(--bg-surface-alpha))] border-b border-[rgb(var(--border-default))] backdrop-blur-xs">
            <Container>
                <nav className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-x-8">
                        {/* Logo */}
                        <Link href="/">
                            <div className="w-[140px] h-[30px] overflow-hidden">
                                <Image src="/images/logo.svg" alt="Logo" width={488} height={123} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
                            </div>
                        </Link>

                        {/* Desktop Nav (≥1024px) */}
                        <ul className="hidden lg:flex items-center gap-x-2">
                            {navOptions.map(option => (
                                <li key={option.id} className="flex items-center font-sans">
                                    {option.type !== "Submenu" ? (
                                        <Link
                                            href={option.url}
                                            className="px-3 py-1.5 text-base font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-200"
                                        >
                                            {option.name}
                                        </Link>
                                    ) : (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 text-base font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-200 cursor-pointer group data-[state=open]:text-[rgb(var(--bg-primary-hover))] outline-none">
                                                <span>{option.name}</span>
                                                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180 opacity-70 group-hover:opacity-100" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="start"
                                                className="mt-2.5 min-w-[320px] p-2 bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] shadow-lg rounded-xl duration-200"
                                            >
                                                {option.childrens.map((child) => (
                                                    <DropdownMenuItem key={child.id} asChild className="outline-none">
                                                        <Link
                                                            href={child.url}
                                                            className="flex items-start gap-4 w-full px-3 py-3 text-sm font-sans text-foreground rounded-lg transition-colors duration-200 group"
                                                        >
                                                            {child.icon && (
                                                                <div className="shrink-0">
                                                                    <child.icon size={24} className="group-hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-200" />
                                                                </div>
                                                            )}
                                                            <div className="flex flex-col gap-1">
                                                                <span className="font-bold leading-none">{child.name}</span>
                                                                <span className="text-xs text-muted-foreground leading-snug group-hover:text-foreground transition-colors duration-200">
                                                                    {child.description}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Tablet Nav (768-1023px) */}
                        <ul className="hidden md:flex lg:hidden items-center gap-x-1">
                            {primaryNav.map((option) => (
                                <li key={option.id} className="font-sans">
                                    {option.type === "Submenu" && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 text-base font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-200 cursor-pointer group data-[state=open]:text-[rgb(var(--bg-primary-hover))] outline-none">
                                                <span>{option.name}</span>
                                                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180 opacity-70 group-hover:opacity-100" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="start"
                                                className="mt-2.5 min-w-[320px] p-2 bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] shadow-lg rounded-xl duration-200"
                                            >
                                                {option.childrens.map((child) => (
                                                    <DropdownMenuItem key={child.id} asChild className="outline-none">
                                                        <Link
                                                            href={child.url}
                                                            className="flex items-start gap-4 w-full px-3 py-3 text-sm font-sans text-foreground rounded-lg transition-colors duration-200 group"
                                                        >
                                                            {child.icon && (
                                                                <div className="shrink-0">
                                                                    <child.icon size={24} className="group-hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-200" />
                                                                </div>
                                                            )}
                                                            <div className="flex flex-col gap-1">
                                                                <span className="font-bold leading-none">{child.name}</span>
                                                                <span className="text-xs text-muted-foreground leading-snug group-hover:text-foreground transition-colors duration-200">
                                                                    {child.description}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </li>
                            ))}

                            {/* Overflow Menu */}
                            {overflowNav.length > 0 && (
                                <li>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon-sm" className="outline-none" aria-label="More options">
                                                <MoreHorizontal size={20} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="min-w-[160px] bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] shadow-lg rounded-xl duration-200"
                                        >
                                            {overflowNav.map((option) => (
                                                "url" in option && (
                                                    <DropdownMenuItem key={option.id} asChild>
                                                        <Link href={option.url} className="px-4 py-2.5 text-sm font-medium cursor-pointer">
                                                            {option.name}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                )
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>
                            )}

                            {tertiaryNav.map((option) => (
                                "url" in option && (
                                    <li key={option.id} className="font-sans">
                                        <Link
                                            href={option.url}
                                            className="px-3 py-1.5 text-base font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-200"
                                        >
                                            {option.name}
                                        </Link>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Desktop/Tablet Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link href="https://github.com/arafatYasir/NextStep" target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost">
                                    <GitHubIcon width={16} height={16} />
                                    <span className="hidden lg:inline">GitHub</span>
                                </Button>
                            </Link>
                            <AuthenticationMenus />
                        </div>

                        {/* Mobile Hamburger */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </nav>
            </Container>

            {/* Mobile Overlay */}
            <div
                className={`fixed min-h-screen inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeMobileMenu}
            />

            {/* Mobile Slide-in Menu */}
            <div
                className={`fixed top-0 right-0 min-h-screen w-[85vw] max-w-[380px] bg-[rgb(var(--bg-surface))] border-l border-[rgb(var(--border-default))] z-50 md:hidden transform transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[rgb(var(--border-default))]">
                        <span className="text-lg font-bold font-heading">Menu</span>
                        <Button variant="ghost" size="icon" onClick={closeMobileMenu} aria-label="Close menu">
                            <X size={24} />
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 overflow-y-auto scrollbar-custom py-4 px-4">
                        <ul className="space-y-1">
                            {navOptions.map((option) => (
                                <li key={option.id}>
                                    {option.type !== "Submenu" ? (
                                        <Link
                                            href={option.url}
                                            onClick={closeMobileMenu}
                                            className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:bg-[rgb(var(--bg-hover))] rounded-xl transition-colors duration-200 min-h-[48px]"
                                        >
                                            {option.name}
                                        </Link>
                                    ) : (
                                        <div>
                                            <button
                                                onClick={() => toggleSubmenu(option.id)}
                                                className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-foreground hover:bg-[rgb(var(--bg-hover))] rounded-xl transition-colors duration-200 min-h-[48px]"
                                            >
                                                <span>{option.name}</span>
                                                <ChevronDown
                                                    className={`w-5 h-5 transition-transform duration-300 ${expandedSubmenu === option.id ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            {/* Accordion Content */}
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-out ${expandedSubmenu === option.id
                                                        ? "max-h-[600px] opacity-100"
                                                        : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <ul className="mt-1 ml-3 pl-4 border-l-2 border-[rgb(var(--border-default))] space-y-1">
                                                    {option.childrens.map((child) => (
                                                        <li key={child.id}>
                                                            <Link
                                                                href={child.url}
                                                                onClick={closeMobileMenu}
                                                                className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-[rgb(var(--bg-hover))] transition-colors duration-200 min-h-[48px]"
                                                            >
                                                                {child.icon && (
                                                                    <child.icon
                                                                        size={20}
                                                                        className="shrink-0 mt-0.5 text-[rgb(var(--text-secondary))]"
                                                                    />
                                                                )}
                                                                <div className="flex flex-col gap-0.5">
                                                                    <span className="text-sm font-bold leading-snug">{child.name}</span>
                                                                    <span className="text-xs text-muted-foreground leading-snug">{child.description}</span>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Footer Actions */}
                    <div className="px-4 py-5 border-t border-[rgb(var(--border-default))] space-y-3">
                        <Link href="https://github.com/arafatYasir/NextStep" target="_blank" rel="noopener noreferrer" className="block">
                            <Button variant="ghost" className="w-full justify-start">
                                <GitHubIcon width={16} height={16} />
                                GitHub
                            </Button>
                        </Link>
                        <AuthenticationMenus />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ResponsiveHeader;

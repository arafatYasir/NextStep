import GitHubIcon from "@/icons/GithubIcon";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AuthenticationMenus from "./AuthenticationMenus";
import { Button } from "./ui/button";
import { navOptions } from "@/lib/navOptions";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = async () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-[rgba(var(--bg-surface-alpha),var(--alpha-backdrop))] backdrop-blur-sm border-b border-[rgb(var(--border-default))]">
            <div className="container mx-auto px-6 py-3">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-x-8">
                        {/* ---- Logo ---- */}
                        <Link href="/" className="flex items-center gap-x-2">
                            <Image src="/images/logo.svg" alt="Logo" width={24} height={24} />
                            <span className="text-[22px] font-bold text-[rgb(var(--text-primary))] font-logo">KIE</span>
                        </Link>

                        {/* ---- Nav Menu Options ---- */}
                        <ul className="flex items-center gap-x-2">
                            {navOptions.map((option) => (
                                <li key={option.id} className="flex items-center">
                                    {option.type !== "Submenu" ? (
                                        <Link
                                            href={option.url}
                                            className="px-3 py-1.5 text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--bg-primary-hover))] hover:bg-[rgb(var(--bg-hover))] rounded-md transition-all duration-200 ease-in-out"
                                        >
                                            {option.name}
                                        </Link>
                                    ) : (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--bg-primary-hover))] hover:bg-[rgb(var(--bg-hover))] rounded-md transition-all duration-200 ease-in-out cursor-pointer group data-[state=open]:bg-[rgb(var(--bg-hover))] data-[state=open]:text-[rgb(var(--bg-primary-hover))]">
                                                <span>
                                                    {option.name}
                                                </span>
                                                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 opacity-70 group-hover:opacity-100" />
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                align="start"
                                                className="min-w-[200px] p-2 bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] shadow-lg rounded-xl duration-200"
                                            >
                                                {option.childrens.map((child) => (
                                                    <DropdownMenuItem key={child.id} asChild>
                                                        <Link
                                                            href={child.url}
                                                            className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---- Buttons ---- */}
                    <div className="flex items-center gap-4">
                        <Link href="https://github.com/arafatYasir/Keyword-Insight-Engine" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline">
                                <GitHubIcon width={16} height={16} />
                                GitHub
                            </Button>
                        </Link>

                        {/* Authentication Menus */}
                        <AuthenticationMenus />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;

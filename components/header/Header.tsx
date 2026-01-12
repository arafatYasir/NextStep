import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AuthenticationMenus from "./AuthenticationMenus";
import { Button } from "../ui/button";
import { navOptions } from "@/lib/navOptions";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GitHubIcon from "@/icons/GitHubIcon";
import Container from "../Container";

const Header = async () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-[rgb(var(--bg-surface-alpha))] border-b border-[rgb(var(--border-default))] backdrop-blur-xs">
            <Container>
                <nav className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-x-8">
                        {/* ---- Logo ---- */}
                        <Link href="/">
                            <div className="w-[140px] h-[30px] overflow-hidden">
                                <Image src="/images/logo.svg" alt="Logo" width={488} height={123} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
                            </div>
                        </Link>

                        {/* ---- Nav Menu Options ---- */}
                        <ul className="flex items-center gap-x-2">
                            {navOptions.map(option => (
                                <li key={option.id} className="flex items-center font-sans">
                                    {option.type !== "Submenu" ? (
                                        <Link
                                            href={option.url}
                                            className="px-3 py-1.5 text-base font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-200 ease-in-out"
                                        >
                                            {option.name}
                                        </Link>
                                    ) : (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 text-base font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-200 ease-in-out cursor-pointer group data-[state=open]:text-[rgb(var(--bg-primary-hover))] outline-none">
                                                <span>
                                                    {option.name}
                                                </span>
                                                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180 opacity-70 group-hover:opacity-100" />
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                align="start"
                                                className="mt-2.5 min-w-[320px] p-2 bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] shadow-lg rounded-xl duration-200"
                                            >
                                                {option.childrens.map((child) => (
                                                    <DropdownMenuItem key={child.id} asChild className="p-0 border-none outline-none focus:bg-transparent">
                                                        <Link
                                                            href={child.url}
                                                            className="flex items-start gap-4 w-full px-3 py-3 text-sm font-sans text-foreground hover:bg-[rgb(var(--bg-primary-muted))] rounded-lg transition-colors duration-200"
                                                        >
                                                            {child.icon && (
                                                                <div className="shrink-0 mt-0.5 text-foreground/70">
                                                                    <child.icon size={20} />
                                                                </div>
                                                            )}
                                                            <div className="flex flex-col gap-1">
                                                                <span className="font-bold leading-none">{child.name}</span>
                                                                <span className="text-xs font-normal text-muted-foreground leading-snug">
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
            </Container>
        </header>
    );
};

export default Header;

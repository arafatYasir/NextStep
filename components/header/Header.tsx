import Image from "next/image";
import Link from "next/link";
import AuthenticationMenus from "./AuthenticationMenus";
import { Button } from "../ui/button";
import { navOptions } from "@/lib/navOptions";

import GitHubIcon from "@/icons/GitHubIcon";
import Container from "../Container";
import Submenu from "./Submenu";

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
                                            className="px-3 py-1.5 text-base font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-250 ease-in-out"
                                        >
                                            {option.name}
                                        </Link>
                                    ) : (
                                        <Submenu option={option} />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---- Buttons ---- */}
                    <div className="flex items-center gap-4">
                        <Link href="https://github.com/arafatYasir/NextStep" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="font-sans bg-transparent border-transparent shadow-none hover:bg-[rgb(var(--bg-hover))] hover:border-[rgb(var(--bg-hover))] cursor-pointer transition-colors duration-250 ease-in-out">
                                <GitHubIcon width={16} height={16} />
                                GitHub
                            </Button>
                        </Link>

                        {/* ---- Authentication Menus ---- */}
                        <AuthenticationMenus />
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Header;

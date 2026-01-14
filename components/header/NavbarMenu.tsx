"use client";

import { Menu, X } from "lucide-react"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navOptions } from "@/lib/navOptions";
import Link from "next/link";
import Container from "../Container";
import Image from "next/image";
import NavDropdownMenu from "./NavDropdownMenu";

const NavbarMenu = () => {
    // States
    const [showMenu, setShowMenu] = useState(false);

    // useEffect to stop scrolling when menu is open
    useEffect(() => {
        if (showMenu) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }
    }, [showMenu]);

    return (
        <div>
            {/* ---- Initial Hamburger Menu Icon ---- */}
            <Button onClick={() => setShowMenu(true)} variant="ghost" className="has-[>svg]:px-2">
                <Menu size={24} />
            </Button>

            {/* ---- Main Menu ---- */}
            <div className={cn("fixed inset-0 z-60 w-full min-h-screen bg-[rgb(var(--bg-surface))] translate-x-full transition-transform duration-500 ease-in-out overflow-y-auto", {
                "translate-x-0": showMenu
            })}>
                <div className="border-b border-[rgb(var(--border-default))] shadow-sm">
                    <Container>
                        <div className="flex items-baseline justify-between py-3">
                            <Link href="/">
                                <div className="w-[120px] h-[24px] sm:w-[140px] overflow-hidden">
                                    <Image src="/images/logo.svg" alt="Logo" width={488} height={123} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
                                </div>
                            </Link>
                            <Button onClick={() => setShowMenu(false)} variant="ghost" className="has-[>svg]:px-2">
                                <X size={24} />
                            </Button>
                        </div>
                    </Container>
                </div>

                <Container>
                    {/* ---- Nav Menu Options ---- */}
                    <ul className="flex flex-col gap-y-2 mt-5">
                        {navOptions.map(option => (
                            <li key={option.id} className="flex items-center font-sans">
                                {option.type !== "Submenu" ? (
                                    <Link
                                        href={option.url}
                                        className="w-full py-1.5 text-base font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] active:text-[rgb(var(--bg-primary-hover))] transition-colors duration-250 ease-in-out"
                                    >
                                        {option.name}
                                    </Link>
                                ) : (
                                    <NavDropdownMenu option={option} />
                                )}
                            </li>
                        ))}
                    </ul>
                </Container>
            </div>
        </div>
    )
}

export default NavbarMenu

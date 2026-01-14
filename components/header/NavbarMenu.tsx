"use client";

import { LayoutDashboard, Menu, X } from "lucide-react"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navOptions } from "@/lib/navOptions";
import Link from "next/link";
import Container from "../Container";
import Image from "next/image";
import NavDropdownMenu from "./NavDropdownMenu";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

const NavbarMenu = () => {
    // States
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Extra hooks
    const supabase = createClient();
    const router = useRouter();

    // Checking auth state
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
            setLoading(false);
        }

        getUser();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);

            if (_event === 'SIGNED_OUT') {
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);


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
            <div className={cn("fixed inset-0 z-60 w-full h-screen bg-[rgb(var(--bg-surface))] translate-x-full transition-transform duration-500 ease-in-out flex flex-col", {
                "translate-x-0": showMenu
            })}>
                <div className="flex-none border-b border-[rgb(var(--border-default))] shadow-sm">
                    <Container>
                        <div className="flex items-baseline justify-between py-3">
                            <Link onClick={() => setShowMenu(false)} href="/">
                                <div className="w-[120px] h-[29px] sm:w-[140px] sm:h-[35px] overflow-hidden">
                                    <Image src="/images/logo.svg" alt="Logo" width={488} height={123} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
                                </div>
                            </Link>
                            <Button onClick={() => setShowMenu(false)} variant="ghost" className="has-[>svg]:px-2">
                                <X size={24} />
                            </Button>
                        </div>
                    </Container>
                </div>

                <div className="flex-1 overflow-y-auto pb-10">
                    <Container>
                        {/* ---- Nav Menu Options ---- */}
                        <ul className="flex flex-col gap-y-2 mt-5">
                            {navOptions.map(option => (
                                <li
                                    key={option.id}
                                    className="flex items-center font-sans border-b border-[rgb(var(--border-default))] transition-colors duration-250 ease-in-out"
                                >
                                    {option.type !== "Submenu" ? (
                                        <Link
                                            onClick={() => setShowMenu(false)}
                                            href={option.url}
                                            className="w-full p-1.5 text-base sm:text-lg font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] active:text-[rgb(var(--bg-primary-hover))] hover:bg-[rgb(var(--bg-hover))] active:bg-[rgb(var(--bg-hover))] transition-colors duration-250 ease-in-out"
                                        >
                                            {option.name}
                                        </Link>
                                    ) : (
                                        <NavDropdownMenu setShowMenu={setShowMenu} option={option} />
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* ---- Buttons ---- */}
                        <div className="sm:hidden mt-5">
                            {(user && !loading) ? (
                                <Link onClick={() => setShowMenu(false)} href="/dashboard" className="inline-block w-full">
                                    <Button className="w-full">
                                        <LayoutDashboard size={16} />
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (!user && !loading) ? (
                                <Link onClick={() => setShowMenu(false)} href="/sign-in" className="inline-block w-full">
                                    <Button className="w-full">Sign In</Button>
                                </Link>
                            ) : (
                                <Skeleton className="w-full h-[40px]" />
                            )}
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default NavbarMenu

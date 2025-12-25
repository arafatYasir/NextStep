"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { toast } from "sonner";

const AuthenticationMenus = () => {
    // States
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState<string>("");
    const [isMounted, setIsMounted] = useState<boolean>(false);

    // Extra hooks
    const supabase = createClient();
    const router = useRouter();

    // useEffect to get the stored theme
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        setIsMounted(true);
    }, [])

    // useEffect to set the theme
    useEffect(() => {
        if (!isMounted) return;

        const html = document.querySelector("html");

        if (theme === "dark") {
            html?.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            html?.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

    }, [theme, isMounted]);

    // Checking auth state
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
            setLoading(false);
        };

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
    }, [supabase, router]);

    // Functions
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        toast.success("Logout successful");
    };

    // Don't render anything while checking auth status to avoid flickering
    if (loading) return null;

    return (
        <div className="flex items-center gap-4">
            {user ? (
                // ---- Logged In State ----
                <>
                    <Link href="/dashboard">
                        <Button>
                            <LayoutDashboard size={16} />
                            Dashboard
                        </Button>
                    </Link>

                    {/* User Avatar Placeholder */}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {
                                user.user_metadata.avatar_url ? (
                                    <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
                                        <img className="w-full h-full object-cover" src={user.user_metadata.avatar_url} alt={`${user.user_metadata.full_name}'s Image`} />
                                    </div>
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-[rgb(var(--bg-primary))] flex items-center justify-center text-[rgb(var(--text-on-primary))] cursor-pointer">
                                        <UserIcon className="w-5 h-5" />
                                    </div>
                                )
                            }
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="bottom">
                            <DropdownMenuLabel>
                                User: {user.user_metadata.full_name}
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            {/* ---- Theme Dropdown ---- */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <DropdownMenuItem>Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</DropdownMenuItem>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                                        <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={handleSignOut}><LogOut /> Log Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                // ---- Logged Out State ----
                <>
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default AuthenticationMenus;
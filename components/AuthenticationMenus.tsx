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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AuthenticationMenus = () => {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
            setLoading(false);
        };

        getUser();

        // Listen for auth changes (login, logout, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            // Optional: refresh router to update server components if needed
            if (_event === 'SIGNED_OUT') {
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    // Don't render anything while checking auth status to avoid flickering
    if (loading) return null;

    return (
        <div className="flex items-center gap-4">
            {user ? (
                // ---- Logged In State ----
                <>
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-x-2 bg-[rgb(var(--bg-primary))] hover:bg-[rgb(var(--bg-primary-hover))] text-white py-1.5 px-4 rounded-lg text-sm font-medium transition-colors border border-[rgb(var(--border-hover))] hover:border-white"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>

                    {/* User Avatar Placeholder */}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="w-9 h-9 rounded-full bg-[rgb(var(--bg-primary))] flex items-center justify-center text-[rgb(var(--text-on-primary))] cursor-pointer">
                                <UserIcon className="w-5 h-5" />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="bottom">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem variant="destructive" onClick={handleSignOut}>Log Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                // ---- Logged Out State ----
                <>
                    <Link
                        href="/login"
                        className="bg-[rgb(var(--bg-primary))] hover:bg-[rgb(var(--bg-primary-hover))] text-white py-1.5 px-4 rounded-lg text-sm font-medium transition-colors border border-[rgb(var(--border-hover))] hover:border-white"
                    >
                        Login
                    </Link>
                </>
            )}
        </div>
    );
};

export default AuthenticationMenus;
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
import { Button } from "../ui/button";
import { toast } from "sonner";

const AuthenticationMenus = () => {
    // States
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
                            <div className="w-9 h-9 border border-[rgb(var(--text-primary))] rounded-full flex items-center justify-center">
                                {
                                    user.user_metadata.avatar_url ? (
                                        <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
                                            <img className="w-full h-full object-cover" src={user.user_metadata.avatar_url} alt={`${user.user_metadata.full_name}'s Image`} />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-[rgb(var(--bg-primary))] flex items-center justify-center text-[rgb(var(--text-on-primary))] cursor-pointer">
                                            <UserIcon className="w-5 h-5" />
                                        </div>
                                    )
                                }
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="bottom" className="font-sans duration-200">
                            <DropdownMenuLabel>
                                User: {user.user_metadata.full_name}
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={handleSignOut}><LogOut size={16} /> Log Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                // ---- Logged Out State ----
                <>
                    <Link href="/sign-in">
                        <Button>Sign In</Button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default AuthenticationMenus;
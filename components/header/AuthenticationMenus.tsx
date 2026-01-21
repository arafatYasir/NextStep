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
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

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

    // If loading then show a skeleton UI
    if (loading) {
        return (
            <div className="flex items-center gap-4">
                <Skeleton className="hidden sm:block w-[121px] h-9" />
                <Skeleton className="w-10 h-10 rounded-full" />
            </div>
        )
    }

    return (
        <div className="flex items-center gap-4">
            {user ? (
                // ---- Logged In State ----
                <>
                    <Link href="/dashboard" className="hidden sm:inline">
                        <Button>
                            <LayoutDashboard size={16} />
                            Dashboard
                        </Button>
                    </Link>

                    {/* User Avatar Placeholder */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                            <div className="relative p-0.5 rounded-full bg-primary/50">
                                <div className="w-9 h-9 border-2 border-background rounded-full overflow-hidden cursor-pointer">
                                    <Image 
                                        className="w-full h-full object-cover" 
                                        src={user.user_metadata.avatar_url || "/images/avatar.png"} 
                                        alt={`${user.user_metadata.full_name}'s Image`} 
                                        width={36} 
                                        height={36} 
                                    />
                                </div>
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="bottom" className="font-sans mt-2.5 bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] shadow-lg rounded-xl duration-200">
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
                    <Link href="/sign-in" className="hidden sm:inline">
                        <Button>Sign In</Button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default AuthenticationMenus;
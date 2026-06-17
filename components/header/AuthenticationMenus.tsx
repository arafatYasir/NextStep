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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useAppSelector } from "@/src/store/hooks";

const AuthenticationMenus = () => {
    // States
    const { user, isLoading } = useAppSelector((state) => state.auth);

    // Extra hooks
    const supabase = createClient();

    // Functions
    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();

            toast.success("Log Out successful");
        }
        catch (e) {
            toast.error("Something went wrong. Please try again.");
            console.error("Failed to log out: ", e);
        }
    };

    // If loading then show a skeleton UI
    if (isLoading) {
        return (
            <div className="flex items-center gap-4">
                <Skeleton className="hidden sm:block w-[121px] h-9" />
                <Skeleton className="w-[36px] h-[36px] rounded-full" />
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
                            <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
                                <Image
                                    className="w-full h-full object-cover"
                                    src={user.user_metadata.avatar_url || "/images/avatar.png"}
                                    alt={`${user.user_metadata.full_name}'s Image`}
                                    width={36}
                                    height={36}
                                />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="bottom" className="font-sans mt-2.5 bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] shadow-lg rounded-xl duration-200">
                            <DropdownMenuLabel>
                                User: {user.user_metadata.email}
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
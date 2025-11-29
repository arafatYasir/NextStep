"use client";

import DashboardStatus from "@/components/dashboard/DashboardStatus";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const admin = localStorage.getItem("admin");

        if (!admin) {
            router.push("/admin");
            setLoggedIn(false);
        }
        else {
            setLoading(false);
            setLoggedIn(true);
        }
    }, [router]);

    if (loading || !loggedIn) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--bg-body))]">
                <div className="relative">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-[rgb(var(--border-default))] border-t-[rgb(var(--text-accent))]"></div>
                    <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-[rgb(var(--text-accent))] opacity-20"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* ---- Top Bar ---- */}
            <div className="flex items-center bg-[rgb(var(--bg-surface))] border-b border-[rgb(var(--border-default))] px-8 h-[89px]">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                            Dashboard
                        </h1>
                        <p className="text-sm text-[rgb(var(--text-secondary))] mt-1">
                            Welcome back to your admin dashboard
                        </p>
                    </div>
                </div>
            </div>

            {/* ---- Content ---- */}
            <div className="p-8">
                {/* ---- Stats Cards ---- */}
                <DashboardStatus />
            </div>
        </>
    );
};

export default DashboardPage;
"use client";

import DashboardStatus from "@/components/dashboard/DashboardStatus";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const loggedIn = localStorage.getItem("admin");
            if (!loggedIn) {
                router.push("/admin");
            } else {
                setLoading(false);
            }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
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
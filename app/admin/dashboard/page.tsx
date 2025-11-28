"use client";

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
            {/* Top Bar */}
            <header className="bg-[rgb(var(--bg-surface))] border-b border-[rgb(var(--border-default))] px-8 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] font-(--font-heading)">
                            Dashboard
                        </h1>
                        <p className="text-sm text-[rgb(var(--text-secondary))] mt-1">
                            Welcome back to your admin dashboard
                        </p>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center space-x-3">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">Admin User</p>
                            <p className="text-xs text-[rgb(var(--text-muted))]">Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[rgb(var(--bg-primary))] to-[rgb(var(--text-accent))] flex items-center justify-center text-white font-bold shadow-lg">
                            A
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="p-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Total Jobs", value: "24", icon: "📋", color: "from-blue-500 to-blue-600" },
                        { label: "Active Roles", value: "18", icon: "✅", color: "from-green-500 to-green-600" },
                        { label: "Categories", value: "8", icon: "📁", color: "from-purple-500 to-purple-600" },
                        { label: "This Month", value: "+12", icon: "📈", color: "from-orange-500 to-orange-600" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] rounded-2xl p-6 hover:shadow-xl hover:border-[rgb(var(--border-hover))] transition-all duration-200 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-[rgb(var(--text-primary))] mb-1">{stat.value}</h3>
                            <p className="text-sm text-[rgb(var(--text-secondary))]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
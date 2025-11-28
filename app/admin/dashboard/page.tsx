"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            router.push("/admin");
        }
        else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[rgb(var(--text-accent))]"></div>
            </div>
        );
    }

    return (
        <div>DashboardPage</div>
    )
}

export default DashboardPage
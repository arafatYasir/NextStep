"use client";

import LogoutIcon from "@/icons/LogoutIcon";
import { menuItems } from "@/lib/menuItems";
import { useRouter, usePathname } from "next/navigation"

interface menuItem {
    name: string;
    path: string;
    icon: React.FC;
}

const DashboardMenus = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("admin");
        router.push("/admin");
    };

    return (
        <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item: menuItem) => {
                const isActive = pathname === item.path;
                return (
                    <button
                        key={item.name}
                        onClick={() => router.push(item.path)}
                        className={`w-full flex items-center justify-start space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? "bg-linear-to-r from-[rgb(var(--bg-primary))] to-[rgb(var(--text-accent))] text-white shadow-lg shadow-[rgba(var(--shadow-primary),var(--alpha-shadow-primary))]"
                            : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-hover))] hover:text-[rgb(var(--text-accent))]"
                            }`}
                    >
                        <span className={isActive ? "" : "group-hover:scale-110 transition-transform"}>
                            <item.icon />
                        </span>
                        <span className="font-medium text-sm">{item.name}</span>
                    </button>
                );
            })}

            {/* ---- Logout Button ---- */}
            <div className="py-3 border-t border-[rgb(var(--border-default))]">
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center justify-start
                            } space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-[rgb(var(--bg-hover))] transition-all duration-200 group`}
                >
                    <LogoutIcon />

                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </nav>
    )
}

export default DashboardMenus
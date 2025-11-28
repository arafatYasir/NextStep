"use client";

import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";

const ThemeToggleBtn = () => {
    const [theme, setTheme] = useState<string>("");
    const [isMounted, setIsMounted] = useState<boolean>(false);

    // useEffect to get the stored theme
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        setIsMounted(true);
    }, [])

    // useEffect to set the theme
    useEffect(() => {
        if(!isMounted) return;

        const body = document.querySelector("body");

        if(theme === "dark") {
            body?.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            body?.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

    }, [theme, isMounted]);

    

    return (
        <button
            className="relative w-12 h-6 bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-default))] rounded-full p-1 hover:border-[rgb(var(--border-hover))] focus:outline-none focus:ring-2 focus:ring-[rgba(var(--ring-focus),var(--alpha-ring))] cursor-pointer group"
            aria-label="Toggle theme"
            onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
        >
            {/* ---- Sliding Background ---- */}
            <div
                className={`absolute top-0 left-0 w-1/2 h-full bg-[rgb(var(--bg-primary))] rounded-full transition-all duration-300 ease-in-out ${theme === "dark" ? "translate-x-full" : "translate-x-0"
                    }`}
            />

            {/* ---- Icons Container ---- */}
            <div className="relative flex items-center justify-between w-full h-full">
                {/* Sun Icon */}
                <HiSun
                    className={`w-4 h-4 transition-all duration-300 ${theme === "dark"
                        ? "text-[rgb(var(--text-muted))]"
                        : "text-[rgb(var(--text-on-primary))]"
                        }`}
                />

                {/* Moon Icon */}
                <HiMoon
                    className={`transition-all duration-300 ${theme === "dark"
                        ? "text-[rgb(var(--text-on-primary))] "
                        : "text-[rgb(var(--text-muted))]"
                        }`}
                    size={14}
                />
            </div>
        </button>
    );
};

export default ThemeToggleBtn;
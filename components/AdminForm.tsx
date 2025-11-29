"use client";

import { useState } from "react";
import MailIcon from "../icons/MailIcon";
import PasswordIcon from "../icons/PasswordIcon";
import { useRouter } from "next/navigation";

const AdminForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const router = useRouter();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            alert("Email is not valid!");
            return;
        }
        

        localStorage.setItem("admin", "true");
        router.push("/admin/dashboard");
    }

    return (
        <form className="space-y-6" onSubmit={handleLogin}>
            {/* ---- Email Input ---- */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[rgb(var(--text-primary))] mb-2"
                >
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MailIcon dependency={emailFocused} />
                    </div>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        placeholder="admin@example.com"
                        className={`w-full bg-[rgb(var(--bg-input))] border ${emailFocused
                            ? 'border-[rgb(var(--border-focus))] ring-2 ring-[rgba(var(--ring-focus),var(--alpha-ring))]'
                            : 'border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))]'
                            } rounded-xl pl-12 pr-4 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] focus:outline-none transition-all duration-200`}
                    />
                </div>
            </div>

            {/* ---- Password Input ---- */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[rgb(var(--text-primary))] mb-2"
                >
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <PasswordIcon dependency={passwordFocused} />
                    </div>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        placeholder="••••••••"
                        className={`w-full bg-[rgb(var(--bg-input))] border ${passwordFocused
                            ? 'border-[rgb(var(--border-focus))] ring-2 ring-[rgba(var(--ring-focus),var(--alpha-ring))]'
                            : 'border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))]'
                            } rounded-xl pl-12 pr-4 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] focus:outline-none transition-all duration-200`}
                    />
                </div>
            </div>

            {/* ---- Login Button ---- */}
            <button
                type="submit"
                className="w-full bg-linear-to-r from-[rgb(var(--bg-primary))] to-[rgb(var(--text-accent))] hover:from-[rgb(var(--bg-primary-hover))] hover:to-[rgb(var(--bg-primary))] text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-[rgba(var(--shadow-primary),var(--alpha-shadow-primary))] hover:shadow-xl hover:shadow-[rgba(var(--shadow-primary),0.4)] transition-all duration-200 transform cursor-pointer active:scale-[0.98]"
            >
                Sign In
            </button>
        </form>
    )
}

export default AdminForm
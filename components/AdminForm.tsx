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
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try {
            if (!emailRegex.test(email)) {
                alert("Email is not valid!");
                return;
            }

            const res = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })

            const data = await res.json();

            if(res.status === 200) {
                localStorage.setItem("admin", "true");
                router.push("/admin/dashboard");
                alert(data.message);
            }
            else {
                alert(data.error || "Login failed");
            }
        } catch (e) {
            console.log("Error while login: ", e);
        } finally {
            setLoading(false);
        } 
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
                        required
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
                        required
                    />
                </div>
            </div>

            {/* ---- Login Button ---- */}
            <button
                type="submit"
                className="w-full bg-linear-to-r from-[rgb(var(--bg-primary))] to-[rgb(var(--text-accent))] hover:from-[rgb(var(--bg-primary-hover))] hover:to-[rgb(var(--bg-primary))] text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-[rgba(var(--shadow-primary),var(--alpha-shadow-primary))] hover:shadow-xl hover:shadow-[rgba(var(--shadow-primary),0.4)] transition-all duration-200 transform cursor-pointer active:scale-[0.98]"
            >
                {loading ? "Loading..." : "Sign In"}
            </button>
        </form>
    )
}

export default AdminForm
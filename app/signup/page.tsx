"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

interface ErrorState {
    email?: string;
    password?: string;
}

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<ErrorState>({});

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset error state
        setError({});

        // Temp error state
        const tempError: ErrorState = {};

        // Form validation
        if (email.trim() === "") {
            tempError.email = "Email is required";
        }
        else if (!emailRegex.test(email)) {
            tempError.email = "Invalid email format";
        }

        if (password.trim() === "") {
            tempError.password = "Password is required";
        }
        else if (password.length < 8) {
            tempError.password = "Password must be at least 8 characters long";
        }

        // If there are any errors, set them and return
        if (Object.keys(tempError).length > 0) {
            setError(tempError);
            return;
        }

        try {
            setLoading(true);

            // Create the supabae client
            const supabase = createClient();

            // Sign up the user
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`
                }
            });

            if(data?.user) {
                toast.success("Check your email for the confirmation link!");
                setEmail("");
                setPassword("");
            }

        } catch (e: any) {
            toast.error("Something went wrong. Please try again.");
            console.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg-body))] p-6">
            <div className="w-full max-w-[500px] bg-[rgb(var(--bg-surface))] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[rgb(var(--border-light))] p-8">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-2">
                        Join the Keyword Insight Engine
                    </h1>
                    <p className="text-[rgb(var(--text-secondary))]">
                        Fast, simple, and secure. Build your account effortlessly.
                    </p>
                </div>

                {/* ---- Sign Up form ---- */}
                <form onSubmit={handleSignUp}>
                    {/* ---- Email Input ---- */}
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block font-semibold text-[rgb(var(--text-primary))] mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-default))] rounded-lg px-4 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] hover:border-[rgb(var(--border-hover))] focus:ring-2 focus:border-[rgb(var(--border-focus))] focus:ring-[rgba(var(--ring-focus),var(--alpha-ring))] outline-none transition-all"
                            required
                        />
                        {/* Error message */}
                        {error?.email && (
                            <p className="text-red-500 text-[15px] mt-2">{error?.email}</p>
                        )}
                    </div>

                    {/* ---- Password Input ---- */}
                    <div className="mb-8">
                        <label
                            htmlFor="password"
                            className="block font-semibold text-[rgb(var(--text-primary))] mb-2"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-default))] rounded-lg px-4 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] hover:border-[rgb(var(--border-hover))] focus:ring-2 focus:border-[rgb(var(--border-focus))] focus:ring-[rgba(var(--ring-focus),var(--alpha-ring))] outline-none transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] hover:bg-[rgb(var(--bg-surface))] rounded-lg p-1.5 cursor-pointer transition-all"
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                        {/* Error message */}
                        {error?.password && (
                            <p className="text-red-500 text-[15px] mt-2">{error?.password}</p>
                        )}
                    </div>

                    {/* ---- Sign Up Button ---- */}
                    <Button
                        text={loading ? "Signing up..." : "Sign up"}
                        paddingY="12px"
                        disabled={loading}
                    />
                </form>

                {/* ---- Links ---- */}
                <p className="text-center text-[rgb(var(--text-secondary))] mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[rgb(var(--bg-primary))] hover:text-[rgb(var(--bg-primary-hover))] font-semibold hover:underline transition-colors">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default SignUpPage;
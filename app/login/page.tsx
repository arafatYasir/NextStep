"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ErrorState {
    email?: string;
    password?: string;
}

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorState>({});
    const router = useRouter();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSignIn = async (e: React.FormEvent) => {
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

            // Create the supabase client
            const supabase = createClient();

            // Login the user
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (data?.user) {
                toast.success("Login successful");
                setEmail("");
                setPassword("");
                router.replace("/");
            }
            else if(error) {
                toast.error("Login failed");
                console.error(error);
            }
        } catch (e: any) {
            toast.error("Login failed");
            console.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg-body))] p-6">
            <div className="w-full max-w-md bg-[rgb(var(--bg-surface))] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[rgb(var(--border-light))] p-8">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-[rgb(var(--text-secondary))]">
                        Login to your account
                    </p>
                </div>

                {/* Email Input */}
                <form onSubmit={handleSignIn}>
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

                    {/* Password Input */}
                    <div className="mb-8">
                        <label
                            htmlFor="password"
                            className="block font-semibold text-[rgb(var(--text-primary))] mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-default))] rounded-lg px-4 py-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] hover:border-[rgb(var(--border-hover))] focus:ring-2 focus:border-[rgb(var(--border-focus))] focus:ring-[rgba(var(--ring-focus),var(--alpha-ring))] outline-none transition-all"
                            required
                        />
                        {/* Error message */}
                        {error?.password && (
                            <p className="text-red-500 text-[15px] mt-2">{error?.password}</p>
                        )}
                    </div>

                    {/* Login Button */}
                    <Button
                        text={loading ? "Logging in..." : "Login"}
                        paddingY="12px"
                    />
                </form>

                {/* Footer Links */}
                <p className="text-center text-[rgb(var(--text-secondary))] mt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-[rgb(var(--bg-primary))] hover:text-[rgb(var(--bg-primary-hover))] font-semibold hover:underline transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default LoginPage;
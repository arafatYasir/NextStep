"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import GoogleIcon from "@/icons/GoogleIcon";

interface ErrorState {
    email?: string;
    password?: string;
}

const SignUpPage = () => {
    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<ErrorState>({});

    // Constants
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Functions
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

            if (data?.user) {
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

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);

            // Create the supabase client
            const supabase = createClient();

            // Sign up the user
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
                },
            });

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (e: any) {
            toast.error("Something went wrong. Please try again.");
            console.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg-body))] p-6">
            <div className="w-full max-w-md bg-[rgb(var(--bg-surface))] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[rgb(var(--border-light))] p-8">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-2">
                        Join the Keyword Insight Engine
                    </h1>
                    <p className="text-[rgb(var(--text-secondary))]">
                        Build your account effortlessly.
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

                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
                        type="submit"
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? "Signing up..." : "Sign up"}
                    </Button>
                </form>

                {/* ---- Divider ---- */}
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[rgb(var(--border-default))]"></span>
                    </div>
                    <div className="relative flex justify-center text-sm uppercase font-semibold">
                        <span className="bg-[rgb(var(--bg-surface))] px-4 text-[rgb(var(--text-secondary))]">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* ---- Google Sign Up Button ---- */}
                <Button
                    variant="outline"
                    className="w-full border-[rgb(var(--border-default))] hover:bg-[rgb(var(--bg-hover))] transition-all flex items-center justify-center gap-3"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                >
                    <GoogleIcon />
                    Continue with Google
                </Button>

                {/* ---- Footer Links ---- */}
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
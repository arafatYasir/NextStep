"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/icons/GoogleIcon";
import GitHubIcon from "@/icons/GitHubIcon";

import { Spinner } from "@/components/ui/spinner"

interface ErrorState {
    email?: string;
    password?: string;
}

interface LoadingState {
    isLoading: boolean;
    loadingFor: "email" | "google" | "github" | "none";
}

const SignInPage = () => {
    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<LoadingState>({ isLoading: false, loadingFor: "none" });
    const [error, setError] = useState<ErrorState>({});
    const router = useRouter();

    // Constants
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Functions
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
            setLoading({
                isLoading: true,
                loadingFor: "email"
            })

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
            else if (error) {
                toast.error("Login failed");
                console.error(error);
            }
        } catch (e: any) {
            toast.error("Login failed");
            console.error(e.message);
        } finally {
            setLoading({
                isLoading: false,
                loadingFor: "none"
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading({
                isLoading: true,
                loadingFor: "google"
            });

            // Create the supabase client
            const supabase = createClient();

            const siteUrl = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SITE_URL_DEV : process.env.NEXT_PUBLIC_SITE_URL_PROD;

            // Sign in the user
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${siteUrl}/auth/callback`,
                },
            });

            if (data.url) {
                window.location.href = data.url;
            }

            if (error) {
                toast.error("Login failed");
                console.error(error);
            }
        } catch (e: any) {
            toast.error("Something went wrong. Please try again.");
            console.error(e.message);
        } finally {
            setLoading({
                isLoading: false,
                loadingFor: "none"
            });
        }
    }

    const handleGitHubSignIn = async () => {
        try {
            setLoading({
                isLoading: true,
                loadingFor: "github"
            });

            // Create the supabase client
            const supabase = createClient();

            const siteUrl = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SITE_URL_DEV : process.env.NEXT_PUBLIC_SITE_URL_PROD;

            // Sign in the user
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                    redirectTo: `${siteUrl}/auth/callback`,
                },
            });

            if (error) {
                toast.error("Login failed");
                console.error(error);
            }

            // If url found then redirect to there
            if (data.url) {
                window.location.href = data.url;
            }
            // If url not found then stop loading
            else {
                setLoading({
                    isLoading: false,
                    loadingFor: "none"
                });
            }
        } catch (e: any) {
            toast.error("Something went wrong. Please try again.");
            console.error(e.message);

            setLoading({
                isLoading: false,
                loadingFor: "none"
            });
        }
    }

    console.log("re-rendering for loading");

    return (
        <main className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg-body))]">
            <div className="w-full max-w-md bg-[rgb(var(--bg-surface))] rounded-xl shadow-xl p-8">
                {/* ---- Title ---- */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                        Welcome Back
                    </h1>
                    <p className="font-sans text-foreground/80">
                        Sign in to your account
                    </p>
                </div>

                {/* ---- Sign in form ---- */}
                <form onSubmit={handleSignIn} className="space-y-6">
                    {/* ---- Email ---- */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block font-semibold font-heading text-foreground mb-2"
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

                    {/* ---- Password ---- */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block font-semibold font-heading text-foreground mb-2"
                        >
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {/* Error message */}
                        {error?.password && (
                            <p className="text-red-500 text-[15px] mt-2">{error?.password}</p>
                        )}
                    </div>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading.isLoading && loading.loadingFor === "email"}
                    >
                        {loading.isLoading && loading.loadingFor === "email" ? <span className="flex items-center gap-x-2"><Spinner />Signing in...</span> : "Sign In"}
                    </Button>
                </form>

                {/* ---- Divider ---- */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[rgb(var(--border-default))]"></span>
                    </div>
                    <div className="relative flex justify-center text-sm uppercase font-semibold font-sans">
                        <span className="bg-[rgb(var(--bg-surface))] px-4 text-foreground/80">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* ---- Google Login Button ---- */}
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleSignIn}
                        disabled={loading.isLoading && loading.loadingFor === "google"}
                    >
                        {
                            loading.isLoading && loading.loadingFor === "google" ?
                                <span className="flex items-center gap-x-2"><Spinner />Continue with Google</span>
                                :
                                <span className="flex items-center gap-x-2"><GoogleIcon />Continue with Google</span>
                        }
                    </Button>

                    {/* ---- GitHub Login Button ---- */}
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleGitHubSignIn}
                        disabled={loading.isLoading && loading.loadingFor === "github"}
                    >
                        {
                            loading.isLoading && loading.loadingFor === "github" ?
                                <span className="flex items-center gap-x-2"><Spinner />Continue with GitHub</span>
                                :
                                <span className="flex items-center gap-x-2"><GitHubIcon />Continue with GitHub</span>
                        }
                    </Button>
                </div>

                {/* ---- Footer Links ---- */}
                <p className="text-center font-sans text-foreground/80 mt-6">
                    Don't have an account?{" "}
                    <Link href="/sign-up" className="text-[rgb(var(--bg-primary))] hover:text-[rgb(var(--bg-primary-hover))] font-semibold hover:underline transition-colors">
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default SignInPage;
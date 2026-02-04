"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

interface FormState {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface ErrorState {
    name?: string;
    email?: string;
    message?: string;
}

const ContactPage = () => {
    // States
    const [formData, setFormData] = useState<FormState>({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});

    // Constants
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        // Clear error when user types
        if (errors[id as keyof ErrorState]) {
            setErrors((prev) => ({ ...prev, [id]: undefined }));
        }
    };

    const validateForm = () => {
        const tempErrors: ErrorState = {};

        if (!formData.name.trim()) {
            tempErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
        }
        else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Invalid email format";
        }

        if (!formData.message.trim()) tempErrors.message = "Message is required";

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        // Prevent default behavior
        e.preventDefault();

        // Check form validation
        if (!validateForm()) return;

        try {
            setLoading(true);

            // Send message via web3forms
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORM_ACCESS_KEY,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Clear form data
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });

                toast.success("Message sent successfully!");
            } else {
                toast.error(result.message || "Failed to send message.");
            }
        } catch (error) {
            toast.error("An error occurred while sending the message.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg-body))] pt-[60px] px-4 xs:px-6">
            <div className="w-full max-w-2xl bg-card rounded-xl shadow-xl p-6 xs:p-8 sm:p-10">
                {/* ---- Header ---- */}
                <div className="text-center mb-10">
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
                        Get in Touch
                    </h1>
                    <p className="text-sm xs:text-base font-sans text-foreground/80 max-w-md mx-auto">
                        Have questions about NextStep? Our team is here to help you navigate your career journey.
                    </p>
                </div>

                {/* ---- Contact Form ---- */}
                <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                        {/* ---- Name ---- */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm xs:text-base font-semibold font-heading text-foreground"
                            >
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-[15px]">{errors.name}</p>
                            )}
                        </div>

                        {/* ---- Email ---- */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm xs:text-base font-semibold font-heading text-foreground"
                            >
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-[15px]">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* ---- Phone ---- */}
                    <div className="space-y-2">
                        <label
                            htmlFor="phone"
                            className="block text-sm xs:text-base font-semibold font-heading text-foreground"
                        >
                            Phone Number <span className="text-[rgb(var(--text-tertiary))] font-normal">(Optional)</span>
                        </label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    {/* ---- Message ---- */}
                    <div className="space-y-2">
                        <label
                            htmlFor="message"
                            className="block text-sm xs:text-base font-semibold font-heading text-foreground"
                        >
                            Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={handleChange}
                            className="min-h-[120px]"
                        />
                        {errors.message && (
                            <p className="text-red-500 text-[15px]">{errors.message}</p>
                        )}
                    </div>

                    {/* ---- Submit Button ---- */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-x-2">
                                <Spinner /> Sending...
                            </span>
                        ) : (
                            <span className="flex items-center gap-x-2">
                                Send Message <Send className="size-4" />
                            </span>
                        )}
                    </Button>
                </form>
            </div>
        </main>
    );
};

export default ContactPage;
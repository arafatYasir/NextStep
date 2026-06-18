"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { CalendarClock, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubscriptionCardProps {
    planName: string;
    planPrice: string;
    planKey: string;
    subscriptionStatus: string;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
}

const STATUS_STYLES: Record<string, string> = {
    active: "bg-emerald-50 border border-emerald-200 text-emerald-500",
    past_due: "bg-amber-50 border border-amber-200 text-amber-400",
    canceled: "bg-rose-50 border border-rose-200 text-rose-500",
    inactive: "bg-[rgb(var(--text-tertiary))]/10 text-[rgb(var(--text-tertiary))]",
};

const SubscriptionCard = ({
    planName,
    planPrice,
    planKey,
    subscriptionStatus,
    currentPeriodEnd,
    cancelAtPeriodEnd,
}: SubscriptionCardProps) => {
    // States
    const [loading, setLoading] = useState(false);

    // Extra hooks
    const router = useRouter();

    const formattedDate = currentPeriodEnd
        ? new Date(currentPeriodEnd).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : null;

    const handleAction = async (action: "cancel" | "resume") => {
        try {
            setLoading(true);

            const res = await fetch(`/api/subscriptions/${action}`, { method: "POST" });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            toast.success(
                action === "cancel"
                    ? "Your subscription will end at the period end."
                    : "Your subscription has been resumed."
            );

            router.refresh();
        } catch (e: any) {
            toast.error(e.message || "Failed to update subscription");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-xl border border-[rgb(var(--border-default))] bg-card p-6 sm:p-8 space-y-6">
            {/* ---- Plan Header ---- */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-sans font-semibold text-foreground/50 uppercase tracking-wide">
                        Current Plan
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mt-1">
                        {planName}
                    </h2>
                </div>
                <span
                    className={`text-xs font-sans font-semibold px-3 py-1 rounded-full capitalize shrink-0 ${STATUS_STYLES[subscriptionStatus] ?? STATUS_STYLES.inactive
                        }`}
                >
                    {subscriptionStatus.replace("_", " ")}
                </span>
            </div>

            {/* ---- Price + Renewal Info ---- */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 rounded-xl border border-[rgb(var(--border-light))] p-4">
                    <CreditCard className="w-5 h-5 text-[rgb(var(--bg-primary-hover))] shrink-0" />
                    <div>
                        <p className="text-xs font-sans text-foreground/50">Price</p>
                        <p className="text-sm font-sans font-semibold text-foreground">
                            {planPrice}/month
                        </p>
                    </div>
                </div>

                {formattedDate && (
                    <div className="flex items-center gap-3 rounded-xl border border-[rgb(var(--border-light))] p-4">
                        <CalendarClock className="w-5 h-5 text-[rgb(var(--bg-primary-hover))] shrink-0" />
                        <div>
                            <p className="text-xs font-sans text-foreground/50">
                                {cancelAtPeriodEnd ? "Access ends on" : "Renews on"}
                            </p>
                            <p className="text-sm font-sans font-semibold text-foreground">
                                {formattedDate}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* ---- Cancellation Notice ---- */}
            {cancelAtPeriodEnd && (
                <p className="text-sm font-sans text-[rgb(234,179,8)] bg-[rgb(234,179,8)]/10 rounded-lg px-4 py-3">
                    Your plan won't renew. You'll keep access until {formattedDate}, then move to the Free plan.
                </p>
            )}

            {/* ---- Actions ---- */}
            <div className="flex flex-col xs:flex-row gap-3 pt-2">
                <Button size="lg">
                    <Link href="/#pricing">Upgrade Plan</Link>
                </Button>

                {planKey !== "FREE" && (
                    cancelAtPeriodEnd ? (
                        <Button onClick={() => handleAction("resume")} disabled={loading} size="lg" variant="outline">
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Resume Subscription
                        </Button>
                    ) : (
                        <Button onClick={() => handleAction("cancel")} disabled={loading} variant="outline" size="lg">
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Cancel Subscription
                        </Button>
                    )
                )}
            </div>
        </div>
    );
};

export default SubscriptionCard;
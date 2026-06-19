"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../../ui/spinner";
import { useRouter } from "next/navigation";

interface SubscriptionActionsProps {
    planKey: string;
    cancelAtPeriodEnd: boolean;
}

const SubscriptionActions = ({ planKey, cancelAtPeriodEnd }: SubscriptionActionsProps) => {
    // States
    const [loading, setLoading] = useState(false);

    // Extra hooks
    const router = useRouter();

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
        <div className="flex flex-col xs:flex-row gap-3 pt-2">
            <Button size="lg">
                <Link href="/#pricing">Upgrade Plan</Link>
            </Button>

            {planKey !== "FREE" && (
                cancelAtPeriodEnd ? (
                    <Button onClick={() => handleAction("resume")} disabled={loading} size="lg" variant="outline">
                        {loading ? (
                            <span className="flex items-center gap-x-2">
                                <Spinner />
                                Resuming Subscription...
                            </span>
                        ) : (
                            <span>Resume Subscription</span>
                        )}
                    </Button>
                ) : (
                    <Button onClick={() => handleAction("cancel")} disabled={loading} variant="outline" size="lg">
                        {loading ? (
                            <span className="flex items-center gap-x-2">
                                <Spinner />
                                Canceling Subscription...
                            </span>
                        ) : (
                            <span>Cancel Subscription</span>
                        )}

                    </Button>
                )
            )}
        </div>
    )
}

export default SubscriptionActions
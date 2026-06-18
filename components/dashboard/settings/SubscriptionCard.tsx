import { CalendarClock, CreditCard } from "lucide-react";
import SubscriptionActions from "./SubscriptionActions";
import { connectToDatabase } from "@/src/database/mongodb";
import { Subscription } from "@/src/models/subscription.model";
import { pricingPlans } from "@/lib/pricing";

const STATUS_STYLES: Record<string, string> = {
    active: "bg-emerald-50 border border-emerald-200 text-emerald-500",
    past_due: "bg-amber-50 border border-amber-200 text-amber-400",
    canceled: "bg-rose-50 border border-rose-200 text-rose-500",
    inactive: "bg-[rgb(var(--text-tertiary))]/10 text-[rgb(var(--text-tertiary))]",
};

const SubscriptionCard = async ({ userId }: { userId: string }) => {
    // Fetching subscription details
    await connectToDatabase();
    const subscription = await Subscription.findOne({ userId: userId }).lean();

    // Choose the plan details according to plan key
    const planDetails = pricingPlans.find((p) => p.planKey === subscription?.planKey) ?? pricingPlans[0];

    // Extracting plan values
    const { plan: planName, price: planPrice } = planDetails;
    const planKey = subscription?.planKey ?? "FREE";
    const subscriptionStatus = subscription?.subscriptionStatus ?? "inactive";

    const currentPeriodEnd = subscription?.currentPeriodEnd?.toISOString() ?? null;
    const cancelAtPeriodEnd = subscription?.cancelAtPeriodEnd ?? false;

    const formattedDate = currentPeriodEnd
        ? new Date(currentPeriodEnd).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : null;

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
            <SubscriptionActions
                planKey={planKey}
                cancelAtPeriodEnd={cancelAtPeriodEnd}
            />
        </div>
    );
};

export default SubscriptionCard;
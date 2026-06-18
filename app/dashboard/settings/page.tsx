import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { connectToDatabase } from "@/src/database/mongodb";
import { Subscription } from "@/src/models/subscription.model";
import { pricingPlans } from "@/lib/pricing";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";

const SettingsPage = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/sign-in");
    }

    await connectToDatabase();
    const subscription = await Subscription.findOne({ userId: user.id }).lean();

    const planDetails =
        pricingPlans.find((p) => p.planKey === subscription?.planKey) ?? pricingPlans[0];

    return (
        <div className="max-w-2xl p-8 space-y-10">
            <div>
                <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">
                    Settings
                </h1>
                <p className="text-foreground/80 font-sans text-base">
                    Manage your account and subscription
                </p>
            </div>

            <SubscriptionCard
                planName={planDetails.plan}
                planPrice={planDetails.price}
                planKey={subscription?.planKey ?? "FREE"}
                subscriptionStatus={subscription?.subscriptionStatus ?? "inactive"}
                currentPeriodEnd={subscription?.currentPeriodEnd?.toISOString() ?? null}
                cancelAtPeriodEnd={subscription?.cancelAtPeriodEnd ?? false}
            />
        </div>
    );
};

export default SettingsPage;
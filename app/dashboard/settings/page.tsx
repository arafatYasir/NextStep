import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SubscriptionCard from "@/components/dashboard/settings/SubscriptionCard";
import { Suspense } from "react";
import SubscriptionCardSkeleton from "@/components/dashboard/settings/SubscriptionCardSkeleton";

const SettingsPage = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="max-w-2xl p-4 md:p-8 space-y-6 md:space-y-10">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-foreground">
                    Settings
                </h1>
                <p className="text-foreground/80 font-sans text-sm md:text-base">
                    Manage your account and subscription
                </p>
            </div>

            <Suspense fallback={<SubscriptionCardSkeleton />}>
                <SubscriptionCard userId={user.id} />
            </Suspense>
        </div>
    );
};

export default SettingsPage;
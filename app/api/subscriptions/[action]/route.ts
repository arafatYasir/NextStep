import { connectToDatabase } from "@/src/database/mongodb";
import { requireAuth } from "@/src/helpers/requireAuth";
import { Subscription } from "@/src/models/subscription.model";
import { stripe } from "@/src/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ action: string }> }) {
    const { user, unauthorized } = await requireAuth();
    if (unauthorized) return unauthorized;

    const { action } = await params;

    if (action === "resume") {
        try {
            await connectToDatabase();
            const subscription = await Subscription.findOne({ userId: user.id });

            if (!subscription?.stripeSubscriptionId) {
                return NextResponse.json(
                    { status: "ERROR", message: "No active subscription found" },
                    { status: 400 }
                );
            }

            const updated = await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
                cancel_at_period_end: false
            });

            await Subscription.findOneAndUpdate(
                { userId: user.id },
                { cancelAtPeriodEnd: updated.cancel_at_period_end }
            );

            return NextResponse.json(
                { status: "OK", message: "Subscription resumed" },
                { status: 200 }
            );
        } catch (e) {
            console.error("Resume subscription error:", e);
            return NextResponse.json(
                { status: "ERROR", message: "Failed to resume subscription" },
                { status: 500 }
            );
        }

    }
    else if (action === "cancel") {
        try {
            await connectToDatabase();
            const subscription = await Subscription.findOne({ userId: user.id });

            if (!subscription?.stripeSubscriptionId) {
                return NextResponse.json(
                    { status: "ERROR", message: "No active subscription found" },
                    { status: 400 }
                );
            }

            const updated = await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
                cancel_at_period_end: true
            });

            await Subscription.findOneAndUpdate(
                { userId: user.id },
                { cancelAtPeriodEnd: updated.cancel_at_period_end }
            );

            return NextResponse.json(
                { status: "OK", message: "Subscription will cancel at period end" },
                { status: 200 }
            );
        } catch (e) {
            console.error("Cancel subscription error:", e);
            return NextResponse.json(
                { status: "ERROR", message: "Failed to cancel subscription" },
                { status: 500 }
            );
        }
    }
}
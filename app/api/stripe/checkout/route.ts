import { connectToDatabase } from "@/src/database/mongodb";
import { requireAuth } from "@/src/helpers/requireAuth";
import { Subscription } from "@/src/models/subscription.model";
import { stripe } from "@/src/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";

const PLAN_PRICE_MAP: Record<string, string> = {
    STANDARD: process.env.STRIPE_STANDARD_PRODUCT_ID!,
    PREMIUM: process.env.STRIPE_PREMIUM_PRODUCT_ID!
};

export async function POST(req: NextRequest) {
    try {
        // Check authentication
        const { user, unauthorized } = await requireAuth();
        if (unauthorized) return unauthorized;

        // Get the plankey and it's equivalent product id
        const { planKey } = await req.json();

        if (!planKey || !PLAN_PRICE_MAP[planKey]) {
            return NextResponse.json({
                status: "ERROR", message: "Invalid plan selected"
            }, { status: 400 });
        }

        // Get or create stripe customer
        await connectToDatabase();
        const subscription = await Subscription.findOne({ userId: user.id });

        let stripeCustomerId = subscription?.stripeCustomerId;

        // If customer id is not found, create new stripe customer
        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: { userId: user.id }
            });

            stripeCustomerId = customer.id;

            // Save the new customer id to database
            await Subscription.findOneAndUpdate(
                { userId: user.id },
                { stripeCustomerId: customer.id }
            )
        }

        const siteUrl = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SITE_URL_DEV : process.env.NEXT_PUBLIC_SITE_URL_PROD;

        // Create the stripe checkout session
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: "subscription",
            line_items: [
                {
                    price: PLAN_PRICE_MAP[planKey],
                    quantity: 1
                }
            ],
            success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/payment/cancel`,
            metadata: {
                userId: user.id,
                planKey
            },
            subscription_data: {
                metadata: {
                    userId: user.id,
                    planKey
                }
            }
        });

        return NextResponse.json(
            { status: "OK", url: session.url },
            { status: 200 }
        );
    } catch (e) {
        console.error("Checkout session error:", e);
        
        return NextResponse.json(
            { status: "ERROR", message: "Failed to create checkout session" },
            { status: 500 }
        );

    }
}
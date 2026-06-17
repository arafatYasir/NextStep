import { connectToDatabase } from "@/src/database/mongodb";
import { Subscription } from "@/src/models/subscription.model";
import { stripe } from "@/src/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET! // I need this
        );
    } catch (e: any) {
        console.error("Webhooks signature verification failed: ", e.message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await connectToDatabase();

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                const userId = session.metadata?.userId;
                const planKey = session.metadata?.planKey;
                const subscriptionId = session.subscription as string;

                if (!userId || !planKey) {
                    console.error("Missing metadata on checkout session");
                    break;
                }

                const subscription = await stripe.subscriptions.retrieve(subscriptionId);

                await Subscription.findOneAndUpdate(
                    { userId },
                    {
                        planKey,
                        subscriptionStatus: subscription.status,
                        stripeSubscriptionId: subscription.id,
                        currentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
                        cancelAtPeriodEnd: subscription.cancel_at_period_end,
                    }
                );

                console.log(`Subscription activated for user ${userId} on plan ${planKey}`);
                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                const userId = subscription.metadata?.userId;
                const planKey = subscription.metadata?.planKey;

                if (!userId) {
                    console.error("Missing userId metadata on subscription update");
                    break;
                }

                await Subscription.findOneAndUpdate(
                    { userId },
                    {
                        planKey: planKey ?? undefined,
                        subscriptionStatus: subscription.status,
                        currentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
                        cancelAtPeriodEnd: subscription.cancel_at_period_end,
                    }
                );

                console.log(`Subscription updated for user ${userId}`);
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                const userId = subscription.metadata?.userId;

                if (!userId) {
                    console.error("Missing userId metadata on subscription deletion");
                    break;
                }

                await Subscription.findOneAndUpdate(
                    { userId },
                    {
                        planKey: "FREE",
                        subscriptionStatus: "canceled",
                        stripeSubscriptionId: null,
                        currentPeriodEnd: null,
                        cancelAtPeriodEnd: false,
                    }
                );

                console.log(`Subscription ended for user ${userId} — downgraded to FREE`);
                break;
            }

            case "invoice.payment_failed": {
                const invoice = event.data.object as Stripe.Invoice;
                const subscriptionId = invoice.parent?.subscription_details?.subscription as string;

                if (!subscriptionId) break;

                await Subscription.findOneAndUpdate(
                    { stripeSubscriptionId: subscriptionId },
                    { subscriptionStatus: "past_due" }
                );

                console.log(`Payment failed for subscription ${subscriptionId}`);
                break;
            }

            default:
                break;
        }

        return NextResponse.json({ recieved: true }, { status: 200 });
    } catch (e) {
        console.error("Webhook handler error:", e);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
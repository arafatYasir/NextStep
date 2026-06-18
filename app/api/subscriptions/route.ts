import { connectToDatabase } from "@/src/database/mongodb";
import { requireAuth } from "@/src/helpers/requireAuth";
import { Subscription } from "@/src/models/subscription.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();

        if (!userId.trim()) {
            return NextResponse.json({ status: "ERROR", message: "User id not found or empty!" }, { status: 400 });
        }

        // Connect to database
        await connectToDatabase();

        // Checking if the subscription already exists
        const subscriptionExists = await Subscription.findOne({ userId });
        if (subscriptionExists) {
            return NextResponse.json({ status: "OK", message: "Subscription already exists" }, { status: 200 });
        }

        // Create a new subscription
        await Subscription.create({ userId });

        return NextResponse.json({ status: "OK", message: "Subscription created successfully!" }, { status: 201 });
    } catch (e) {
        console.error("Failed to create user subscription: ", e);
        return NextResponse.json({ status: "ERROR", message: "Failed to create subscription" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { user, unauthorized } = await requireAuth();
        if (unauthorized) return unauthorized;

        const userId = user.id;

        if (!userId) {
            return NextResponse.json({ status: "ERROR", message: "User id is not found" }, { status: 400 });
        }

        await connectToDatabase();

        const subscription = await Subscription.findOne({ userId });

        if (!subscription) {
            return NextResponse.json({ status: "ERROR", message: "User subscription not found!" }, { status: 404 });
        }

        return NextResponse.json({
            planKey: subscription.planKey,
            currentPeriodEnd: subscription.currentPeriodEnd,
            subscriptionStatus: subscription.subscriptionStatus,
            cancelAtPeriodEnd: subscription.cancelAtPeriodEnd
        })
    } catch (e) {
        console.error("Failed to get subscription details.");
        return NextResponse.json({ status: "ERROR", message: "Internal server error" }, { status: 500 })
    }
}
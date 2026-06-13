import { connectToDatabase } from "@/src/database/mongodb";
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
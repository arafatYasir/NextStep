import { stripe } from "@/src/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ message: "Missing session_id" }, { status: 400 });
    }

    try {
        // Fetch the actual session data directly from Stripe's servers
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Check if the payment was actually successful
        if (session.status === "complete" && session.payment_status === "paid") {
            return NextResponse.json({ status: "success", customerEmail: session.customer_details?.email });
        }

        return NextResponse.json({ status: "unpaid" }, { status: 400 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
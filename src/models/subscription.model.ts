import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        planKey: {
            type: String,
            enum: ["FREE", "STANDARD", "PREMIUM"],
            default: "FREE"
        },
        subscriptionStatus: {
            type: String,
            enum: ["active", "inactive", "past_due", "canceled", "incomplete"],
            default: "inactive"
        },
        stripeCustomerId: {
            type: String,
            default: null
        },
        stripeSubscriptionId: {
            type: String,
            default: null
        },
        currentPeriodEnd: {
            type: Date,
            default: null
        },
        cancelAtPeriodEnd: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const Subscription = mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
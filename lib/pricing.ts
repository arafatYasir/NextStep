import { PricingPlan } from "@/types/global";

export const pricingPlans: PricingPlan[] = [
    {
        plan: "Free — Explore",
        planKey: "FREE",
        price: "$0",
        description: "Get a flavour of how NextStep works and understand where your stand.",
        allowed: [
            "Analyze 1 Job Description/Day (3000 characters limit)",
            "Analyze 1 Resume/Day",
            "Build 1 Resume/Day",
            "Generate 1 Cover Letter/Day"
        ],
        notAllowed: []
    },
    {
        plan: "Standard — Apply Smarter",
        planKey: "STANDARD",
        price: "$5",
        description: "Everything you need to apply seriously and stop guessing what recruiters want.",
        allowed: [
            "Analyze up to 10 Job Descriptions/Day (3000 characters limit)",
            "Analyze up to 10 Resumes/Day",
            "Build up to 10 Resumes/Day",
            "Generate up to 10 Cover Letters/Day",
        ],
        notAllowed: [],
        cta: "Start Applying Smarter",
        tag: "Most Popular"
    },
    {
        plan: "Premium — Get Hired Faster",
        planKey: "PREMIUM",
        price: "$15",
        description: "Unlimited access for developers who want maximum precision and control.",
        allowed: [
            "Analyze unlimited Job Descriptions (no characters limit)",
            "Analyze unlimited Resumes",
            "Build unlimited Resumes",
            "Generate unlimited Cover Letters",
        ],
        notAllowed: [],
        cta: "Get Unlimited Access"
    }
];
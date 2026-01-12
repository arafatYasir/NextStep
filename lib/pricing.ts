export const pricingPlans = [
    {
        plan: "Free — Explore",
        price: "$0",
        description: "Get a flavour of how NextStep works and understand where your stand.",
        allowed: [
            "Analyze 1 job description per day (3000 characters limit)",
            "Analyze 1 resume per day",
            "View ATS score for a resume",
            "Generate 1 cover letter per day"
        ],
        notAllowed: [
            "Build resumes based on job descriptions",
            "AI-powered resume and phrasing suggestions",
        ],
    },
    {
        plan: "Standard — Apply Smarter",
        price: "$5",
        description: "Everything you need to apply seriously and stop guessing what recruiters want.",
        allowed: [
            "Analyze up to 10 job descriptions per day (3000 characters limit)",
            "Analyze up to 10 resumes per day",
            "View ATS score for a resume",
            "Generate up to 10 cover letters per day",
            "Build up to 10 resumes based on job descriptions per day",
            "AI-powered resume and phrasing suggestions"
        ],
        notAllowed: [],
        cta: "Start Applying Smarter",
        tag: "Most Popular"
    },
    {
        plan: "Premium — Get Hired Faster",
        price: "$15",
        description: "Unlimited access for developers who want maximum precision and control.",
        allowed: [
            "Analyze unlimited job descriptions (no characters limit)",
            "Analyze unlimited resumes",
            "View ATS score for unlimited resumes",
            "Build unlimited resumes based on job descriptions",
            "Generate unlimited cover letters",
            "AI-powered resume and phrasing suggestions"
        ],
        notAllowed: [],
        cta: "Get Unlimited Access"
    }
];
interface NavLink {
    id: number;
    name: string;
    description?: string;
    url: string;
    type?: "Link";
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

interface NavSubmenu {
    id: number;
    name: string;
    type: "Submenu";
    childrens: NavLink[];
}

interface InsightItem {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    title: string;
    description: string;
};

interface OfferItem {
    id: number;
    title: string;
    description: string;
};

interface TestimonialItem {
    id: number;
    rating: number;
    quote: string;
    name: string;
    title: string;
    image: string;
};

interface PricingPlan {
    plan: string;
    price: string;
    description: string;
    allowed: string[];
    notAllowed: string[];
    cta?: string;
    tag?: string;
}

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

interface JobAnalysis {
    skills: { name: string, count: number }[];
    softSkills: { name: string, count: number }[];
    tools: { name: string, count: number }[];
    phrases: { name: string, count: number }[];
    actionVerbs: { name: string, count: number }[];
    seniorityLevels: string[];
    educationalRequirements: string[];
    salary: string;
}

interface ResumeAnalysis {
    atsScore: number;

    scoreBreakdown: {
        skillsMatch: number,
        experienceMatch: number,
        educationMatch: number | null,
        keywordMatch: number,
        formattingScore: number
    };

    keywordAnalysis: {
        matchedKeywords: string[],
        missingKeywords: string[],
        overusedKeywords: string[]
    };

    matchInsights: {
        strongMatches: string[],
        partialMatches: [
            {
                requirement: string,
                reason: string
            }
        ],
        missingCriticalSkills: string[],
        weakActionVerbs: string[]
    };

    improvementInsights: {
        priorityFixes: [
            {
                issue: string,
                impact: "high" | "medium" | "low",
                fix: string
            }
        ],
        skillGapsToAddress: string[],
        resumeSectionAdvice: [
            {
                section: string,
                advice: string
            }
        ]
    };
    
    sectionScores: {
        summary: number,
        experience: number,
        projects: number,
        skills: number,
        education: number
    };
    formattingAnalysis: {
        score: number,
        issues: string[]
    };

    metaAnalysis: {
        resumeTone: "too passive" | "balanced" | "too generic",
        atsReadability: "poor" | "average" | "good" | "excellent",
        confidenceLevel: "low" | "medium" | "high"
    };
};
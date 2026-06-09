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
        strongMatches: {
            requirement: string;
            reason: string;
        }[];
        partialMatches: {
            requirement: string;
            reason: string;
        }[];
    };

    improvementInsights: {
        priorityFixes: {
            issue: string;
            impact: "High" | "Medium" | "Low";
            fix: string;
        }[];
        skillGapsToAddress: string[];
        resumeSectionAdvice: {
            section: string;
            advice: string;
        }[];
    };
    
    sectionScores: {
        summary: number,
        experience: number,
        projects: number,
        skills: number,
        education: number
    };
    formattingAnalysis: {
        issues: string[]
    };

    metaAnalysis: {
        resumeTone: "Too Passive" | "Balanced" | "Too Generic",
        atsReadability: "Poor" | "Average" | "Good" | "Excellent",
        confidenceLevel: "Low" | "Medium" | "High"
    };
};

interface ResumeData {
    personalInfo: {
        fullName: string,
        email: string,
        phone: string,
        location: string,
        github: string,
        linkedin: string
    };
    summary: string;
    resumeTitle: string;
    skills: {
        languages: string[],
        frameworksAndLibraries: string[],
        toolsAndPlatforms: string[],
        softSkills: string[]
    };
    experience: {
        jobTitle: string,
        company: string,
        duration: string,
        responsibilities: string[]
    }[];
    projects: {
        projectName: string,
        techStack: string[],
        highlights: string[],
        link: string
    }[];
    education: {
        degree: string,
        institution: string,
        duration: string
    }[]
};

interface CareerInfo {
    companies: {
        id: number;
        company: string;
        role: string;
        startYear: string;
        isCurrentJob: boolean;
        endYear?: string;
        description: string;
    }[];
    projects: {
        id: number;
        name: string;
        link: string;
        techStack: string;
        description: string;
    }[]
}


interface CareerInfoCount {
    companies: number;
    projects: number;
}
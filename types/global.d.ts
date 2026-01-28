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
    id:  number;
    title: string;
    description: string;
};

interface TestimonialItem {
    id:  number;
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
    skills: { name: string, count: number }[],
    softSkills: { name: string, count: number }[],
    tools: { name: string, count: number }[],
    phrases: { name: string, count: number }[],
    actionVerbs: { name: string, count: number }[],
    seniorityLevels: string[],
    educationalRequirements: string[],
    salary: string
}
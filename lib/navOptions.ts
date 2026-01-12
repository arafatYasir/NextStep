import { FileSearch, ScanText, FilePlus, PenLine, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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

export const navOptions: (NavLink | NavSubmenu)[] = [
    {
        id: 1,
        name: "Tools",
        type: "Submenu",
        childrens: [
            {
                id: 1,
                name: "Job Description Analyzer",
                description: "Extract key skills, keywords, and requirements from any job post.",
                url: "/tools/job-analyzer",
                icon: FileSearch
            },
            {
                id: 2,
                name: "AI Resume Analyzer",
                description: "Scan your resume to find gaps, weaknesses, and optimization opportunities.",
                url: "/tools/resume-analyzer",
                icon: ScanText
            },
            {
                id: 3,
                name: "AI Resume Builder",
                description: "Generate an ATS-optimized resume tailored to your target role.",
                url: "/tools/resume-builder",
                icon: FilePlus
            },
            {
                id: 4,
                name: "AI Cover Letter Writer",
                description: "Write personalized, job-specific cover letters in seconds.",
                url: "/tools/cover-letter-writer",
                icon: PenLine
            }
        ]
    },
    {
        id: 2,
        name: "About",
        url: "/about"
    },
    {
        id: 3,
        name: "Blogs",
        url: "/blogs"
    },
    {
        id: 4,
        name: "Contact",
        url: "/contact"
    }
];
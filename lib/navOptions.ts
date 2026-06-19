import { NavLink, NavSubmenu } from "@/types/global";
import { FileSearch, ScanText, FilePlusCorner, PenLine } from "lucide-react";

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
                icon: FilePlusCorner
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
        name: "Contact",
        url: "/contact"
    }
];
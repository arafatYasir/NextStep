interface NavLink {
    id: number;
    name: string;
    url: string;
    type?: "Link"
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
                name: "Job Analyzer",
                url: "/tools/job-analyzer"
            },
            {
                id: 2,
                name: "Resume Analyzer",
                url: "/tools/resume-analyzer"
            },
            {
                id: 3,
                name: "AI Resume Builder",
                url: "/tools/resume-builder"
            },
            {
                id: 4,
                name: "Keyword Research",
                url: "/tools/keyword-research"
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
        name: "Resources",
        url: "/resources"
    },
    {
        id: 4,
        name: "Blogs",
        url: "/blogs"
    },
    {
        id: 5,
        name: "Contact",
        url: "/contact"
    }
];
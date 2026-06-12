import { BarChart3, CheckCircle2, Compass, FileText, GraduationCap, Search } from "lucide-react";

export const aboutCards = [
    {
        id: 1,
        title: "Analyze Job Descriptions",
        description: "Understand exactly what employers are looking for before you apply. Our AI breaks down job descriptions into required skills, important keywords, experience expectations, and role-specific requirements, helping you identify what matters most and where you stand.",
        icon: Search
    },
    {
        id: 2,
        title: "Build Tailored Resumes",
        description: "Create resumes that align with specific job opportunities without rewriting everything from scratch. Whether you're creating your first resume or tailoring an existing one, NextStep helps you generate professional, job-focused resumes designed around the role you're targeting.",
        icon: FileText
    },
    {
        id: 3,
        title: "Evaluate Resume Performance",
        description: "Know how well your resume matches a job before submitting an application. Get detailed feedback on ATS compatibility, keyword coverage, section quality, formatting issues, and improvement opportunities so you can strengthen your application before it reaches recruiters.",
        icon: BarChart3
    },
    {
        id: 4,
        title: "Apply With Greater Confidence",
        description: "Every application should be intentional. NextStep helps reduce the time spent manually tailoring resumes while improving the quality and relevance of every application, allowing you to focus on opportunities that matter most.",
        icon: CheckCircle2
    },
];

export const aboutTargets = [
    {
        id: 1,
        title: "Built for Early-Career Professionals",
        description1: "Whether you're a student preparing for internships, a recent graduate entering the job market, or an early-career professional seeking your next opportunity, NextStep is designed to help you navigate the hiring process more effectively.",
        description2: "Our goal isn't simply to help you create better resumes. Our goal is to help you understand opportunities, communicate your value clearly, and move forward in your career with confidence.",
        icon: GraduationCap
    },
    {
        id: 2,
        title: "Our Mission",
        description1: "We believe that career growth should be guided by clarity, not guesswork.",
        description2: "Our mission is to make professional career tools accessible to everyone by combining AI technology with practical hiring insights, helping candidates make better decisions and present themselves more effectively in an increasingly competitive job market.",
        icon: Compass
    }
]
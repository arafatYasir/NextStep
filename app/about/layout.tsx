import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About NextStep — Helping Job Seekers Apply Smarter",
    description: "Learn why we built NextStep, our mission to make career tools accessible to early-career professionals, and how our AI-powered job and resume intelligence simplifies your job search.",
}

const AboutPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default AboutPageLayout
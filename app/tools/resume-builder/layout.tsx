import { Metadata } from "next"

export const metadata: Metadata = {
    title: "NextStep — AI Resume Builder",
    description: "Generate a tailored, ATS-friendly resume in seconds based on your job title, job description, and personal details—optimized to match the role and boost your interview chances."
}

const ResumeBuilderLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>{children}</div>
    )
}

export default ResumeBuilderLayout
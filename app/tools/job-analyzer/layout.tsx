import { Metadata } from "next"

export const metadata: Metadata = {
    title: "NextStep — AI Job Description Analyzer",
    description: "NextStep helps job seekers analyze job descriptions using AI. Extract skills, keywords, requirements, and insights to tailor resumes 25% faster."
};

const JobAnalyzerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default JobAnalyzerLayout
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "NextStep — AI Resume Analyzer",
    description: "Analyze your resume with AI using NextStep. Get ATS compatibility insights, keyword analysis, skill gap detection, resume scoring, and personalized improvements to increase your interview chances."
};

const ResumeAnalyzerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default ResumeAnalyzerLayout
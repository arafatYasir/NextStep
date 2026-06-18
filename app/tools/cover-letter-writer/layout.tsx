import { Metadata } from "next"

export const metadata: Metadata = {
    title: "NextStep — AI Cover Letter Writer",
    description: "Create professional, personalized cover letters in seconds with NextStep AI. Generate tailored cover letters for any job application, highlight your strengths, and apply with confidence."
};

const CoverLetterWriterLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default CoverLetterWriterLayout
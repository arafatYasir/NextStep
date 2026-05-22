interface ResumeAnalysisTabProps {
    matchedKeywords: { name: string, count: number }[],
    missingKeywords: { name: string, count: number }[],
    overusedKeywords: { name: string, count: number }[],
    skillGaps: { name: string, count: number }[],
}

const ResumeAnalysisTab = (data: ResumeAnalysisTabProps) => {
    console.log(data);
    return (
        <div>ResumeAnalysisTab</div>
    )
}

export default ResumeAnalysisTab
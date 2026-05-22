import SkillChart from "../SkillChart"

interface ResumeAnalysisTabProps {
    data: {
        matchedKeywords: { name: string, count: number }[],
        missingKeywords: { name: string, count: number }[],
        overusedKeywords: { name: string, count: number }[],
        skillGaps: { name: string, count: number }[],
    }
}

const ResumeAnalysisTab = ({ data }: ResumeAnalysisTabProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkillChart
                title="Top Matched Keywords"
                data={data.matchedKeywords}
            />
            <SkillChart
                title="Top Missing Keywords"
                data={data.missingKeywords}
            />
            <SkillChart
                title="Top Overused Keywords"
                data={data.overusedKeywords}
            />
            <SkillChart
                title="Top Skill Gaps"
                data={data.skillGaps}
            />
        </div>
    )
}

export default ResumeAnalysisTab
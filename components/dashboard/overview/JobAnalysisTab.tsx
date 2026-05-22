"use client";

import SkillChart from "../SkillChart"

interface JobAnalysisTabProps {
    data: {
        hardSkills: { name: string; count: number }[];
        softSkills: { name: string; count: number }[];
        tools: { name: string; count: number }[];
        actionVerbs: { name: string; count: number }[];
        phrases: { name: string; count: number }[];
    };
}

const JobAnalysisTab = ({ data }: JobAnalysisTabProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillChart
                title="Top Hard Skills"
                data={data.hardSkills}
            />
            <SkillChart
                title="Top Essential Tools"
                data={data.tools}
            />
            <SkillChart
                title="Top Soft Skills"
                data={data.softSkills}
            />
            <SkillChart
                title="Top Action Verbs"
                data={data.actionVerbs}
            />
            <SkillChart
                title="Top Key Phrases"
                data={data.phrases}
                className="col-span-2"
            />
        </div>
    );
};

export default JobAnalysisTab;
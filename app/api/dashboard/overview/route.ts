import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetching job records
        const jobs = await JobRecord.find({ userId, status: "completed" }).lean();

        const jobAnalysesCount = jobs.length;
        const resumeAnalysesCount = 0;
        const resumesBuiltCount = 0;
        const lettersWrittenCount = 0;

        // Constructing data for metrics
        const skillsMap: Record<string, number> = {};
        const softSkillsMap: Record<string, number> = {};
        const toolsMap: Record<string, number> = {};
        const actionVerbsMap: Record<string, number> = {};
        const phrasesMap: Record<string, number> = {};

        jobs.forEach((job: any) => {
            const res = job.result;
            if (!res) return;

            res.skills?.forEach((s: any) => {
                if (s.name) skillsMap[s.name] = (skillsMap[s.name] || 0) + 1;
            });
            res.softSkills?.forEach((s: any) => {
                if (s.name) softSkillsMap[s.name] = (softSkillsMap[s.name] || 0) + 1;
            });
            res.tools?.forEach((s: any) => {
                if (s.name) toolsMap[s.name] = (toolsMap[s.name] || 0) + 1;
            });
            res.actionVerbs?.forEach((s: any) => {
                if (s.name) actionVerbsMap[s.name] = (actionVerbsMap[s.name] || 0) + 1;
            });
            res.phrases?.forEach((s: any) => {
                if (s.name) phrasesMap[s.name] = (phrasesMap[s.name] || 0) + 1;
            });
        });

        const formatMap = (map: Record<string, number>) =>
            Object.entries(map)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);

        return NextResponse.json({
            stats: {
                jobAnalysesCount,
                resumeAnalysesCount,
                resumesBuiltCount,
                lettersWrittenCount,
            },
            jobAnalysisData: {
                hardSkills: formatMap(skillsMap),
                softSkills: formatMap(softSkillsMap),
                tools: formatMap(toolsMap),
                actionVerbs: formatMap(actionVerbsMap),
                phrases: formatMap(phrasesMap),
            }
        });

    } catch (error) {
        console.error("Dashboard Overview API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

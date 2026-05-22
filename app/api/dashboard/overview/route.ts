import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import resumeAnalysisModel from "@/src/models/resumeAnalysis.model";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        // If user id is not found then return
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Connec to DB
        await connectToDatabase();

        // Fetching job & resume records
        const jobRecords = await JobRecord.find({ userId, status: "completed" }).lean();
        const resumeRecords = await resumeAnalysisModel.find({ userId, status: "completed" }).lean();

        const jobAnalysesCount = jobRecords.length;
        const resumeAnalysesCount = resumeRecords.length;
        const resumesBuiltCount = 0;
        const lettersWrittenCount = 0;

        // Constructing data from jobRecords for metrics
        const skillsMap: Record<string, number> = {};
        const softSkillsMap: Record<string, number> = {};
        const toolsMap: Record<string, number> = {};
        const actionVerbsMap: Record<string, number> = {};
        const phrasesMap: Record<string, number> = {};

        jobRecords.forEach((job: any) => {
            const res = job.result;
            if (!res) return;

            res.skills?.forEach((s: any) => {
                if (s.name) skillsMap[s.name] = (skillsMap[s.name] || 0) + s.count;
            });
            res.softSkills?.forEach((s: any) => {
                if (s.name) softSkillsMap[s.name] = (softSkillsMap[s.name] || 0) + s.count;
            });
            res.tools?.forEach((s: any) => {
                if (s.name) toolsMap[s.name] = (toolsMap[s.name] || 0) + s.count;
            });
            res.actionVerbs?.forEach((s: any) => {
                if (s.name) actionVerbsMap[s.name] = (actionVerbsMap[s.name] || 0) + s.count;
            });
            res.phrases?.forEach((s: any) => {
                if (s.name) phrasesMap[s.name] = (phrasesMap[s.name] || 0) + s.count;
            });
        });

        // Constructing data from resumeRecords for metrics
        const matchedKeywords: Record<string, number> = {};
        const missingKeywords: Record<string, number> = {};
        const overusedKeywords: Record<string, number> = {};
        const skillGaps: Record<string, number> = {};

        resumeRecords.map((resume: any) => {
            const res = resume.result;

            if (!res) return;

            res.keywordAnalysis.matchedKeywords.map((keyword: string) => {
                if (keyword.trim()) {
                    matchedKeywords[keyword] = (matchedKeywords[keyword] || 0) + 1;
                }
            });

            res.keywordAnalysis.missingKeywords.map((keyword: string) => {
                if (keyword.trim()) {
                    missingKeywords[keyword] = (missingKeywords[keyword] || 0) + 1; 1
                }
            });

            res.keywordAnalysis.overusedKeywords.map((keyword: string) => {
                if (keyword.trim()) {
                    overusedKeywords[keyword] = (overusedKeywords[keyword] || 0) + 1;
                }
            });

            res.improvementInsights.skillGapsToAddress.map((skill: string) => {
                if (skill.trim()) {
                    skillGaps[skill] = (skillGaps[skill] || 0) + 1;
                }
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
            },
            resumeAnalysisData: {
                matchedKeywords: formatMap(matchedKeywords),
                missingKeywords: formatMap(missingKeywords),
                overusedKeywords: formatMap(overusedKeywords),
                skillGaps: formatMap(skillGaps)
            }
        });

    } catch (error) {
        console.error("Dashboard Overview API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

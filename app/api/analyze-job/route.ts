import { connectToDatabase } from "@/src/database/mongodb";
import JobAnalysis from "@/src/models/jobAnalysis.model";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

function cleanAIResponse(text: string): string {
    // Remove markdown code blocks (```json, ```text, ```)
    let cleaned = text.trim();

    // Remove opening code block
    cleaned = cleaned.replace(/^```(?:json|text)?\n?/i, '');

    // Remove closing code block
    cleaned = cleaned.replace(/\n?```$/, '');

    return cleaned.trim();
}

export async function POST(req: NextRequest) {
    try {
        const { jobRole, jobDescription, userId } = await req.json();

        // Create a job record in database
        const newJobAnalysis = await JobAnalysis.create({
            
        });
        await connectToDatabase();

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const prompt = `
        You are an ATS Keyword Intelligence Engine. Analyze the given Job Role and Job Description and extract ATS-critical data. You have 20+ years of experience in ATS Keyword Intelligence. Make sure each section keywords remain unique. One section keywords should not be repeated in other sections.

        Job Role: "${jobRole}"
        Job Description: "${jobDescription}"
        
        PRIORITY SECTIONS (highest weight):
        Responsibilities, Additional Requirements, Skills, Preferred Skills, Experience, Experience Requirements, Education Requirements, Salary.

        1. GLOBAL COUNTING RULE (VERY IMPORTANT):
        EVERY keyword MUST be counted wherever it appears: As a standalone word, Inside any phrase. This applies to: Hard Skills, Soft Skills, Tools. Example: If “PSD to HTML” appears twice → PSD = 2, If “Figma to HTML” + later “Figma” → Figma = 2. ONLY Education and Salary are EXCLUDED from frequency counting.

        2. NO DUPLICATE MERGING RULE (VERY IMPORTANT):
        DO NOT merge similar keywords. Treat these as separate: React ≠ React.js ≠ ReactJS, jQuery ≠ JQuery, Next.js ≠ NextJS, Count each exactly as written.

        3. HARD SKILLS (VERY IMPORTANT):
        Programming languages, frameworks, libraries. Examples: HTML, CSS, JavaScript, React, Next.js. Count every occurrence using the GLOBAL COUNTING RULE.

        4. TOOLS (STRICTLY SOFTWARE ONLY) (VERY IMPORTANT):
        Design tools, platforms, services, databases, deployment tools. Examples: PSD, Figma, XD, Git, GitHub, Postman, MongoDB, Firebase, Supabase, Vercel, Docker, etc. NO languages or frameworks allowed here like "React" or "Next.js" type things which appears on hard skills. Count every occurrence using the GLOBAL COUNTING RULE.

        5. SOFT SKILLS (VERY IMPORTANT):
        Human traits only (communication, teamwork, patience, adaptability, self-motivation, problem-solving). No verbs allowed. Count every occurrence using the GLOBAL COUNTING RULE.

        6. PHRASES (VERY IMPORTANT):
        Multi-word technical concepts only. Examples: “Responsive Design”, “Cross-Browser Compatibility”, “PSD to HTML”, “Figma to HTML”, “REST API”. Extract only meaningful technical phrases. Count it.

        7. ACTION VERBS (VERY IMPORTANT):
        Must be true verbs only (develop, collaborate, improve, troubleshoot, solve, manage). No nouns or adjectives. Count it.

        8. SENIORITY:
        Infer from text only: Internship → “Intern / Entry-level”, 0–2 years → Junior, 3–5 → Mid, 5+ → Senior. Also mention in brackets the experience mentioned in job description if found. Like -> Junior (at least 2 years).

        9. EDUCATION:
        Copy exactly as written from the job description. NO counting.

        10. SALARY:
        Copy exactly as written if found. If missing → "Not specified". NO counting.

        OUTPUT RULES (VERY IMPORTANT):
        Return ONLY the JSON-like format below. NO explanations. NO backticks. NO extra text.

        FORMAT (VERY IMPORTANT):
        {
            "skills": [ {"name": "", "count": 0} ],
            "softSkills": [ {"name": "", "count": 0} ],
            "tools": [ {"name": "", "count": 0} ],
            "phrases": [ {"name": "", "count": 0} ],
            "actionVerbs": [ {"name": "", "count": 0} ],
            "seniorityLevels": [ "" ],
            "educationalRequirements": [ "" ],
            "salary": "USD 10000-20000"
        }
        `;

        const result = await model.generateContent(prompt);
        const response = cleanAIResponse(result.response.text());
        const parsedJSONData = JSON.parse(response);

        return NextResponse.json(parsedJSONData);
    } catch (e: any) {
        console.log("API Error: ", e);
        return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
    }
}
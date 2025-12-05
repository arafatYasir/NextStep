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
        const { jobRole, jobDescription } = await req.json();

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        You are an expert ATS (Applicant Tracking System) Optimization Specialist and Resume Strategist.
        Your goal is to analyze a job description and extract critical keywords that will help a candidate beat the ATS and rank higher.

        **INPUT:**
        - Job Role: "${jobRole}"
        - Job Description: "${jobDescription}"

        **TASK:**
        Analyze the provided job description and extract the following data points. Return the result in a STRICT JSON format.

        **EXTRACTION RULES:**

        1.  **Skills (Hard Skills):** Technical skills, core competencies, and domain-specific knowledge required for the role.
            *   *Example:* Python, Financial Analysis, SEO, Machine Learning.
            *   *Requirement:* Calculate the frequency of each skill in the text.

        2.  **Soft Skills:** Interpersonal skills, character traits, and working styles.
            *   *Example:* Communication, Leadership, Adaptability, Problem-solving.
            *   *Requirement:* Calculate the frequency of each soft skill.

        3.  **Tools & Technologies:** Specific software, hardware, platforms, or frameworks mentioned.
            *   *Example:* Jira, AWS, Excel, Salesforce, Docker.
            *   *Requirement:* Calculate the frequency of each tool.

        4.  **Phrases (Key Concepts):** Multi-word technical concepts, methodologies, or industry-standard terms that are crucial for the role.
            *   *Context:* These are not just single words but specific concepts like "Agile methodologies", "Kanban", "Scrum", "Git/Github workflows", "Server-side Rendering (SSR)", "reusable components", "CI/CD pipelines", "RESTful API design".
            *   *Requirement:* Extract the most relevant phrases.

        5.  **Action Verbs:** Strong verbs used in the job description that describe responsibilities.
            *   *Example:* Led, Developed, Managed, Optimized, Created.

        6.  **Seniority Levels:** Any mention of experience level or seniority.
            *   *Example:* Senior, Junior, Lead, 5+ years experience, Entry-level.

        7.  **Educational Requirements:** Degrees, certifications, or fields of study mentioned.
            *   *Example:* Bachelor's in Computer Science, MBA, PMP Certification.

        8.  **Salary:** Any salary range or compensation details mentioned. If none, return "Not specified".

        **OUTPUT FORMAT (JSON LIKE FORMAT BUT NOT REAL JSON, IT SHOULD BE TEXT NOT JSON BUT LOOKS LIKE JSON LIKE FORMAT AND THERE WILL BE NOTHING EXCEPT JSON LIKE FORMAT, NO EXPLANATIONS NO EXTRA LINES ANYTHING ELSE):**
        {
          "skills": [ {"name": "Skill Name", "count": 3}, ... ],
          "softSkills": [ {"name": "Soft Skill Name", "count": 2}, ... ],
          "tools": [ {"name": "Tool Name", "count": 5}, ... ],
          "phrases": ["Phrase 1", "Phrase 2", ...],
          "actionVerbs": ["Verb 1", "Verb 2", ...],
          "seniorityLevels": ["Level 1", ...],
          "educationalRequirements": ["Req 1", ...],
          "salary": "Salary details or 'Not specified'"
        }
        **FINALLY DON'T PUT ANYTHING LIKE THIS: any backtick or "backtick backtick backtick text" PLEASE DON'T DO THAT JUST THE JSON LIKE FORMAT
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
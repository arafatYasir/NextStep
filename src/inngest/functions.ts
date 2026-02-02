import { JOB_ANALYSIS_PROMPT } from "@/lib/prompts";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanAIResponse } from "../helpers/helpers";
import JobRecord from "../models/jobRecord.model";

// Analyze Job Description
export const analyzeJobDescription = inngest.createFunction(
    { id: "analyze/job-description" },
    { event: "analyze/job-description" },
    async ({ event, step }) => {
        const { jobId, jobRole, jobDescription } = event.data;

        try {
            // Creating AI instance
            const genAI = new GoogleGenerativeAI(process.env.JOB_ANALYSIS_AI_API_KEY!);

            // Choosing model
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

            // Generating dynamic prompt
            const prompt = JOB_ANALYSIS_PROMPT.replace("{jobRole}", jobRole).replace("{jobDescription}", jobDescription);

            // Generating response
            const result = await model.generateContent(prompt);

            // Cleaning response and parsing to json
            const response = cleanAIResponse(result.response.text());
            const parsedJSONData = JSON.parse(response);

            // Updating job record
            await JobRecord.findByIdAndUpdate(jobId, {
                status: "completed",
                result: parsedJSONData
            });
        } catch (e: any) {
            console.error("Failed to analyze job (Inngest Function)", e);

            await JobRecord.findByIdAndUpdate(jobId, {
                status: "failed"
            });
        }
    }
);
import { JOB_ANALYSIS_PROMPT } from "@/lib/prompts";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanAIResponse } from "../helpers/helpers";
import JobRecord from "../models/jobRecord.model";

// Analyze Job Description
export const analyzeJobDescription = inngest.createFunction(
    {
        id: "analyze/job-description",
        concurrency: {
            limit: 5
        },
        throttle: {
            limit: 10,
            period: "1m"
        }
    },
    { event: "analyze/job-description" },
    async ({ event, step }) => {
        const { jobId, jobRole, jobDescription } = event.data;

        try {
            // Create AI instance
            const genAI = new GoogleGenerativeAI(process.env.JOB_ANALYSIS_AI_API_KEY!);

            // Choose a model
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

            //  Generate AI analysis
            const parsedJSONData = await step.run("generate-ai-analysis", async () => {
                // Generate dynamic prompt
                const prompt = JOB_ANALYSIS_PROMPT.replace("{jobRole}", jobRole).replace("{jobDescription}", jobDescription);

                // Generate response
                const result = await model.generateContent(prompt);

                // Clean response and parse to json
                const response = cleanAIResponse(result.response.text());
                const parsedJSONData = JSON.parse(response);

                return parsedJSONData;
            });

            // Update job record
            await step.run("update-job-recod", async () => {
                await JobRecord.findByIdAndUpdate(jobId, {
                    status: "completed",
                    result: parsedJSONData
                });
            })
        } catch (e: any) {
            console.error("Failed to analyze job (Inngest Function)", e);

            await step.run("update-job-recod", async () => {
                await JobRecord.findByIdAndUpdate(jobId, {
                    status: "failed"
                });
            });
        }
    }
);
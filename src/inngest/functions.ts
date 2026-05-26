import { JOB_ANALYSIS_PROMPT, RESUME_ANALYSIS_PROMPT, RESUME_BUILDER_PROMPT } from "@/lib/prompts";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanAIResponse } from "../helpers/cleanAIResponse";
import JobRecord from "../models/jobRecord.model";
import { connectToDatabase } from "../database/mongodb";
import resumeAnalysisModel from "../models/resumeAnalysis.model";
import resumeModel from "../models/resume.model";

// Analyze Job Description
export const analyzeJobDescription = inngest.createFunction(
    {
        id: "analyze/job-description",
        triggers: [{ event: "analyze/job-description" }],
        concurrency: {
            limit: 5
        },
        throttle: {
            limit: 10,
            period: "1m"
        }
    },
    async ({ event, step }) => {
        const { jobId, jobRole, jobDescription } = event.data;

        try {
            // Connect to database
            await step.run("connect-database", async () => {
                await connectToDatabase();
            });

            // Create AI instance
            const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

            // Choose a model
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

            // Get parsed json data from AI
            const parsedJSONData = await step.run("generate-ai-analysis", async () => {
                // Generate dynamic prompt
                const prompt = JOB_ANALYSIS_PROMPT.replace("{jobRole}", jobRole).replace("{jobDescription}", jobDescription);

                // Generate response
                const result = await model.generateContent(prompt);

                // Clean response and parse to json
                const response = cleanAIResponse(result.response.text());
                const jsonData = JSON.parse(response);

                return jsonData;
            });

            // Update job record
            await step.run("update-job-record", async () => {
                await JobRecord.findByIdAndUpdate(jobId, {
                    result: parsedJSONData,
                    status: "completed"
                });
            })

        } catch (e: any) {
            console.error("Failed to analyze job (Inngest Function)", e);

            await step.run("update-job-record", async () => {
                await JobRecord.findByIdAndUpdate(jobId, {
                    status: "failed"
                });
            });
        }
    }
);

// Analyze Resume
export const analyzeResume = inngest.createFunction(
    {
        id: "analyze/resume",
        concurrency: {
            limit: 5
        },
        throttle: {
            limit: 10,
            period: "1m"
        },
        triggers: [{ event: "analyze/resume" }]
    },
    async ({ event, step }) => {
        const { resumeId, resumeText, jobTitle, jobDescription } = event.data;

        try {
            // Connect to database
            await step.run("connect-database", async () => {
                await connectToDatabase();
            });

            // Create AI instance
            const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

            // Choose a model
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

            // Get AI resume analysis
            const parsedJSONData = await step.run("generate-ai-analysis", async () => {
                // Generate dynamic prompt
                const prompt = RESUME_ANALYSIS_PROMPT.replace("{jobTitle}", jobTitle).replace("{jobDescription}", jobDescription).replace("{resumeText}", resumeText);

                // Generate response
                const result = await model.generateContent(prompt);

                // Clean response and parse to json
                const response = cleanAIResponse(result.response.text());
                const jsonData = JSON.parse(response);

                return jsonData;
            });

            // Update resume record
            await step.run("update-resume-record", async () => {
                await resumeAnalysisModel.findByIdAndUpdate(resumeId, {
                    result: parsedJSONData,
                    status: "completed"
                });
            });
        } catch (e: any) {
            console.error("Failed to analyze resume (Inngest Function)", e);

            await step.run("update-resume-record", async () => {
                await resumeAnalysisModel.findByIdAndUpdate(resumeId, {
                    status: "failed"
                });
            });
        }
    }
);

// Build Resume
export const buildResume = inngest.createFunction(
    {
        id: "build/resume",
        concurrency: {
            limit: 5
        },
        throttle: {
            limit: 10,
            period: "1m"
        },
        triggers: [{ event: "build/resume" }]
    },
    async ({ event, step }) => {
        const {
            resumeId,
            fullName,
            email,
            phone,
            location,
            github,
            linkedin,
            jobTitle,
            jobDescription
        } = event.data;

        try {
            // Connect to database
            await step.run("connect-database", async () => {
                await connectToDatabase();
            });

            // Create AI instance
            const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

            // Choose a model
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

            // Get AI resume content generation
            const parsedJSONData = await step.run("generate-resume-content", async () => {
                // Generate dynamic prompt
                const prompt = RESUME_BUILDER_PROMPT.replace("{fullName}", fullName).replace("{email}", email).replace("{phone}", phone).replace("{location}", location).replace("{github}", github).replace("{linkedin}", linkedin).replace("{jobTitle}", jobTitle).replace("{jobDescription}", jobDescription);

                // Generate response
                const result = await model.generateContent(prompt);

                // Clean response and parse to json
                const response = cleanAIResponse(result.response.text());
                const jsonData = JSON.parse(response);

                return jsonData;
            });

            // Update resume record
            await step.run("update-resume-record", async () => {
                await resumeModel.findByIdAndUpdate(resumeId, {
                    ...parsedJSONData,
                    status: "completed"
                })
            })

        } catch (e) {
            console.error("Failed to build resume (Inngest Function)", e);

            await step.run("update-resume-record", async () => {
                await resumeModel.findByIdAndUpdate(resumeId, {
                    status: "failed"
                });
            });
        }
    }
)
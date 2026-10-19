import { COVER_LETTER_WRITER_PROMPT, JOB_ANALYSIS_PROMPT, RESUME_ANALYSIS_PROMPT, RESUME_BUILDER_PROMPT_1, RESUME_BUILDER_PROMPT_2 } from "@/lib/prompts";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanAIResponse } from "../helpers/helperFunctions";
import JobRecord from "../models/jobRecord.model";
import { connectToDatabase } from "../database/mongodb";
import resumeAnalysisModel from "../models/resumeAnalysis.model";
import resumeModel from "../models/resume.model";
import CoverLetter from "../models/coverLetter.model";
import { coverLetterPdfKey, resumePdfKey } from "../helpers/pdf/key";
import { generateAndStoreLetterPdf, generateAndStoreResumePdf } from "../helpers/pdf/generatePdfAndStore";

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
            const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

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

        } catch (e) {
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
            const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

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
        } catch (e) {
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
            jobTitle,
            jobDescription,
            resumeType,
            experiences,
            projects
        } = event.data;

        try {
            // Connect to database
            await step.run("connect-database", async () => {
                await connectToDatabase();
            });

            // Create AI instance
            const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

            // Choose a model
            const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

            // Generate summary and skills sections of the resume
            const resumeJSONData1 = await step.run("generate-resume-content-1", async () => {
                // Generate dynamic prompt
                const prompt = RESUME_BUILDER_PROMPT_1.replace("{jobTitle}", jobTitle).replace("{jobDescription}", jobDescription);

                // Generate response
                const result = await model.generateContent(prompt);

                // Clean response and parse to jsonData
                const response = cleanAIResponse(result.response.text());
                const jsonData = JSON.parse(response);

                return jsonData;
            });

            // Generate experience, projects & education sections of resume
            const resumeJSONData2 = await step.run("generate-resume-content-2", async () => {
                // Generate dynamic prompt
                const prompt = RESUME_BUILDER_PROMPT_2.replace("{jobDescription}", jobDescription).replace("{resumeType}", resumeType).replace("{experiences}", JSON.stringify(experiences)).replace("{projects}", JSON.stringify(projects));

                // Generate response
                const result = await model.generateContent(prompt);

                // Clean response and parse to jsonData
                const response = cleanAIResponse(result.response.text());
                const jsonData = JSON.parse(response);

                return jsonData;
            })

            // Update resume record
            await step.run("update-resume-record", async () => {
                await resumeModel.findByIdAndUpdate(resumeId, {
                    ...resumeJSONData1,
                    ...resumeJSONData2,
                    status: "completed"
                })
            });

            // Send an event to start pdf generation in the background
            try {
                await step.sendEvent("trigger-pdf-generation", {
                    name: "pdf/resume.generate",
                    data: { resumeId }
                });
            } catch (e) {
                console.error("Failed to queue resume PDF generation", e);
            }

        } catch (e) {
            console.error("Failed to build resume (Inngest Function)", e);

            await step.run("update-resume-record", async () => {
                await resumeModel.findByIdAndUpdate(resumeId, {
                    status: "failed"
                });
            });
        }
    }
);

// Generate Cover Letter
export const generateCoverLetter = inngest.createFunction(
    {
        id: "generate/cover-letter",
        concurrency: {
            limit: 5,
        },
        throttle: {
            limit: 10,
            period: "1m",
        },
        triggers: [{ event: "generate/cover-letter" }],
    },
    async ({ event, step }) => {
        const {
            coverLetterId,
            name,
            jobTitle,
            jobDescription,
            companyName,
            hiringManagerName,
            letterTone,
            letterType,
        } = event.data;

        try {
            // 1. Connect to DB
            await step.run("connect-database", async () => {
                await connectToDatabase();
            });

            // 2. Init Gemini
            const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

            const model = genAI.getGenerativeModel({
                model: "gemini-3.1-flash-lite",
            });

            // 3. Generate Cover Letter using AI
            const generatedCoverLetter = await step.run(
                "generate-cover-letter",
                async () => {
                    const prompt = COVER_LETTER_WRITER_PROMPT
                        .replace("{name}", name)
                        .replace("{jobTitle}", jobTitle)
                        .replace("{jobDescription}", jobDescription)
                        .replace("{companyName}", companyName)
                        .replace("{hiringManagerName}", hiringManagerName)
                        .replace("{letterType}", letterType)
                        .replace("{letterTone}", letterTone);

                    const result = await model.generateContent(prompt);

                    const responseText = cleanAIResponse(result.response.text());

                    const jsonData = JSON.parse(responseText);

                    return jsonData;
                }
            );

            // 4. Update DB with success
            await step.run("update-cover-letter-success", async () => {
                await CoverLetter.findByIdAndUpdate(coverLetterId, {
                    coverLetter: generatedCoverLetter.coverLetter,
                    status: "completed",
                });
            });

            // 5. Send an event to start pdf generation in the background
            try {
                await step.sendEvent("trigger-pdf-generation", {
                    name: "pdf/letter.generate",
                    data: { coverLetterId }
                });
            } catch (e) {
                console.error("Failed to queue cover letter PDF generation", e);
            }
        } catch (error) {
            console.error("Cover Letter Generation Failed (Inngest)", error);

            // 6. Mark as failed
            await step.run("update-cover-letter-failed", async () => {
                await CoverLetter.findByIdAndUpdate(coverLetterId, {
                    status: "failed",
                });
            });
        }
    }
);

// Generate Resume PDF and Store
export const generateResumePdf = inngest.createFunction(
    {
        id: "generate/resume-pdf",
        concurrency: { limit: 3 },
        retries: 2,
        triggers: [{ event: "pdf/resume.generate" }]
    },
    async ({ event, step }) => {
        const { resumeId } = event.data;

        return step.run("render-and-store", async () => {
            // Find the resume from database
            await connectToDatabase();

            const resume = await resumeModel.findById(resumeId).lean();
            if (!resume) return { skipped: "not-found" };

            // Create an unique key according to resume contents
            const key = resumePdfKey(String(resume.userId), String(resume._id), resume);

            // Already generated key for this content
            if (resume.pdfKey === key) {
                return { key, cached: true };
            }

            await generateAndStoreResumePdf(resume, key);

            return { key, cached: false };
        })
    }
);

// Generate Cover Letter PDF and Store
export const generateLetterPdf = inngest.createFunction(
    {
        id: "generate/letter-pdf",
        concurrency: { limit: 3 },
        retries: 2,
        triggers: [{ event: "pdf/letter.generate" }]
    },
    async ({ event, step }) => {
        const { coverLetterId } = event.data;

        return step.run("render-and-store", async () => {
            // Find the cover lette from database
            await connectToDatabase();

            const coverLetter = await CoverLetter.findById(coverLetterId).lean();

            if (!coverLetter) return { skipped: "not-found" };

            // Create an unique key according to cover letter contents
            const key = coverLetterPdfKey(String(coverLetter.userId), String(coverLetter._id), coverLetter);

            // Already generated key for this content
            if (coverLetter.pdfKey === key) {
                return { key, cached: true };
            }

            await generateAndStoreLetterPdf(coverLetter, key);

            return { key, cached: false };
        });
    }
);
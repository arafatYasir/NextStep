import mongoose from "mongoose";

const resumeAnalysisModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    jobDescription: {
        type: String,
        required: true,
        trim: true,
    },
    resumeFileName: {
        type: String,
        required: true,
    },
    resumeFileType: {
        type: String,
        required: true,
    },
    resumeFileSize: {
        type: Number,
        required: true,
    },
    result: {
        atsScore: {
            type: Number,
            min: 0,
            max: 100
        },

        scoreBreakdown: {
            skillsMatch: { type: Number, min: 0, max: 100 },
            experienceMatch: { type: Number, min: 0, max: 100 },
            educationMatch: { type: Number, min: 0, max: 100 },
            keywordMatch: { type: Number, min: 0, max: 100 },
            formattingScore: { type: Number, min: 0, max: 100 },
        },

        matchInsights: {
            strongMatches: { type: [String], default: [] },
            partialMatches: { type: [String], default: [] },
            missingCriticalSkills: { type: [String], default: [] },
            weakActionVerbs: { type: [String], default: [] }
        },

        improvementInsights: {
            priorityFixes: { type: [String], default: [] },
            skillGapsToAddress: { type: [String], default: [] },
            resumeSectionAdvice: [
                {
                    section: {
                        type: String
                    },
                    advice: {
                        type: String
                    }
                }
            ]
        },

        metaAnalysis: {
            resumeTone: {
                type: String,
                enum: ["too passive", "balanced", "too generic"]
            },
            atsReadability: {
                type: String,
                enum: ["poor", "average", "good", "excellent"]
            },
            confidenceLevel: {
                type: String,
                enum: ["low", "medium", "high"]
            },
        },
    },

    status: {
        type: String,
        required: true,
        enum: ["queued", "completed", "failed"],
        default: "queued",
    },
}, { timestamps: true });

export default mongoose.models.ResumeAnalysis || mongoose.model("ResumeAnalysis", resumeAnalysisModel);
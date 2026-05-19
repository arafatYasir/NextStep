import mongoose from "mongoose";

const partialMatchSchema = new mongoose.Schema(
    {
        requirement: {
            type: String,
            required: true,
            trim: true,
        },
        reason: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const priorityFixSchema = new mongoose.Schema(
    {
        issue: {
            type: String,
            required: true,
            trim: true,
        },
        impact: {
            type: String,
            enum: ["high", "medium", "low"],
            required: true,
        },
        fix: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const resumeSectionAdviceSchema = new mongoose.Schema(
    {
        section: {
            type: String,
            required: true,
            trim: true,
        },
        advice: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const resumeAnalysisSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
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
            trim: true,
        },

        resumeFileType: {
            type: String,
            required: true,
            trim: true,
        },

        resumeFileSize: {
            type: Number,
            required: true,
            min: 0,
        },

        result: {
            atsScore: {
                type: Number,
                required: true,
                min: 0,
                max: 100,
            },

            scoreBreakdown: {
                skillsMatch: {
                    type: Number,
                    min: 0,
                    max: 100,
                    required: true,
                },

                experienceMatch: {
                    type: Number,
                    min: 0,
                    max: 100,
                    required: true,
                },

                educationMatch: {
                    type: Number,
                    min: 0,
                    max: 100,
                    default: null,
                },

                keywordMatch: {
                    type: Number,
                    min: 0,
                    max: 100,
                    required: true,
                },

                formattingScore: {
                    type: Number,
                    min: 0,
                    max: 100,
                    required: true,
                },
            },

            keywordAnalysis: {
                matchedKeywords: {
                    type: [String],
                    default: [],
                },

                missingKeywords: {
                    type: [String],
                    default: [],
                },

                overusedKeywords: {
                    type: [String],
                    default: [],
                },
            },

            matchInsights: {
                strongMatches: {
                    type: [String],
                    default: [],
                },

                partialMatches: {
                    type: [partialMatchSchema],
                    default: [],
                },

                missingCriticalSkills: {
                    type: [String],
                    default: [],
                },

                weakActionVerbs: {
                    type: [String],
                    default: [],
                },
            },

            improvementInsights: {
                priorityFixes: {
                    type: [priorityFixSchema],
                    default: [],
                },

                skillGapsToAddress: {
                    type: [String],
                    default: [],
                },

                resumeSectionAdvice: {
                    type: [resumeSectionAdviceSchema],
                    default: [],
                },
            },

            sectionScores: {
                summary: {
                    type: Number,
                    min: 0,
                    max: 100,
                    default: 0,
                },

                experience: {
                    type: Number,
                    min: 0,
                    max: 100,
                    default: 0,
                },

                projects: {
                    type: Number,
                    min: 0,
                    max: 100,
                    default: 0,
                },

                skills: {
                    type: Number,
                    min: 0,
                    max: 100,
                    default: 0,
                },

                education: {
                    type: Number,
                    min: 0,
                    max: 100,
                    default: 0,
                },
            },

            formattingAnalysis: {
                score: {
                    type: Number,
                    min: 0,
                    max: 100,
                    required: true,
                },

                issues: {
                    type: [String],
                    default: [],
                },
            },

            metaAnalysis: {
                resumeTone: {
                    type: String,
                    enum: ["too passive", "balanced", "too generic"],
                    required: true,
                },

                atsReadability: {
                    type: String,
                    enum: ["poor", "average", "good", "excellent"],
                    required: true,
                },

                confidenceLevel: {
                    type: String,
                    enum: ["low", "medium", "high"],
                    required: true,
                },
            },
        },

        status: {
            type: String,
            enum: ["queued", "processing", "completed", "failed"],
            default: "queued",
            index: true,
        },

        errorMessage: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.ResumeAnalysis ||
    mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
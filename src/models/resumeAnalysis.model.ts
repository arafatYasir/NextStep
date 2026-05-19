import mongoose from "mongoose";

const strongMatchSchema = new mongoose.Schema(
    {
        requirement: {
            type: String,
            required: true,
            trim: true
        },
        reason: {
            type: String,
            required: true,
            trim: true
        }
    }
)

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
            enum: ["High", "Medium", "Low"],
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
                min: 0,
                max: 100,
            },

            scoreBreakdown: {
                skillsMatch: {
                    type: Number,
                    min: 0,
                    max: 100,
                },

                experienceMatch: {
                    type: Number,
                    min: 0,
                    max: 100,
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
                },

                formattingScore: {
                    type: Number,
                    min: 0,
                    max: 100,
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
                    type: [strongMatchSchema],
                    default: [],
                },

                partialMatches: {
                    type: [partialMatchSchema],
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
                issues: {
                    type: [String],
                    default: [],
                },
            },

            metaAnalysis: {
                resumeTone: {
                    type: String,
                    enum: ["Too Passive", "Balanced", "Too Generic"],
                },

                atsReadability: {
                    type: String,
                    enum: ["Poor", "Average", "Good", "Excellent"],
                },

                confidenceLevel: {
                    type: String,
                    enum: ["Low", "Medium", "High"],
                },
            },
        },

        status: {
            type: String,
            enum: ["queued", "completed", "failed"],
            default: "queued",
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.ResumeAnalysis ||
    mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
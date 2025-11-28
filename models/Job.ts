import mongoose, { Schema, Model, Document } from "mongoose";

export interface IKeyword extends Document {
    jobRole: string;
    hardSkills: string[];
    softSkills: string[];
    processKeywords: string[];
    actionVerbs: string[];
    domainKeywords: string[];
    tools: string[];
    senioritySignals: string[];
}

const JobSchema: Schema<IKeyword> = new Schema(
    {
        jobRole: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true,
        },

        hardSkills: {
            type: [String],
            default: [],
        },
        softSkills: {
            type: [String],
            default: [],
        },
        processKeywords: {
            type: [String],
            default: [],
        },
        actionVerbs: {
            type: [String],
            default: [],
        },
        domainKeywords: {
            type: [String],
            default: [],
        },
        tools: {
            type: [String],
            default: [],
        },
        senioritySignals: {
            type: [String],
            default: [],
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Keyword: Model<IKeyword> = mongoose.models.Keyword || mongoose.model<IKeyword>("Keyword", JobSchema);
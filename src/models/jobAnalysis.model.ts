import mongoose from "mongoose";

export const jobAnalysisSchema = new mongoose.Schema({  
    skills: [
        {
            name: {
                type: String,
                trim: true
            },
            count: {
                type: Number,
            }
        },
    ],
    softSkills: [
        {
            name: {
                type: String,
                trim: true
            },
            count: {
                type: Number,
            }
        }
    ],
    tools: [
        {
            name: {
                type: String,
                trim: true
            },
            count: {
                type: Number,
            }
        }
    ],
    phrases: [
        {
            name: {
                type: String,
                trim: true
            },
            count: {
                type: Number,
            }
        }
    ],
    actionVerbs: [
        {
            name: {
                type: String,
                trim: true
            },
            count: {
                type: Number,
            }
        }
    ],
    seniorityLevels: [
        {
            type: String,
            trim: true
        }
    ],
    educationalRequirements: [
        {
            type: String,
            trim: true
        }
    ],
    salary: {
        type: String,
        trim: true,
    }
});

const JobAnalysis = mongoose.models.JobAnalysis || mongoose.model("JobAnalysis", jobAnalysisSchema);

export default JobAnalysis;
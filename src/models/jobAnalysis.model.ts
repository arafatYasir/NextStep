import mongoose from "mongoose";

const jobAnalysisSchema = new mongoose.Schema({  
    skills: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            count: {
                type: Number,
                required: true
            }
        },
    ],
    softSkills: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    tools: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    phrases: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    actionVerbs: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    seniorityLevels: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
    educationalRequirements: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            }
        }
    ],
    salary: {
        type: String,
        required: true,
        trim: true,
    }
});

const JobAnalysis = mongoose.model("JobAnalysis", jobAnalysisSchema);

export default JobAnalysis;
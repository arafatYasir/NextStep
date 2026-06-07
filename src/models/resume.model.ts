import mongoose from "mongoose";

const Resume = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    personalInfo: {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        github: {
            type: String,
            required: true,
            trim: true,
        },
        linkedin: {
            type: String,
            required: true,
            trim: true,
        }
    },
    summary: {
        type: String,
        trim: true,
    },
    resumeTitle: {
        type: String,
        trim: true,
    },
    skills: {
        languages: [String],
        frameworksAndLibraries: [String],
        toolsAndPlatforms: [String],
        softSkills: [String]
    },
    experience: [
        {
            jobTitle: {
                type: String,
                required: true,
                trim: true,
            },
            company: {
                type: String,
                required: true,
                trim: true,
            },
            duration: {
                type: String,
                required: true,
                trim: true,
            },
            responsibilities: {
                type: [String],
                trim: true,
            }
        }
    ],
    projects: [
        {
            projectName: {
                type: String,
                required: true,
                trim: true,
            },
            techStack: {
                type: [String],
                required: true,
            },
            highlights: {
                type: [String],
                required: true,
            },
            link: {
                type: String,
                required: true,
                trim: true,
            }
        }
    ],
    education: [
        {
            degree: {
                type: String,
                required: true,
                trim: true,
            },
            institution: {
                type: String,
                required: true,
                trim: true,
            },
            duration: {
                type: String,
                required: true,
                trim: true,
            }
        }
    ],
    status: {
        type: String,
        enum: ["queued", "completed", "failed"],
        default: "queued"
    }
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model("Resume", Resume);
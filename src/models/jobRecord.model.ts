import mongoose from "mongoose";

const jobRecordSchema = new mongoose.Schema({
    jobRole: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
    result: {
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
    },
    status: {
        type: String,
        enum: ["queued", "completed", "failed"],
        default: "queued"
    }
}, { timestamps: true });

const JobRecord = mongoose.models.JobRecord || mongoose.model("JobRecord", jobRecordSchema);

export default JobRecord;
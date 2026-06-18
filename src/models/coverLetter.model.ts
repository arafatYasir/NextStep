import mongoose, { Schema } from "mongoose";

const coverLetterSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true
        },
        jobTitle: {
            type: String,
            required: true,
            trim: true
        },
        companyName: {
            type: String,
            required: true,
            trim: true
        },
        hiringManagerName: {
            type: String,
            default: ""
        },
        coverLetter: {
            greeting: {
                type: String,
                trim: true,
            },
            opening: {
                type: String,
                trim: true,
            },
            paragraphs: {
                type: [String]
            },
            closing: {
                type: String,
                trim: true,
            },
            signature: {
                type: String,
                trim: true,
            },
        },
        letterTone: {
            type: String,
            enum: ["Professional", "Enthusiastic", "Confident", "Friendly", "Formal"],
            default: "Professional"
        },
        letterType: {
            type: String,
            enum: ["Experienced", "Fresher"],
            default: "Experienced"
        },
        status: {
            type: String,
            enum: ["queued", "completed", "failed"],
            default: "queued"
        }
    },
    { timestamps: true }
);

const CoverLetter = mongoose.models.CoverLetter || mongoose.model("CoverLetter", coverLetterSchema);

export default CoverLetter;
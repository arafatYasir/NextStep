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
            type: String,
            required: true,
            trim: true
        },
        letterTone: {
            type: String,
            enum: ["Professional", "Enthusiastic", "Confident", "Friendly", "Formal"],
            default: "Professional"
        }
    },
    { timestamps: true }
);

const CoverLetter = mongoose.models.CoverLetter || mongoose.model("CoverLetter", coverLetterSchema);

export default CoverLetter;
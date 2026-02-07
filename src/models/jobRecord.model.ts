import mongoose from "mongoose";
import { jobAnalysisSchema } from "./jobAnalysis.model";

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
    status: {
        type: String,
        enum: ["queued", "completed", "failed"],
        default: "queued"
    },
    result: {
        type: jobAnalysisSchema,
        default: null
    }
}, { timestamps: true });

const JobRecord = mongoose.models.JobRecord || mongoose.model("JobRecord", jobRecordSchema);

export default JobRecord;
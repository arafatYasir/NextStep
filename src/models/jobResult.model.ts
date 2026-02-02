import mongoose from "mongoose";

const jobResultSchema = new mongoose.Schema({
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
}, { timestamps: true });

const JobResult = mongoose.model("JobResult", jobResultSchema);

export default JobResult;
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
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    status: {
        type: String,
        enum: ["queued", "completed", "failed"],
        default: "queued"
    }
}, { timestamps: true });

const JobRecord = mongoose.models.JobRecord || mongoose.model("JobRecord", jobRecordSchema);

export default JobRecord;
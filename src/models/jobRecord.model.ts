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
    status: {
        type: String,
        enum: ["queued", "completed", "failed"],
        default: "queued"
    },
    result: {
        type: Object,
        default: null
    }
}, { timestamps: true });

const JobRecord = mongoose.models.JobRecord || mongoose.model("JobRecord", jobRecordSchema);

export default JobRecord;
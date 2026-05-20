import { connectToDatabase } from "../database/mongodb";
import JobRecord from "../models/jobRecord.model";
import resumeAnalysisModel from "../models/resumeAnalysis.model";

async function getJobData(id: string) {
    try {
        await connectToDatabase();
        const record = await JobRecord.findById(id);
        return JSON.parse(JSON.stringify(record));
    }
    catch (e) {
        console.error("Failed to get job data: ", e);
        return null;
    }
}

async function getResumeData(id: string) {
    try {
        await connectToDatabase();
        const record = await resumeAnalysisModel.findById(id);
        return JSON.parse(JSON.stringify(record));
    }
    catch (e) {
        console.error("Failed to get job data: ", e);
        return null;
    }
}

export { getJobData, getResumeData };
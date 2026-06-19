import { connectToDatabase } from "../database/mongodb";
import CoverLetter from "../models/coverLetter.model";
import JobRecord from "../models/jobRecord.model";
import resumeModel from "../models/resume.model";
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

async function getResumeAnalysisData(id: string) {
    try {
        await connectToDatabase();
        const record = await resumeAnalysisModel.findById(id);
        return JSON.parse(JSON.stringify(record));
    }
    catch (e) {
        console.error("Failed to get resume analysis data: ", e);
        return null;
    }
}

async function getResumeData(id: string) {
    try {
        await connectToDatabase();
        const record = await resumeModel.findById(id);
        return JSON.parse(JSON.stringify(record));
    }
    catch (e) {
        console.error("Failed to get resume data: ", e);
        return null;
    }
}

export async function getCoverLetterData(id: string) {
    try {
        await connectToDatabase();
        const record = await CoverLetter.findById(id);
        return JSON.parse(JSON.stringify(record));
    } catch (e) {
        console.error("Failed to get cover letter data: ", e);
        return null;
    }
}


export { getJobData, getResumeAnalysisData, getResumeData };
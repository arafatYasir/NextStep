import { connectToDatabase } from "../database/mongodb";
import JobRecord from "../models/jobRecord.model";

async function getJobData(id: string) {
    try {
        await connectToDatabase();
        const record = await JobRecord.findById(id).lean();
        return record;
    }
    catch (e) {
        console.error("Failed to get job data: ", e);
        return null;
    }
}

export { getJobData };
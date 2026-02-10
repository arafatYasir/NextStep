import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        connectToDatabase();

        await JobRecord.findByIdAndDelete(id);

        return NextResponse.json({ message: "Job record deleted successfully.", status: "OK" }, { status: 200 });
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Failed to delete job record.", status: "ERROR" }, { status: 500 });
    }
}
import { connectToDatabase } from "@/src/database/mongodb";
import JobRecord from "@/src/models/jobRecord.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        connectToDatabase();

        await JobRecord.findByIdAndDelete(id);

        return NextResponse.json({ message: "Job record deleted successfully.", status: "OK" }, { status: 200 });
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Failed to delete job record.", status: "ERROR" }, { status: 500 });
    }
}
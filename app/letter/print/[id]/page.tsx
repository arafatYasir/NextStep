import CoverLetterView from "@/components/analysis/cover-letter/CoverLetterView";
import { connectToDatabase } from "@/src/database/mongodb";
import { requireAuth } from "@/src/helpers/requireAuth";
import { mongodbIDRegex } from "@/src/helpers/validation";
import CoverLetter from "@/src/models/coverLetter.model";
import { redirect } from "next/navigation";

const PrintLetter = async ({ params }: { params: Promise<{ id: string }> }) => {
    // Get the cover letter id
    const { id } = await params;

    // Check user authentication
    const auth = await requireAuth();
    if (auth.unauthorized) redirect("/");

    if (!mongodbIDRegex.test(id)) {
        redirect("/");
    }

    // Fetch the cover letter from database
    await connectToDatabase();
    const coverLetter = await CoverLetter.findOne({
        _id: id,
        userId: auth.user.id
    }).lean();

    if (!coverLetter) redirect("/");

    return (
        <CoverLetterView result={coverLetter} isPrintMode={true} />
    )
}

export default PrintLetter
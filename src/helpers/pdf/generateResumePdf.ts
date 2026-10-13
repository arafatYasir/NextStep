import resumeModel from "@/src/models/resume.model";
import { ResumeData } from "@/types/global";
import { renderPdf } from "./browser";
import { buildResumeHtml } from "./resumeHtml";
import { pdfStore } from "./store";

export async function generateAndStoreResumePdf(resume: ResumeData, key: string): Promise<Uint8Array> {
    const bytes = await renderPdf(buildResumeHtml(resume));
    await pdfStore.put(key, bytes);

    await resumeModel.updateOne(
        { _id: resume._id },
        { $set: { pdfKey: key } },
        { timestamps: false }
    );

    // Remove the previous version if new key and previous key mismatch
    if (resume.pdfKey && resume.pdfKey !== key) {
        await pdfStore.delete(resume.pdfKey).catch(() => {});
    }
    return bytes;
}
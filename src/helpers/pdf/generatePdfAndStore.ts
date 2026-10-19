import resumeModel from "@/src/models/resume.model";
import { CoverLetter, ResumeData } from "@/types/global";
import { renderPdf } from "./browser";
import { buildLetterHtml, buildResumeHtml } from "./dataToHtml";
import { pdfStore } from "./store";
import CoverLetterModel from "@/src/models/coverLetter.model";

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
        await pdfStore.delete(resume.pdfKey).catch(() => { });
    }
    return bytes;
}

export async function generateAndStoreLetterPdf(coverLetter: CoverLetter, key: string): Promise<Uint8Array> {
    const bytes = await renderPdf(buildLetterHtml(coverLetter));
    await pdfStore.put(key, bytes);

    await CoverLetterModel.updateOne(
        { _id: coverLetter._id },
        { $set: { pdfKey: key } },
        { timestamps: false }
    );

    // Remove the previous version if new key and previous key mismatch
    if (coverLetter.pdfKey && coverLetter.pdfKey !== key) {
        await pdfStore.delete(coverLetter.pdfKey).catch(() => { });
    }
    return bytes;
}
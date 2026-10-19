import { serve } from "inngest/next";
import { inngest } from "@/src/inngest/client";
import { analyzeJobDescription, analyzeResume, buildResume, generateCoverLetter, generateLetterPdf, generateResumePdf } from "@/src/inngest/functions";

export const maxDuration = 60;

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [analyzeJobDescription, analyzeResume, buildResume, generateCoverLetter, generateResumePdf, generateLetterPdf]
});
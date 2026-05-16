import { serve } from "inngest/next";
import { inngest } from "../../../src/inngest/client";
import { analyzeJobDescription, analyzeResume } from "@/src/inngest/functions";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        analyzeJobDescription,
        analyzeResume
    ],
});
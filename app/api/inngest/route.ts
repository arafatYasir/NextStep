import { serve } from "inngest/next";
import { inngest } from "../../../src/inngest/client";
import { analyzeJobDescription } from "@/src/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        analyzeJobDescription
    ],
});
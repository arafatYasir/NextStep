import { serve } from "inngest/next";
import { inngest } from "../../../src/inngest/client";
import { helloWorld } from "@/src/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        helloWorld
    ],
});
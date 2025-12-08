const { GoogleGenerativeAI } = require("@google/generative-ai");

// Try to load env from .env.local if not in process
// reliable way to get env vars in dev environment without dotenv package
const fs = require('fs');
const path = require('path');

function getEnv() {
    try {
        const envPath = path.join(__dirname, '.env.local');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            const lines = content.split('\n');
            for (const line of lines) {
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    const value = match[2].trim().replace(/^["']|["']$/g, '');
                    if (!process.env[key]) {
                        process.env[key] = value;
                    }
                }
            }
        }
    } catch (e) {
        console.error("Could not read .env.local", e);
    }
}

getEnv();

async function listModels() {
    if (!process.env.AI_API_KEY) {
        console.error("AI_API_KEY not found in environment or .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

    try {
        // There is no direct listModels on genAI instance in some versions, 
        // but let's check if we can just try a simple prompt with 1.5-flash
        // Actually, the model listing is usually via a separate ModelService or just by trying.
        // Let's try 1.5-flash specifically.

        console.log("Testing gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Test");
        console.log("gemini-1.5-flash Response:", result.response.text());
        console.log("SUCCESS: gemini-1.5-flash works.");
    } catch (e) {
        console.error("gemini-1.5-flash ERROR:", e.message);
    }

    try {
        console.log("Testing gemini-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Test");
        console.log("gemini-pro Response:", result.response.text());
        console.log("SUCCESS: gemini-pro works.");
    } catch (e) {
        console.error("gemini-pro ERROR:", e.message);
    }
}

listModels();

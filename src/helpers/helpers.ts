import fs from "fs";
import PdfParse from "pdf-parse";
import mammoth from "mammoth";

export function cleanAIResponse(text: string): string {
    // Remove markdown code blocks (```json, ```text, ```)
    let cleaned = text.trim();

    // Remove opening code block
    cleaned = cleaned.replace(/^```(?:json|text)?\n?/i, '');

    // Remove closing code block
    cleaned = cleaned.replace(/\n?```$/, '');

    return cleaned.trim();
}

export async function extractTextFromFile(filePath: string, mimeType: string) {
    if(mimeType === "application/pdf") {
        const buffer = fs.readFileSync(filePath);
        const data = await PdfParse(buffer);

        return data.text;
    }
    else if(mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const data = await mammoth.extractRawText({ path: filePath });

        return data.value;
    }
    else {
        throw new Error(`Unsupported file type: ${mimeType}`);
    }
}
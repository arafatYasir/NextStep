import { PDFParse } from 'pdf-parse';
import mammoth from "mammoth"

export function cleanAIResponse(text: string): string {
    // Remove markdown code blocks (```json, ```text, ```)
    let cleaned = text.trim();

    // Remove opening code block
    cleaned = cleaned.replace(/^```(?:json|text)?\n?/i, '');

    // Remove closing code block
    cleaned = cleaned.replace(/\n?```$/, '');

    return cleaned.trim();
}

// export async function extractTextFromFile(file: File): Promise<string> {
//     const buffer = Buffer.from(await file.arrayBuffer());

//     // Extracting for PDF
//     if (file.type === "application/pdf") {
//         const parser = new PDFParse({ data: buffer });
//         const result = await parser.getText();

//         return result.text;
//     }

//     // Extracting for DOCX
//     if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
//         const result = await mammoth.extractRawText({ buffer });

//         return result.value;
//     }

//     throw new Error(`Unsupported file type: ${file.type}`);
// }
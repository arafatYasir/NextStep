import { extractText, getDocumentProxy } from "unpdf";
import mammoth from "mammoth";

export async function extractTextFromFile(file: File): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());

    // Extracting for PDF
    if (file.type === "application/pdf") {
        // Load the PDF document
        const pdf = await getDocumentProxy(new Uint8Array(buffer));

        // Extract the text into a single merged string
        const { text } = await extractText(pdf, { mergePages: true });

        return text;
    }

    // Extracting for DOCX
    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const result = await mammoth.extractRawText({ buffer });

        return result.value;
    }

    throw new Error(`Unsupported file type: ${file.type}`);
}

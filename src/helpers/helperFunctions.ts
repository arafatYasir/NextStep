import { CoverLetter } from "@/types/global";

export function cleanAIResponse(text: string): string {
    // Remove markdown code blocks (```json, ```text, ```)
    let cleaned = text.trim();

    // Remove opening code block
    cleaned = cleaned.replace(/^```(?:json|text)?\n?/i, '');

    // Remove closing code block
    cleaned = cleaned.replace(/\n?```$/, '');

    return cleaned.trim();
}

export function generateLetterCopyContent(letter: CoverLetter): string {
    const { coverLetter: { greeting, opening, paragraphs, closing, signature }, createdAt, companyName } = letter;

    const sections: string[] = [];

    const date = new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    sections.push(date);
    sections.push(`Hiring Manager\n${companyName}`);

    if (greeting?.trim()) sections.push(greeting.trim());
    if (opening?.trim()) sections.push(opening.trim());

    paragraphs?.forEach((paragraph) => {
        if (paragraph?.trim()) sections.push(paragraph.trim());
    });

    if (closing?.trim()) sections.push(closing.trim());
    if (signature?.trim()) sections.push(`Sincerely,\n${signature.trim()}`);

    return sections.join("\n\n");
}
import { readFileSync } from "node:fs";
import path from "node:path";

interface FontFile {
    family: string;
    weight: number;
    file: string
}

const FONT_FILES: FontFile[] = [
    { family: "Inter", weight: 400, file: "inter-latin-400-normal.woff2" },
    { family: "Inter", weight: 500, file: "inter-latin-500-normal.woff2" },
    { family: "Inter", weight: 600, file: "inter-latin-600-normal.woff2" },
    { family: "Inter", weight: 700, file: "inter-latin-700-normal.woff2" },
    { family: "Inter", weight: 800, file: "inter-latin-800-normal.woff2" },
    { family: "Inter", weight: 900, file: "inter-latin-900-normal.woff2" },
    { family: "Plus Jakarta Sans", weight: 400, file: "plus-jakarta-sans-latin-400-normal.woff2" },
    { family: "Plus Jakarta Sans", weight: 500, file: "plus-jakarta-sans-latin-500-normal.woff2" },
    { family: "Plus Jakarta Sans", weight: 600, file: "plus-jakarta-sans-latin-600-normal.woff2" },
    { family: "Plus Jakarta Sans", weight: 700, file: "plus-jakarta-sans-latin-700-normal.woff2" },
    { family: "Plus Jakarta Sans", weight: 800, file: "plus-jakarta-sans-latin-800-normal.woff2" },
];

export const PDF_FONT_SANS = `"Inter", ui-sans-serif, system-ui, sans-serif`;
export const PDF_FONT_HEADING = `"Plus Jakarta Sans", "Inter", ui-sans-serif, system-ui, sans-serif`;

let cachedCss: string | null = null;

export function getFontFaceCss(): string {
    if (cachedCss) return cachedCss;

    const fontDir = path.join(process.cwd(), "src", "helpers", "pdf", "fonts");

    const css = FONT_FILES.map(({ family, weight, file }) => {
        const base64 = readFileSync(path.join(fontDir, file)).toString("base64");

        return (
            `@font-face{font-family:"${family}";font-style:normal;font-weight:${weight};` +
            `src:url(data:font/woff2;base64,${base64}) format("woff2");}`
        );
    }).join("");

    cachedCss = css;
    return css;
}
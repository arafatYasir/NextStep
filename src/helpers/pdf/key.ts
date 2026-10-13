import { ResumeData } from "@/types/global";
import { createHash } from "node:crypto";

export const RESUME_TEMPLATE_VERSION = "1";

const REUME_FIELDS = [
    "personalInfo", "resumeTitle", "summary", "skills", "experience", "projects", "education"
] as const;

function stableStringify(v: unknown): string {
    if (Array.isArray(v)) return `[${v.map(stableStringify).join(",")}]`;
    if (v && typeof v === "object") {
        const ob = v as Record<string, unknown>;

        return `{${Object.keys(ob)
            .filter((k) => k !== "_id" && ob[k] !== undefined)
            .sort()
            .map((k) => `${JSON.stringify(k)}:${stableStringify(ob[k])}`)
            .join(",")}}`;
    }

    return JSON.stringify(v) ?? "null";
}

export function resumePdfKey(
    userId: string,
    resumeId: string,
    resume: ResumeData
): string {
    const content: Record<string, unknown> = {};
    for (const f of REUME_FIELDS) {
        content[f] = resume[f];
    }

    const hash = createHash("sha256")
        .update(`v${RESUME_TEMPLATE_VERSION}:${stableStringify(content)}`)
        .digest("hex")
        .slice(0, 16);

    return `resume-pdfs/${userId}/${resumeId}-${hash}.pdf`;
}
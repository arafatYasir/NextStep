export const JOB_TITLE_MIN = 3;
export const JOB_TITLE_MAX = 50;
export const JOB_DESCRIPTION_MIN = 100;
export const JOB_DESCRIPTION_MAX = 3000;
export const RESUME_JOB_DESCRIPTION_MAX = 2000;
export const PERSONAL_FIELD_MAX = 50;
export const PASSWORD_MIN = 8;

/** Character counter with min/max rules (e.g. job title, job description). */
export function formatCharCountHint(current: number, min: number, max: number): string {
    return `${current}/${max} characters (min ${min})`;
}

/** Character counter for required fields with only a max length (e.g. name, email). */
export function formatRequiredMaxHint(current: number, max: number): string {
    return `${current}/${max} characters (required)`;
}

/** Hint for password fields. */
export function formatPasswordHint(current: number, min: number = PASSWORD_MIN): string {
    return `${current} characters (min ${min})`;
}

export function parseTrimmedString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

export function validateJobTitle(title: string): string | null {
    if (title.length < JOB_TITLE_MIN || title.length > JOB_TITLE_MAX) {
        return `Job title must be between ${JOB_TITLE_MIN} and ${JOB_TITLE_MAX} characters.`;
    }
    return null;
}

export function validateJobDescription(
    description: string,
    maxLength = JOB_DESCRIPTION_MAX
): string | null {
    if (description.length < JOB_DESCRIPTION_MIN || description.length > maxLength) {
        return `Job description must be between ${JOB_DESCRIPTION_MIN} and ${maxLength} characters.`;
    }
    return null;
}

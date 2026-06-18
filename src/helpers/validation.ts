// Constants
export const JOB_TITLE_MIN = 3;
export const JOB_TITLE_MAX = 50;
export const JOB_DESCRIPTION_MIN = 300;
export const JOB_DESCRIPTION_MAX = 3000;
export const RESUME_JOB_DESCRIPTION_MAX = 2000;
export const PERSONAL_FIELD_MAX = 50;
export const PASSWORD_MIN = 8;
export const PROJECT_NAME_MIN = 4;
export const PROJECT_NAME_MAX = 50;
export const TECH_STACK_MIN = 3;
export const TECH_STACK_MAX = 150;
export const PROJECT_DESCRIPTOIN_MIN = 50;
export const PROJECT_DESCRIPTOIN_MAX = 300;
export const COMPANY_NAME_MIN = 4;
export const COMPANY_NAME_MAX = 50;
export const COMPANY_ROLE_MIN = 3;
export const COMPANY_ROLE_MAX = 50;
export const COMPANY_DESCRIPTOIN_MIN = 50;
export const COMPANY_DESCRIPTOIN_MAX = 300;

export const MANAGER_NAME_MIN = 4;
export const MANAGER_NAME_MAX = 50;

export const NAME_MIN = 4;
export const NAME_MAX = 50;

// Regular expressions
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phoneRegex = /^[0-9]{11}$/;
export const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
export const mongodbIDRegex = /^[a-fA-F0-9]{24}$/;

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
    return `${current} characters / (min ${min})`;
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

export function validateProjectName(name: string): string | null {
    if (name.length < PROJECT_NAME_MIN || name.length > PROJECT_NAME_MAX) {
        return `Project's name must be between ${PROJECT_NAME_MIN} and ${PROJECT_NAME_MAX} characters.`;
    }
    return null;
}

export function validateProjectLink(link: string): string | null {
    if (!urlRegex.test(link)) {
        return `Project link format is invalid.`;
    }
    return null;
}

export function validateProjectTechStack(stack: string): string | null {
    if (stack.length < TECH_STACK_MIN || stack.length > TECH_STACK_MAX) {
        return `Technologies must be between ${TECH_STACK_MIN} and ${TECH_STACK_MAX} characters.`;
    }
    return null;
}

export function validateProjectDescription(description: string): string | null {
    if (description.length < PROJECT_DESCRIPTOIN_MIN || description.length > PROJECT_DESCRIPTOIN_MAX) {
        return `Project's description must be between ${PROJECT_DESCRIPTOIN_MIN} and ${PROJECT_DESCRIPTOIN_MAX} characters.`;
    }
    return null;
}

export function validateCompanyName(name: string): string | null {
    if (name.length < COMPANY_NAME_MIN || name.length > COMPANY_NAME_MAX) {
        return `Company name must be between ${COMPANY_NAME_MIN} and ${COMPANY_NAME_MAX} characters.`;
    }
    return null;
}

export function validateCompanyRole(role: string): string | null {
    if (role.length < COMPANY_ROLE_MIN || role.length > COMPANY_ROLE_MAX) {
        return `Company role must be between ${COMPANY_ROLE_MIN} and ${COMPANY_ROLE_MAX} characters.`;
    }
    return null;
}

export function validateCompanyStartYear(year: string): string | null {
    if (isNaN(parseInt(year))) {
        return `Start year must be a number`;
    }
    else if (parseInt(year) < 1970 || parseInt(year) > new Date().getFullYear()) {
        return `Start year must be between 1970 and ${new Date().getFullYear()}`;
    }
    return null;
}

export function validateCompanyEndYear(startYear: string, endYear: string): string | null {
    if (isNaN(parseInt(endYear))) {
        return `End year must be a number`;
    }
    else if (parseInt(endYear) < parseInt(startYear)) {
        return `End year must be greater than or equal to start year.`;
    }
    else if (parseInt(endYear) < 1970 || parseInt(endYear) > new Date().getFullYear()) {
        return `End year must be between 1970 and ${new Date().getFullYear()}`;
    }
    return null;
}

export function validateCompanyDescription(description: string): string | null {
    if (description.length < COMPANY_DESCRIPTOIN_MIN || description.length > COMPANY_DESCRIPTOIN_MAX) {
        return `Company description must be between ${COMPANY_DESCRIPTOIN_MIN} and ${COMPANY_DESCRIPTOIN_MAX} characters.`;
    }
    return null;
}

export function validateManagerName(name: string): string | null {
    if (name.length < MANAGER_NAME_MIN || name.length > MANAGER_NAME_MAX) {
        return `Name must be between ${MANAGER_NAME_MIN} and ${MANAGER_NAME_MAX} characters.`;
    }
    return null;
}

export function validateName(name: string): string | null {
    if (name.length < NAME_MIN || name.length > NAME_MAX) {
        return `Name must be between ${NAME_MIN} and ${NAME_MAX} characters.`;
    }
    return null;
}
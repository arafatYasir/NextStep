import { Input } from "@/components/ui/input"
import { formatRequiredMaxHint, PERSONAL_FIELD_MAX } from "@/src/helpers/validation"

interface ResumeBuilderInputFormPersonalProps {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        github: string;
        linkedin: string;
    },
    handleChangePersonalInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: {
        fullName?: string;
        email?: string;
        phone?: string;
        location?: string;
        github?: string;
        linkedin?: string;
    }
}

const ResumeBuilderFormPersonal = ({ personalInfo, handleChangePersonalInfo, errors }: ResumeBuilderInputFormPersonalProps) => {
    return (
        <>
            <div className="relative my-4 xs:my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-dashed border-[rgb(var(--border-primary))]"></span>
                </div>

                <div className="relative flex justify-center text-xs xs:text-sm sm:text-[15px] uppercase font-semibold font-sans">
                    <span className="bg-card px-4 text-foreground">Personal Informations</span>
                </div>
            </div>

            {/* ---- Full Name Input ---- */}
            <div className="mb-6">
                <label htmlFor="fullName" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                    Full Name
                </label>
                <Input
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={handleChangePersonalInfo}
                    placeholder="Full name (eg. John Doe)"
                />

                {/* ---- Error Message ---- */}
                {errors.fullName && (
                    <p className="text-red-500 text-[15px] mt-1.5">{errors.fullName}</p>
                )}

                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                    {formatRequiredMaxHint(personalInfo.fullName.length, PERSONAL_FIELD_MAX)}
                </p>
            </div>

            {/* ---- Email Input ---- */}
            <div className="mb-6">
                <label htmlFor="email" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handleChangePersonalInfo}
                    placeholder="Email address (eg. johndoe@gmail.com)"
                />

                {/* ---- Error Message ---- */}
                {errors.email && (
                    <p className="text-red-500 text-[15px] mt-1.5">{errors.email}</p>
                )}

                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                    {formatRequiredMaxHint(personalInfo.email.length, PERSONAL_FIELD_MAX)}
                </p>
            </div>

            {/* ---- Phone Input ---- */}
            <div className="mb-6">
                <label htmlFor="phone" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                    Phone
                </label>
                <Input
                    id="phone"
                    type="tel"
                    value={personalInfo.phone}
                    onChange={handleChangePersonalInfo}
                    placeholder="Phone number (eg. XXXXXXXXXX)"
                />

                {/* ---- Error Message ---- */}
                {errors.phone && (
                    <p className="text-red-500 text-[15px] mt-1.5">{errors.phone}</p>
                )}

                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                    {formatRequiredMaxHint(personalInfo.phone.length, 11)}
                </p>
            </div>

            {/* ---- Location Input ---- */}
            <div className="mb-6">
                <label htmlFor="location" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                    Location
                </label>
                <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={handleChangePersonalInfo}
                    placeholder="Location (eg. San Francisco, USA)"
                />

                {/* ---- Error Message ---- */}
                {errors.location && (
                    <p className="text-red-500 text-[15px] mt-1.5">{errors.location}</p>
                )}

                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                    {formatRequiredMaxHint(personalInfo.location.length, PERSONAL_FIELD_MAX)}
                </p>
            </div>

            {/* ---- GitHub Input ---- */}
            <div className="mb-6">
                <label htmlFor="github" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                    GitHub
                </label>
                <Input
                    id="github"
                    type="url"
                    value={personalInfo.github}
                    onChange={handleChangePersonalInfo}
                    placeholder="GitHub URL (eg. https://github.com/john)"
                />

                {/* ---- Error Message ---- */}
                {errors.github && (
                    <p className="text-red-500 text-[15px] mt-1.5">{errors.github}</p>
                )}

                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                    {formatRequiredMaxHint(personalInfo.github.length, PERSONAL_FIELD_MAX)}
                </p>
            </div>

            {/* ---- LinkedIn Input ---- */}
            <div className="mb-6">
                <label htmlFor="linkedin" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                    LinkedIn
                </label>
                <Input
                    id="linkedin"
                    type="url"
                    value={personalInfo.linkedin}
                    onChange={handleChangePersonalInfo}
                    placeholder="LinkedIn URL (eg. https://linkedin.com/in/john)"
                />

                {/* ---- Error Message ---- */}
                {errors.linkedin && (
                    <p className="text-red-500 text-[15px] mt-1.5">{errors.linkedin}</p>
                )}

                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                    {formatRequiredMaxHint(personalInfo.linkedin.length, PERSONAL_FIELD_MAX)}
                </p>
            </div>
        </>
    )
}

export default ResumeBuilderFormPersonal
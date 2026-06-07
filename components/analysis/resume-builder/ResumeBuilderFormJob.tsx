import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatCharCountHint, JOB_DESCRIPTION_MIN, JOB_TITLE_MAX, JOB_TITLE_MIN, RESUME_JOB_DESCRIPTION_MAX } from "@/src/helpers/validation"

interface ResumeBuilderInputFormJobProps {
    jobInfo: {
        jobTitle: string;
        jobDescription: string;
    },
    handleChangeJobInfo: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    errors: {
        jobTitle?: string;
        jobDescription?: string;
    }
};

const ResumeBuilderFormJob = ({ jobInfo, handleChangeJobInfo, errors }: ResumeBuilderInputFormJobProps) => {
    return (
        <>
            <div className="relative my-4 xs:my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-dashed border-[rgb(var(--border-primary))]"></span>
                </div>

                <div className="relative flex justify-center text-xs xs:text-sm sm:text-[15px] uppercase font-semibold font-sans">
                    <span className="bg-card px-4 text-foreground">Job Specific Informations</span>
                </div>
            </div>

            {/* ---- Job Title Input ---- */}
            <div className="mb-6">
                <label htmlFor="jobTitle" className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                    Targeted Job Title
                </label>
                <Input
                    id="jobTitle"
                    value={jobInfo.jobTitle}
                    onChange={handleChangeJobInfo}
                    placeholder="Enter the job title as it appears in the job posting"
                    required={true}
                />

                {/* ---- Error Message ---- */}
                {errors.jobTitle && (
                    <p className="text-red-500 text-[15px] mt-1.5">{errors.jobTitle}</p>
                )}

                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                    {formatCharCountHint(jobInfo.jobTitle.length, JOB_TITLE_MIN, JOB_TITLE_MAX)}
                </p>
            </div>

            {/* ---- Job Description Input ---- */}
            <div className="mb-6">
                <label htmlFor="jobDescription" className="block font-semibold font-heading text-foreground text-sm sm:text-base mb-2">
                    Job Description
                </label>
                <Textarea
                    id="jobDescription"
                    value={jobInfo.jobDescription}
                    onChange={handleChangeJobInfo}
                    placeholder="Paste the full job description"
                    className="h-40 resize-none scrollbar-custom"
                    required={true}
                />

                {/* ---- Error Message ---- */}
                {errors.jobDescription && (
                    <p className="text-red-500 text-[15px] mt-1.5">{errors.jobDescription}</p>
                )}

                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                    {formatCharCountHint(
                        jobInfo.jobDescription.length,
                        JOB_DESCRIPTION_MIN,
                        RESUME_JOB_DESCRIPTION_MAX
                    )}
                </p>
            </div>
        </>
    )
}

export default ResumeBuilderFormJob
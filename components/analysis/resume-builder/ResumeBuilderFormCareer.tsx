import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatRequiredMaxHint } from "@/src/helpers/validation";

interface ResumeBuilderFormCareerProps {
    careerInfo: CareerInfo;
    careerInfoCount: CareerInfoCount;
    handleChangeCareerInfo: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: keyof CareerInfo, index: number) => void;
    handleChangeCompanyField: (index: number, field: string, value: string | boolean) => void;
    errors: {
        companies?: string;
        projects?: string;
    }
}

// Generate a list of years from current year down to 1970
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 1969 }, (_, i) => String(CURRENT_YEAR - i));

const ResumeBuilderFormCareer = ({ careerInfo, careerInfoCount, handleChangeCareerInfo, handleChangeCompanyField, errors }: ResumeBuilderFormCareerProps) => {
    return (
        <>
            <div className="relative my-4 xs:my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-dashed border-[rgb(var(--border-primary))]"></span>
                </div>

                <div className="relative flex justify-center text-xs xs:text-sm sm:text-[15px] uppercase font-semibold font-sans">
                    <span className="bg-card px-4 text-foreground">Career Informations</span>
                </div>
            </div>

            {/* ---- Companies Data Input ---- */}
            {
                Array.from({ length: careerInfoCount.companies }).map((_, i) => {
                    const company = careerInfo.companies[i];
                    return (
                        <div key={company.id} className="mb-6">
                            <p className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                                Company {i + 1}
                            </p>

                            <div className="space-y-3">
                                {/* ---- Company Name ---- */}
                                <div>
                                    <Input
                                        type="text"
                                        id="company"
                                        value={company.company}
                                        onChange={(e) => handleChangeCareerInfo(e, "companies", i)}
                                        placeholder={`Company Name ${i + 1}`}
                                        required={true}
                                    />
                                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                        {formatRequiredMaxHint(company.company.length, 50)}
                                    </p>
                                </div>

                                {/* ---- Year Range ---- */}
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Start Year */}
                                    <div>
                                        <Select
                                            value={company.startYear}
                                            onValueChange={(val) => handleChangeCompanyField(i, "startYear", val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Start Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Start Year</SelectLabel>
                                                    {YEAR_OPTIONS.map(year => (
                                                        <SelectItem key={year} value={year}>{year}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                            Required
                                        </p>
                                    </div>

                                    {/* End Year / Currently Working Here */}
                                    <div>
                                        <Select
                                            value={company.isCurrentJob ? "currently" : (company.endYear ?? "")}
                                            onValueChange={(val) => {
                                                if (val === "currently") {
                                                    handleChangeCompanyField(i, "isCurrentJob", true);
                                                } else {
                                                    handleChangeCompanyField(i, "isCurrentJob", false);
                                                    handleChangeCompanyField(i, "endYear", val);
                                                }
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="End Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>End Year</SelectLabel>
                                                    {YEAR_OPTIONS.map(year => (
                                                        <SelectItem key={year} value={year}>{year}</SelectItem>
                                                    ))}
                                                </SelectGroup>

                                                <SelectSeparator />

                                                <SelectGroup>
                                                    <SelectItem value="currently" className="text-[rgb(var(--text-accent))] font-medium">
                                                        ✦ Currently Working Here
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                            {company.isCurrentJob ? "Currently working here" : "Required"}
                                        </p>
                                    </div>
                                </div>

                                {/* ---- Description ---- */}
                                <div>
                                    <Textarea
                                        id="description"
                                        value={company.description}
                                        onChange={(e) => handleChangeCareerInfo(e, "companies", i)}
                                        placeholder="Briefly describe your role and responsibilities"
                                        className="h-30 resize-none scrollbar-custom"
                                        required={true}
                                    />
                                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                        {formatRequiredMaxHint(company.description.length, 200)}
                                    </p>
                                </div>
                            </div>

                            {/* ---- Error Message ---- */}
                            {errors.companies && (
                                <p className="text-red-500 text-[15px] mt-1.5">{errors.companies}</p>
                            )}
                        </div>
                    );
                })
            }

            {/* ---- Projects Data Input ---- */}
            {
                Array.from({ length: careerInfoCount.projects }).map((_, i) => (
                    <div key={careerInfo.projects[i].id} className="mb-6">
                        <p className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                            Project {i + 1}
                        </p>

                        <div className="space-y-3">
                            <div>
                                <Input
                                    type="text"
                                    id="name"
                                    value={careerInfo.projects[i].name}
                                    onChange={(e) => handleChangeCareerInfo(e, "projects", i)}
                                    placeholder={`Name of Project ${i + 1}`}
                                    required={true}
                                />
                                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                    {formatRequiredMaxHint(careerInfo.projects[i].name.length, 50)}
                                </p>
                            </div>

                            <div>
                                <Input
                                    type="url"
                                    id="link"
                                    value={careerInfo.projects[i].link}
                                    onChange={(e) => handleChangeCareerInfo(e, "projects", i)}
                                    placeholder="Project Link"
                                    required={true}
                                />
                                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                    {formatRequiredMaxHint(careerInfo.projects[i].link.length, 100)}
                                </p>
                            </div>

                            <div>
                                <Textarea
                                    id="description"
                                    value={careerInfo.projects[i].description}
                                    onChange={(e) => handleChangeCareerInfo(e, "projects", i)}
                                    placeholder="Short description of the project"
                                    className="h-30 resize-none scrollbar-custom"
                                    required={true}
                                />
                                <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                    {formatRequiredMaxHint(careerInfo.projects[i].description.length, 200)}
                                </p>
                            </div>
                        </div>

                        {/* ---- Error Message ---- */}
                        {errors.projects && (
                            <p className="text-red-500 text-[15px] mt-1.5">{errors.projects}</p>
                        )}
                    </div>
                ))
            }
        </>
    )
}

export default ResumeBuilderFormCareer
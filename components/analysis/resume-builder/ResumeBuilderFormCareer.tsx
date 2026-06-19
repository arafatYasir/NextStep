import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatRequiredMaxHint } from "@/src/helpers/validation";
import { CareerInfo, CareerInfoCount } from "@/types/global";

interface ResumeBuilderFormCareerProps {
    careerInfo: CareerInfo;
    careerInfoCount: CareerInfoCount;
    handleChangeCareerInfo: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: keyof CareerInfo, index: number) => void;
    handleChangeCompanyField: (index: number, field: string, value: string | boolean) => void;
    errors: {
        companies?: {
            index: number;
            field: string;
            message: string;
        }[];
        projects?: {
            index: number;
            field: string;
            message: string;
        }[];
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
                    const companyErrors = errors.companies;

                    let nameError, roleError, startYearError, endYearError, descriptionError;

                    if (companyErrors && companyErrors.length > 0) {
                        nameError = companyErrors.find(err => (err.index === i && err.field === "company"));
                        roleError = companyErrors.find(err => (err.index === i && err.field === "role"));
                        startYearError = companyErrors.find(err => (err.index === i && err.field === "startYear"));
                        endYearError = companyErrors.find(err => (err.index === i && err.field === "endYear"));
                        descriptionError = companyErrors.find(err => (err.index === i && err.field === "description"));
                    }

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

                                    {/* ---- Error Message ---- */}
                                    {nameError && (
                                        <p className="text-red-500 text-[15px] mt-1.5">{nameError.message}</p>
                                    )}
                                </div>
                                
                                {/* ---- Your Role ---- */}
                                <div>
                                    <Input
                                        type="text"
                                        id="role"
                                        value={company.role}
                                        onChange={(e) => handleChangeCareerInfo(e, "companies", i)}
                                        placeholder="Your Role"
                                        required={true}
                                    />
                                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                        {formatRequiredMaxHint(company.role.length, 50)}
                                    </p>

                                    {/* ---- Error Message ---- */}
                                    {roleError && (
                                        <p className="text-red-500 text-[15px] mt-1.5">{roleError.message}</p>
                                    )}
                                </div>

                                {/* ---- Year Range ---- */}
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Start Year */}
                                    <div>
                                        <Select
                                            value={company.startYear}
                                            required={true}
                                            onValueChange={(val) => handleChangeCompanyField(i, "startYear", val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Start Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {YEAR_OPTIONS.map(year => (
                                                        <SelectItem key={year} value={year}>{year}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                            Required
                                        </p>

                                        {/* ---- Error Message ---- */}
                                        {startYearError && (
                                            <p className="text-red-500 text-[15px] mt-1.5">{startYearError.message}</p>
                                        )}
                                    </div>

                                    {/* End Year / Currently Working Here */}
                                    <div>
                                        <Select
                                            value={company.isCurrentJob ? "currently" : (company.endYear ?? "")}
                                            required={true}
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
                                                    <SelectItem value="currently" className="text-foreground font-medium">
                                                        Currently Working Here
                                                    </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    {YEAR_OPTIONS.map(year => (
                                                        <SelectItem key={year} value={year}>{year}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                            Required
                                        </p>

                                        {/* ---- Error Message ---- */}
                                        {endYearError && (
                                            <p className="text-red-500 text-[15px] mt-1.5">{endYearError.message}</p>
                                        )}
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
                                        {formatRequiredMaxHint(company.description.length, 300)}
                                    </p>

                                    {/* ---- Error Message ---- */}
                                    {descriptionError && (
                                        <p className="text-red-500 text-[15px] mt-1.5">{descriptionError.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })
            }

            {/* ---- Projects Data Input ---- */}
            {
                Array.from({ length: careerInfoCount.projects }).map((_, i) => {
                    const project = careerInfo.projects[i];
                    const projectErrors = errors.projects;

                    let nameError, linkError, techStackError, descriptionError;

                    if (projectErrors && projectErrors.length > 0) {
                        nameError = projectErrors.find(err => (err.index === i && err.field === "name"));
                        linkError = projectErrors.find(err => (err.index === i && err.field === "link"));
                        techStackError = projectErrors.find(err => (err.index === i && err.field === "techStack"));
                        descriptionError = projectErrors.find(err => (err.index === i && err.field === "description"));
                    }

                    return (
                        <div key={careerInfo.projects[i].id} className="mb-6">
                            <p className="block font-semibold text-foreground text-sm sm:text-base mb-2 font-heading">
                                Project {i + 1}
                            </p>

                            <div className="space-y-3">
                                <div>
                                    <Input
                                        type="text"
                                        id="name"
                                        value={project.name}
                                        onChange={(e) => handleChangeCareerInfo(e, "projects", i)}
                                        placeholder={`Name of Project ${i + 1}`}
                                        required={true}
                                    />
                                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                        {formatRequiredMaxHint(project.name.length, 50)}
                                    </p>

                                    {/* ---- Error Message ---- */}
                                    {nameError && (
                                        <p className="text-red-500 text-[15px] mt-1.5">{nameError.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="url"
                                        id="link"
                                        value={project.link}
                                        onChange={(e) => handleChangeCareerInfo(e, "projects", i)}
                                        placeholder="Project Link"
                                        required={true}
                                    />
                                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                        {formatRequiredMaxHint(project.link.length, 100)}
                                    </p>

                                    {/* ---- Error Message ---- */}
                                    {linkError && (
                                        <p className="text-red-500 text-[15px] mt-1.5">{linkError.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="text"
                                        id="techStack"
                                        value={project.techStack}
                                        onChange={(e) => handleChangeCareerInfo(e, "projects", i)}
                                        placeholder="Enter the technologies used in this project, separated by commas (eg., HTML, CSS, JavaScript)"
                                        required={true}
                                    />
                                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                        {formatRequiredMaxHint(project.techStack.length, 150)}
                                    </p>

                                    {/* ---- Error Message ---- */}
                                    {techStackError && (
                                        <p className="text-red-500 text-[15px] mt-1.5">{techStackError.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Textarea
                                        id="description"
                                        value={project.description}
                                        onChange={(e) => handleChangeCareerInfo(e, "projects", i)}
                                        placeholder="Short description of the project"
                                        className="h-30 resize-none scrollbar-custom"
                                        required={true}
                                    />
                                    <p className="text-xs xs:text-sm font-sans text-[rgb(var(--text-tertiary))] mt-1.5">
                                        {formatRequiredMaxHint(project.description.length, 300)}
                                    </p>

                                    {/* ---- Error Message ---- */}
                                    {descriptionError && (
                                        <p className="text-red-500 text-[15px] mt-1.5">{descriptionError.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ResumeBuilderFormCareer
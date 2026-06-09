"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Briefcase, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import SignInAlertModal from "@/components/SignInAlertModal";
import {
    emailRegex,
    phoneRegex,
    RESUME_JOB_DESCRIPTION_MAX,
    urlRegex,
    validateCompanyDescription,
    validateCompanyEndYear,
    validateCompanyName,
    validateCompanyRole,
    validateCompanyStartYear,
    validateJobDescription,
    validateJobTitle,
    validateProjectDescription,
    validateProjectLink,
    validateProjectName,
    validateProjectTechStack,
} from "@/src/helpers/validation";
import ResumePreviewModal from "./ResumePreviewModal";
import { cn } from "@/lib/utils";
import ResumeBuilderInputFormJob from "./ResumeBuilderFormJob";
import ResumeBuilderInputFormPersonal from "./ResumeBuilderFormPersonal";
import ResumeBuilderFormCareer from "./ResumeBuilderFormCareer";
import { projectCompilationEventsSubscribe } from "next/dist/build/swc/generated-native";

interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
}

interface JobInfo {
    jobTitle: string,
    jobDescription: string;
}

interface ErrorState {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    github?: string;
    linkedin?: string;
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
    jobTitle?: string,
    jobDescription?: string;
}

// const resumeContents = {
//     resumeTitle: "Mern Stack Developer",
//     education: [
//         {
//             degree: "Bachelor of Science in Computer Science and Engineering",
//             duration: "2018 - 2022",
//             institution: "Khulna University of Engineering & Technology (KUET)"
//         }
//     ],
//     experience: [
//         {
//             company: "Innovate Solutions Ltd.",
//             duration: "June 2022 - December 2023",
//             jobTitle: "Junior MERN Stack Developer",
//             responsibilities: [
//                 "Developed and implemented 5+ new user-facing features for a client management dashboard using React.js, resulting in a 20% increase in user engagement.",
//                 "Engineered and maintained RESTful APIs with Node.js and Express.js, handling an average of 500+ daily requests and improving API response times by 15%.",
//                 "Integrated MongoDB for data storage, optimizing CRUD operations to reduce data retrieval times by 25% and ensuring data integrity for over 10,000 records."
//             ]
//         },
//         {
//             company: "Digital Pioneers Agency",
//             duration: "January 2022 - May 2022",
//             jobTitle: "Web Development Intern",
//             responsibilities: [
//                 "Assisted in the development of responsive frontend components using React.js and Bootstrap, ensuring seamless user experience across 95% of target devices.",
//                 "Collaborated with senior developers to debug and fix critical issues in existing web applications, reducing bug reports by 30% within the internship period.",
//                 "Managed project code using Git and GitHub, participating in daily stand-ups and contributing to a 10% improvement in team code review efficiency."
//             ]
//         }
//     ],
//     personalInfo: {
//         email: "arafat.yasir1305@gmail.com",
//         fullName: "Yasir Arafat",
//         github: "https://github.com/arafatYasir",
//         linkedin: "https://linked.in/iamyasirarafat",
//         location: "Khulna, Bangladesh",
//         phone: "01828044629"
//     },
//     projects: [
//         {
//             highlights: [
//                 "Developed a full-stack e-commerce application with features including product listing, cart management, and user authentication, handling over 200 product entries.",
//                 "Implemented efficient data querying strategies in MongoDB, reducing average product lookup time by 35% and optimizing database performance.",
//                 "Designed and integrated a responsive UI with dynamic product displays, achieving a 98% score on Google Lighthouse for performance and accessibility."
//             ],
//             link: "https://github.com/arafatYasir/ecommerce-mern-app",
//             projectName: "E-Commerce Platform",
//             techStack: [
//                 "React.js",
//                 "Node.js",
//                 "Express.js",
//                 "MongoDB",
//                 "CSS3"
//             ]
//         },
//         {
//             highlights: [
//                 "Built a dynamic task management application enabling users to create, update, and delete tasks with priority levels and deadlines.",
//                 "Optimized API endpoints to handle task operations with an average latency of under 50ms, ensuring a smooth user experience.",
//                 "Integrated robust error handling and data validation mechanisms, leading to a 90% reduction in application crashes due to invalid inputs."
//             ],
//             link: "https://github.com/arafatYasir/mern-task-app",
//             projectName: "Task Management Application",
//             techStack: [
//                 "React.js",
//                 "Node.js",
//                 "Express.js",
//                 "MongoDB",
//                 "Tailwind CSS"
//             ]
//         }
//     ],
//     skills: {
//         frameworksAndLibraries: [
//             "React.js",
//             "Express.js",
//             "Mongoose",
//             "Bootstrap",
//             "Tailwind CSS"
//         ],
//         languages: [
//             "JavaScript (ES6+)",
//             "HTML5",
//             "CSS3",
//             "Node.js"
//         ],
//         softSkills: [
//             "Problem-Solving",
//             "Team Collaboration",
//             "Responsive Design",
//             "API Development",
//             "Database Management",
//             "Code Optimization",
//             "Continuous Learning",
//             "Agile Methodologies"
//         ],
//         toolsAndPlatforms: [
//             "MongoDB",
//             "Git",
//             "GitHub",
//             "VS Code",
//             "Postman",
//             "Chrome DevTools"
//         ]
//     },
//     summary: "Highly motivated and detail-oriented MERN Stack Developer Intern with a foundational understanding of full-stack web development principles. Eager to contribute to innovative projects at Nexogs Systems Ltd. by leveraging skills in React.js, Node.js, Express.js, and MongoDB. Proven ability to rapidly learn and apply modern technologies, collaborate effectively within development teams, and deliver high-quality, responsive web applications. Committed to enhancing user experience and optimizing application performance through diligent testing and debugging."
// };

const ResumeBuilderForm = () => {
    // States
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        fullName: "", email: "", phone: "", location: "", github: "", linkedin: ""
    });
    const [jobInfo, setJobInfo] = useState<JobInfo>({
        jobTitle: "", jobDescription: ""
    });
    const [careerInfo, setCareerInfo] = useState<CareerInfo>({
        companies: [
            { id: 1, company: "", role: "", startYear: "", isCurrentJob: false, endYear: "", description: "" },
            { id: 2, company: "", role: "", startYear: "", isCurrentJob: false, endYear: "", description: "" },
        ],
        projects: [
            { id: 1, name: "", link: "", techStack: "", description: "" },
            { id: 2, name: "", link: "", techStack: "", description: "" },
            { id: 3, name: "", link: "", techStack: "", description: "" }
        ]
    });
    const [careerInfoCount, setCareerInfoCount] = useState<CareerInfoCount>({
        companies: 2, projects: 1
    });

    const [resumeType, setResumeType] = useState<"Experienced" | "Fresher">("Experienced");
    const [errors, setErrors] = useState<ErrorState>({});
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResumeData | null>(null);

    // Extra hooks
    const modalRef = useRef<HTMLDivElement | null>(null);
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Handling outside clicks
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setShowSignInModal(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Clearing polling interval on component unmount
    useEffect(() => {
        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        }
    }, []);

    // Functions
    const handleChangeResumeType = (value: "Fresher" | "Experienced") => {
        setResumeType(value);
        setCareerInfo({
            companies: [
                { id: 1, company: "", role: "", startYear: "", isCurrentJob: false, endYear: "", description: "" },
                { id: 2, company: "", role: "", startYear: "", isCurrentJob: false, endYear: "", description: "" },
            ],
            projects: [
                { id: 1, name: "", link: "", techStack: "", description: "" },
                { id: 2, name: "", link: "", techStack: "", description: "" },
                { id: 3, name: "", link: "", techStack: "", description: "" }
            ]
        });
        setErrors(prev => ({
            ...prev,
            companies: [],
            projects: []
        }));

        if (value === "Fresher") {
            setCareerInfoCount({ companies: 0, projects: 3 });
        }
        else {
            setCareerInfoCount({ companies: 2, projects: 1 });
        }
    }

    const handleChangePersonalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setPersonalInfo(prev => ({
            ...prev,
            [id]: id === "phone" ? value.slice(0, 11) : value.slice(0, 50)
        }));

        // Clear error for this specific field if has any
        if (errors[id as keyof ErrorState]) {
            setErrors(prev => ({
                ...prev,
                [id]: ""
            }));
        }
    }

    const handleChangeCareerInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: keyof CareerInfo, index: number) => {
        const { id, value } = e.target;

        let sliceValue: number = 50;

        if (id === "name" || id === "company" || id === "role") sliceValue = 50;
        else if (id === "link") sliceValue = 100;
        else if (id === "techStack") sliceValue = 150;
        else if (id === "description") sliceValue = 300;

        setCareerInfo(prev => {
            const list = [...prev[name]] as any[];
            list[index] = {
                ...list[index],
                [id]: value.slice(0, sliceValue)
            };
            return {
                ...prev,
                [name]: list
            };
        });
    }

    const handleChangeCompanyField = (index: number, field: string, value: string | boolean) => {
        setCareerInfo(prev => {
            const list = [...prev.companies];
            const updated = { ...list[index], [field]: value };
            // If toggling to currentJob, clear the endYear
            if (field === "isCurrentJob" && value === true) {
                delete updated.endYear;
            }
            list[index] = updated;
            return { ...prev, companies: list };
        });
    }

    const handleChangeJobInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        setJobInfo(prev => ({
            ...prev,
            [id]: id === "jobTitle" ? value.slice(0, 50) : value.slice(0, 2000)
        }));

        // Clear error for this specific field if has any
        if (errors[id as keyof ErrorState]) {
            setErrors(prev => ({
                ...prev,
                [id]: ""
            }));
        }
    }

    const handleValidatePersonalInfo = () => {
        const tempErrors: ErrorState = {};

        if (!personalInfo.fullName.trim()) {
            tempErrors.fullName = "Full name is required";
        }
        else if (personalInfo.fullName.trim().length < 4) {
            tempErrors.fullName = "Full name must be at least 4 characters";
        }

        if (!personalInfo.email.trim()) {
            tempErrors.email = "Email is required";
        }
        else if (!emailRegex.test(personalInfo.email)) {
            tempErrors.email = "Invalid email format"
        }

        if (!personalInfo.phone.trim()) {
            tempErrors.phone = "Phone number is required";
        }
        else if (!phoneRegex.test(personalInfo.phone)) {
            tempErrors.phone = "Invalid phone number format";
        }

        if (!personalInfo.location.trim()) {
            tempErrors.location = "Location is required";
        }

        if (!personalInfo.github.trim()) {
            tempErrors.github = "GitHub link is required";
        }
        else if (!urlRegex.test(personalInfo.github)) {
            tempErrors.github = "Invalid url format";
        }

        if (!personalInfo.linkedin.trim()) {
            tempErrors.linkedin = "LinkedIn link is required";
        }
        else if (!urlRegex.test(personalInfo.linkedin)) {
            tempErrors.linkedin = "Invalid url format";
        }

        return tempErrors;
    }

    const handleValidateJobInfo = () => {
        const tempErrors: ErrorState = {};

        const jobTitleError = validateJobTitle(jobInfo.jobTitle.trim());
        if (jobTitleError) {
            tempErrors.jobTitle = jobTitleError;
        }

        const jobDescriptionError = validateJobDescription(
            jobInfo.jobDescription.trim(),
            RESUME_JOB_DESCRIPTION_MAX
        );
        if (jobDescriptionError) {
            tempErrors.jobDescription = jobDescriptionError;
        }

        return tempErrors;
    }

    const handleValidateCareerInfo = () => {
        const tempErrors: ErrorState = {};
        tempErrors.projects = [];
        tempErrors.companies = [];

        if (resumeType === "Fresher") {
            for (let i = 0; i < 3; i++) {
                const project = careerInfo.projects[i];

                // Project name checking
                const projectNameError = validateProjectName(project.name);
                if (projectNameError) {
                    const newError = {
                        index: i,
                        field: "name",
                        message: projectNameError
                    };
                    tempErrors.projects.push(newError);
                }

                // Project link checking
                const projectLinkError = validateProjectLink(project.link);
                if (projectLinkError) {
                    const newError = {
                        index: i,
                        field: "link",
                        message: projectLinkError
                    };
                    tempErrors.projects.push(newError);
                }

                // Project tech stack checking
                const projectTechStackError = validateProjectTechStack(project.techStack);
                if (projectTechStackError) {
                    const newError = {
                        index: i,
                        field: "techStack",
                        message: projectTechStackError
                    };
                    tempErrors.projects.push(newError);
                }

                // Project description checking
                const projectDescription = validateProjectDescription(project.description);
                if (projectDescription) {
                    const newError = {
                        index: i,
                        field: "description",
                        message: projectDescription
                    };
                    tempErrors.projects.push(newError);
                }
            }
        }
        else if (resumeType === "Experienced") {
            // Comapnies Checking
            for (let i = 0; i < 2; i++) {
                const company = careerInfo.companies[i];

                // Company name checking
                const companyNameError = validateCompanyName(company.company);
                if (companyNameError) {
                    const newError = {
                        index: i,
                        field: "company",
                        message: companyNameError
                    }
                    tempErrors.companies.push(newError);
                }

                // Company role checking
                const companyRoleError = validateCompanyRole(company.role);
                if (companyRoleError) {
                    const newError = {
                        index: i,
                        field: "role",
                        message: companyRoleError
                    }
                    tempErrors.companies.push(newError);
                }

                // Company start year checking
                const companyStartYearError = validateCompanyStartYear(company.startYear);
                if (companyStartYearError) {
                    const newError = {
                        index: i,
                        field: "startYear",
                        message: companyStartYearError
                    }
                    tempErrors.companies.push(newError);
                }

                // Company end year checking
                if (!company.isCurrentJob && !company.endYear?.trim()) {
                    const newError = {
                        index: i,
                        field: "endYear",
                        message: "End year is required"
                    }
                    tempErrors.companies.push(newError);
                }
                else if (!company.isCurrentJob && company.endYear) {
                    const companyEndYearError = validateCompanyEndYear(company.startYear, company.endYear);

                    if (companyEndYearError) {
                        const newError = {
                            index: i,
                            field: "endYear",
                            message: companyEndYearError
                        }
                        tempErrors.companies.push(newError);
                    }
                }

                // Comapny description checking
                const companyDescriptionError = validateCompanyDescription(company.description);
                if (companyDescriptionError) {
                    const newError = {
                        index: i,
                        field: "description",
                        message: companyDescriptionError
                    }
                    tempErrors.companies.push(newError);
                }
            }

            // Project Checking
            const project = careerInfo.projects[0];

            // Project name checking
            const projectNameError = validateProjectName(project.name);
            if (projectNameError) {
                const newError = {
                    index: 0,
                    field: "name",
                    message: projectNameError
                };
                tempErrors.projects.push(newError);
            }

            // Project link checking
            const projectLinkError = validateProjectLink(project.link);
            if (projectLinkError) {
                const newError = {
                    index: 0,
                    field: "link",
                    message: projectLinkError
                };
                tempErrors.projects.push(newError);
            }

            // Project tech stack checking
            const projectTechStackError = validateProjectTechStack(project.techStack);
            if (projectTechStackError) {
                const newError = {
                    index: 0,
                    field: "techStack",
                    message: projectTechStackError
                };
                tempErrors.projects.push(newError);
            }

            // Project description checking
            const projectDescription = validateProjectDescription(project.description);
            if (projectDescription) {
                const newError = {
                    index: 0,
                    field: "description",
                    message: projectDescription
                };
                tempErrors.projects.push(newError);
            }
        }

        return tempErrors;
    }

    const handleCheckErrors = () => {
        // Initialize a new empty error object
        const tempErrors: ErrorState = {
            ...handleValidatePersonalInfo(),
            ...handleValidateCareerInfo(),
            ...handleValidateJobInfo(),
        };

        // Set new erros in the state
        setErrors(tempErrors);

        // If there are not erros for companies and prjoects then separate them from object and check for other errors
        if (tempErrors.companies?.length === 0 && tempErrors.projects?.length === 0) {
            const { companies, projects, ...otherErrors } = tempErrors;

            return Object.keys(otherErrors).length > 0;
        }

        return Object.keys(tempErrors).length > 0;
    }

    const handleBuild: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
        // Prevent default behavior
        e.preventDefault();

        try {
            // Clear previous error
            setErrors({});

            // Check for errors
            if (handleCheckErrors()) {
                return;
            }

            // Checking if the user is logged in or not
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            // If user is not logged in return
            if (!user) {
                setShowSignInModal(true);
                return;
            }

            // Start the loading
            setLoading(true);

            let experiences, projects;
            if (resumeType === "Fresher") {
                projects = [...careerInfo.projects];
            }
            else {
                experiences = [...careerInfo.companies];
                projects = careerInfo.projects[0];
            }

            // Enqueue a new resume record
            const res = await fetch("/api/build-resume", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    fullName: personalInfo.fullName,
                    email: personalInfo.email,
                    phone: personalInfo.phone,
                    location: personalInfo.location,
                    github: personalInfo.github,
                    linkedin: personalInfo.linkedin,
                    jobTitle: jobInfo.jobTitle,
                    jobDescription: jobInfo.jobDescription,
                    resumeType,
                    projects,
                    experiences
                })
            });

            // Get the queued resume id
            const data = await res.json();
            const { status, message, resumeId } = data;

            // If any error happens
            if (status === "ERROR") {
                toast.error(message);
                setLoading(false);
                return;
            }
            if (!resumeId) {
                toast.error("Failed to initialize resume.");
                setLoading(false);
                return;
            }

            // Clear any active polling interval first to prevent leakage
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }

            // Check for the result every 2 seconds with interval
            pollIntervalRef.current = setInterval(async () => {
                try {
                    const res = await fetch(`/api/resumes/${resumeId}`);
                    const resumeData = await res.json();

                    // If error happens
                    if (resumeData.status === "ERROR") {
                        toast.error(resumeData.message);

                        setLoading(false);
                        setResult(null);

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }

                        console.error(resumeData.message);
                    }

                    if (resumeData.status === "completed") {
                        const { userId, status, ...resumeContent } = resumeData;

                        setResult(resumeContent);
                        setLoading(false);

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }
                    else if (resumeData.status === "failed") {
                        setResult(null);
                        setLoading(false);

                        toast.error("Failed to build resume. Please try again.");

                        if (pollIntervalRef.current) {
                            clearInterval(pollIntervalRef.current);
                        }
                    }
                }
                catch (e) {
                    console.error("Polling error:", e);
                    toast.error("Network error while checking status.");

                    setLoading(false);

                    if (pollIntervalRef.current) {
                        clearInterval(pollIntervalRef.current);
                    }
                }
            }, 2000);
        }
        catch (e) {
            console.error("API Error: ", e);
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleBuild} className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-xl p-4 xs:p-6 sm:p-8">
                {/* ---- Resume Type Selector ---- */}
                <div className="mb-6">
                    <label className="block font-semibold text-foreground text-sm sm:text-base mb-3 font-heading">
                        Resume Type
                    </label>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                        {/* ---- Experienced Button ---- */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleChangeResumeType("Experienced")}
                            className={cn(
                                "relative flex flex-col items-center justify-center gap-2 h-auto py-5 px-4 w-full text-center cursor-pointer whitespace-normal",
                                resumeType === "Experienced" && "border-[rgb(var(--border-hover))]!"
                            )}
                        >
                            <div className="flex size-10 items-center justify-center rounded-full bg-[rgb(var(--border-default))]">
                                <Briefcase className="size-5" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold font-heading text-sm sm:text-base">
                                    Experienced
                                </p>
                                <p className="font-sans text-xs mt-0.5 leading-snug">
                                    Has prior work experience
                                </p>
                            </div>
                            {resumeType === "Experienced" && (
                                <CheckCircle2 className="absolute right-2.5 top-2.5 size-5 text-[rgb(var(--text-accent))]" />
                            )}
                        </Button>

                        {/* ---- Fresher Button ---- */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleChangeResumeType("Fresher")}
                            className={cn(
                                "relative flex flex-col items-center justify-center gap-2 h-auto py-5 px-4 w-full text-center cursor-pointer whitespace-normal",
                                resumeType === "Fresher" && "border-[rgb(var(--border-hover))]!"
                            )}
                        >
                            <div className="flex size-10 items-center justify-center rounded-full bg-[rgb(var(--border-default))]">
                                <Briefcase className="size-5" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold font-heading text-sm sm:text-base">
                                    Fresher
                                </p>
                                <p className="font-sans text-xs mt-0.5 leading-snug">
                                    New graduate or entry level
                                </p>
                            </div>
                            {resumeType === "Fresher" && (
                                <CheckCircle2 className="absolute right-2.5 top-2.5 size-5 text-[rgb(var(--text-accent))]" />
                            )}
                        </Button>
                    </div>
                </div>


                {/* ---- Area Label: Personal Informations ---- */}
                <ResumeBuilderInputFormPersonal
                    personalInfo={personalInfo}
                    handleChangePersonalInfo={handleChangePersonalInfo}
                    errors={{
                        fullName: errors.fullName,
                        email: errors.email,
                        phone: errors.phone,
                        location: errors.location,
                        github: errors.github,
                        linkedin: errors.linkedin
                    }}
                />

                {/* ---- Area label: Career Informations ---- */}
                <ResumeBuilderFormCareer
                    careerInfo={careerInfo}
                    careerInfoCount={careerInfoCount}
                    handleChangeCareerInfo={handleChangeCareerInfo}
                    handleChangeCompanyField={handleChangeCompanyField}
                    errors={{
                        companies: errors.companies,
                        projects: errors.projects
                    }}
                />

                {/* ---- Area Label: Job Specific Informations ---- */}
                <ResumeBuilderInputFormJob
                    jobInfo={jobInfo}
                    handleChangeJobInfo={handleChangeJobInfo}
                    errors={{ jobTitle: errors.jobTitle, jobDescription: errors.jobDescription }}
                />

                {/* ---- Action Button ---- */}
                <Button
                    className="hover:-translate-y-0.5 active:-translate-y-0.5 transition-all w-full"
                    type="submit"
                >
                    <span className="flex items-center gap-x-2">
                        Build the Resume
                        <Sparkles className="size-4.5" />
                    </span>
                </Button>
            </form>

            {/* ---- Showing modal to show the result ---- */}
            {(result !== null || loading) && (
                <ResumePreviewModal
                    result={result as ResumeData}
                    onClose={() => setResult(null)}
                    isLoading={loading}
                />
            )}

            {/* ---- Sign In Modal ---- */}
            {showSignInModal && (
                <SignInAlertModal
                    title="Please sign in to continue your build"
                    description="Sign in to build the resume and keep your resume accessible anytime."
                    onClose={() => setShowSignInModal(false)}
                    ref={modalRef}
                />
            )}
        </>
    );
};

export default ResumeBuilderForm;
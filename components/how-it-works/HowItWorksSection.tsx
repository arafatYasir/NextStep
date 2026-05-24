import Link from "next/link";
import HowItWorksStep from "./HowItWorksStep"
import Container from "../Container";
import Section from "../Section";

export const howItWorksSteps = [
    {
        id: 1,
        title: "Add the Job Details",
        description: (
            <>
                <b>Found a job you're interested in?</b> Perfect! Copy the job title and job description straight from the original job post — no formatting, no edits, no cleanup required. Head to the <Link className="underline" href="/tools/job-analyzer">Job Description Analyzer</Link> page. <br /><br /> Paste everything and click on <b>Analyze Job Description</b> button and wait till the magic happens! It will only take upto 8-10 seconds to analyze the job description.
            </>
        ),
        image: "/images/how-it-works-step-1.png",
    },
    {
        id: 2,
        title: "Review the Job Insights",
        description: (
            <>
                Once the analysis is done, you'll see a clear breakdown of the job. <b>Skills</b>, <b>key phrases</b>, <b>soft skills</b>, <b>education</b>, <b>salary range</b>, <b>experience level</b>, and <b>action verbs</b>. No guesswork, no overthinking. <br /><br /> You'll see exactly which keywords appeared and the count of them. Even copy all keywords by section (eg. <b>skills</b>) in just one click! That's how you can know which keywords are the most important for the job post.
            </>
        ),
        image: "/images/how-it-works-step-2.png",
    },
    {
        id: 3,
        title: "Test Your Resume Against the Job",
        description: (
            <>
                Upload <b>your resume</b> and compare it directly with the <b>job description</b> you analyzed earlier. Jump into <Link className="underline" href="/tools/resume-analyzer">AI Resume Analyzer</Link> page. <b>PDF</b> and <b>DOC/DOCX</b> files are fully supported, and you can upload files up to <b>5MB</b>.
                <br /><br />
                The Resume Analyzer instantly checks how well your resume matches the <b>role</b>, <b>including keywords</b>, <b>skills</b>, and important <b>requirements</b>.
            </>
        ),
        image: "/images/how-it-works-step-3.png",
    },
    {
        id: 4,
        title: "Get Detailed Resume Insights",
        description: (
            <>
                Once the analysis is complete, you'll get a complete breakdown of your resume performance. <b>ATS score</b>, <b>section-wise scores</b>, <b>matched keywords</b>, <b>missing keywords</b>, <b>overused keywords</b>, <b>formatting issues</b>, and personalized improvement suggestions.
                <br /><br />
                You'll also receive <b>section-by-section</b> feedback to understand exactly what's working and hurting your resume, and how to improve it for stronger ATS compatibility and more interview chances.
            </>
        ),
        image: "/images/how-it-works-step-4.png"
    }
];

const HowItWorksSection = () => {
    return (
        <Container>
            <Section sectionId="how-it-works">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-center tracking-tight text-foreground">
                    How It Works
                </h2>

                {/* ---- All Steps ---- */}
                <div className="flex flex-col gap-20 md:gap-30 mt-25 md:mt-40">
                    {
                        howItWorksSteps.map(step => (
                            <HowItWorksStep key={step.id} step={step} />
                        ))
                    }
                </div>
            </Section>
        </Container>
    )
}

export default HowItWorksSection
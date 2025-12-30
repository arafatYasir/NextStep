import Link from "next/link";
import HowItWorksStep from "./HowItWorksStep"

interface HowItWorksStep {
    id: number;
    title: string;
    description: React.ReactNode;
    image: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
    {
        id: 1,
        title: "Add the Job Details",
        description: (
            <>
                <b>Found a job you're interested in?</b> Perfect! Copy the job title and job description straight from the original job post — no formatting, no edits, no cleanup required. Head to the <Link href="/tools/job-analyzer">Job Description Analyzer</Link> page. Paste everything and click on <b>Analyze Job Description</b> button and wait till the magic happens! It will only take upto 10-15 seconds to analyze the job description.
            </>
        ),
        image: "/images/how-it-works-step-1.png",
    },
    {
        id: 2,
        title: "Review the Job Insights",
        description: (
            <>
                Once the analysis is done, you’ll see a clear breakdown of the job. <b>Skills</b>, <b>key phrases</b>, <b>soft skills</b>, <b>education</b>, <b>salary range</b>, <b>experience level</b>, and <b>action verbs</b>. No guesswork, no overthinking. You’ll see exactly which keywords appeared and the count of them. Even copy all keywords by section (eg. <b>skills</b>) in just one click! That’s how you can know which keywords are the most important for the job post.
            </>
        ),
        image: "/images/how-it-works-step-2.png",
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="container mx-auto px-6 py-20 space-y-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight text-foreground">
                How It Works
            </h2>

            {/* ---- All Steps ---- */}
            <div className="flex flex-col gap-20">
                {
                    howItWorksSteps.map(step => (
                        <HowItWorksStep key={step.id} step={step} />
                    ))
                }
            </div>
        </section>
    )
}

export default HowItWorks
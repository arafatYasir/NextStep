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
                <b>Found a job you're interested in?</b> Perfect! Copy the job title and job description straight from the original job post — no formatting, no edits, no cleanup required. Head to the <Link href="/tools/job-analyzer">Job Description Analyzer</Link>, paste everything and click on Analyze Job Description.
            </>
        ),
        image: "/images/how-it-works-step-1.png",
    }
];

const HowItWorks = () => {
    return (
        <section className="container mx-auto py-20 space-y-20">
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
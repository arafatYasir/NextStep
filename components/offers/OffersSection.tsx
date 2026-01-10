import Container from "../Container"
import Offer from "./Offer";

const offers = [
    {
        id: 1,
        title: "Job Description Analysis",
        description: "Understand exactly what a role is asking for in seconds. NextStep breaks down job descriptions into required skills, hidden ATS keywords, experience signals, and role expectations — with personalized AI suggestions on how to reflect them correctly in your resume."
    },
    {
        id: 2,
        title: "Job-Specific Resume Builder",
        description: "Turn one base resume into job-specific versions, or build a completely new resume from scratch — each aligned precisely with the job description, without rewriting everything or starting over every time."
    },
    {
        id: 3,
        title: "ATS Feedback Before You Apply",
        description: "See how your resume performs for a specific job before submission. Get an ATS match score, clear visibility into strong points, missing keywords, formatting issues, section problems, and smart suggestions to improve alignment and impact."
    },
    {
        id: 4,
        title: "Apply Faster With Better Precision",
        description: "Cut resume-tailoring time by 30-40% while applying to more roles with confidence. Every application becomes targeted, intentional, and aligned — not rushed or generic."
    }
];

const OffersSection = () => {
    return (
        <Container>
            <section className="py-20 space-y-20">
                <h2 className="text-center max-w-5xl mx-auto text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground leading-[1.2]">
                    What You Get With NextStep
                </h2>

                <div className="flex items-start gap-x-10">
                    {/* ---- Offers Steps ---- */}
                    <div className="flex flex-3 flex-col gap-y-5">
                        {offers.map((offer) => (
                            <Offer key={offer.id} offer={offer} />
                        ))}
                    </div>

                    {/* ---- Video ---- */}
                    <div className="flex-2 min-w-[400px] min-h-[400px] rounded-lg bg-[rgb(var(--bg-primary))]">

                    </div>
                </div>
            </section>
        </Container>
    )
}

export default OffersSection
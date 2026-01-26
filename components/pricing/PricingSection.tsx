import { pricingPlans } from "@/lib/pricing"
import Container from "../Container"
import PricingCard from "./PricingCard"
import Section from "../Section"

const PricingSection = () => {
    return (
        <Container>
            <Section sectionId="pricing">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-center tracking-tight text-foreground leading-[1.2]">
                    Simple, Fair Pricing for Your Job Search
                </h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 sm:gap-6">
                    {pricingPlans.map(plan => (
                        <PricingCard key={plan.plan} plan={plan} />
                    ))}
                </div>
            </Section>
        </Container>
    )
}

export default PricingSection
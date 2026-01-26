import { faqItems } from "@/lib/faqItems"
import Container from "../Container"
import Section from "../Section"
import FaqItem from "./FaqItem"

const FaqSection = () => {
    return (
        <Container>
            <Section>
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-center tracking-tight text-foreground leading-[1.2]">
                    Everything You're Wondering About
                </h2>

                {/* ---- Faq Items ---- */}
                <div className="flex flex-col lg:flex-row gap-5 xs:gap-6 max-w-[720px] mx-auto lg:max-w-full lg:mx-0">
                    <div className="space-y-5 xs:space-y-6">
                        {faqItems.slice(0, faqItems.length / 2).map(item => (
                            <FaqItem key={item.id} item={item} />
                        ))}
                    </div>
                    <div className="space-y-5 xs:space-y-6">
                        {faqItems.slice(faqItems.length / 2).map(item => (
                            <FaqItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </Section>
        </Container>
    )
}

export default FaqSection
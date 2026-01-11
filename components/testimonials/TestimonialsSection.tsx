import Container from "../Container";
import Section from "../Section";
import TestimonialsCarousel from "./TestimonialsCarousel";

const TestimonialsSection = () => {
    return (
        <Container>
            <Section className="py-20 space-y-20">
                <h2 className="text-center max-w-5xl mx-auto text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2] font-heading">Trusted by Developers Who Apply Smartly</h2>

                {/* ---- Testimonials Carousel ---- */}
                <TestimonialsCarousel />
            </Section>
        </Container>
    )
}

export default TestimonialsSection;
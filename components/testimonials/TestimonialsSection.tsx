import Container from "../Container";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
    return (
        <Container>
            <section className="py-20 space-y-20">
                <h2 className="text-center max-w-5xl mx-auto text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2] font-heading">Trusted by Developers Who Want to Apply Smarter</h2>

                <TestimonialCard />
            </section>
        </Container>
    )
}

export default TestimonialsSection;
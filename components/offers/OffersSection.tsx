import Image from "next/image";
import Container from "../Container"
import Offer from "./Offer";
import { offers } from "@/lib/offers";
import Section from "../Section";

const OffersSection = () => {
    return (
        <Container>
            <Section className="py-20 space-y-20">
                <h2 className="text-center max-w-5xl mx-auto text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground leading-[1.2]">
                    What You Get From NextStep
                </h2>

                <div className="flex flex-col items-center lg:flex-row lg:items-start gap-x-10 gap-y-10">
                    {/* ---- Offers Steps ---- */}
                    <ul className="flex flex-3 flex-col">
                        {offers.map((offer) => (
                            <Offer key={offer.id} offer={offer} />
                        ))}
                    </ul>

                    {/* ---- Image ---- */}
                    <div className="flex-2 max-w-[500px] aspect-square rounded-lg bg-[rgb(var(--bg-primary))] overflow-hidden">
                        <Image
                            src="/images/person.webp"
                            width={500}
                            height={500}
                            alt="A person applying for jobs"
                            className="w-full h-full object-cover"
                        ></Image>
                    </div>
                </div>
            </Section>
        </Container>
    )
}

export default OffersSection
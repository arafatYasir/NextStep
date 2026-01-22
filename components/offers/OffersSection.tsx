import Image from "next/image";
import Container from "../Container"
import Offer from "./Offer";
import { offers } from "@/lib/offers";
import Section from "../Section";

const OffersSection = () => {
    return (
        <Container>
            <Section className="py-20 space-y-20">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-center tracking-tight text-foreground leading-[1.2]">
                    What You Get From NextStep
                </h2>

                <div className="flex flex-col-reverse items-center md:flex-row md:items-start gap-x-5 lg:gap-x-10 gap-y-5 lg:gap-y-10 max-w-[480px] md:max-w-full mx-auto">
                    {/* ---- Offers Steps ---- */}
                    <ul className="flex flex-3 flex-col">
                        {offers.map((offer) => (
                            <Offer key={offer.id} offer={offer} />
                        ))}
                    </ul>

                    {/* ---- Image ---- */}
                    <div className="flex-2 aspect-square rounded-lg bg-[rgb(var(--bg-primary))] overflow-hidden">
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
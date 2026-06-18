import Container from "@/components/Container"
import CoverLetterWriterForm from "@/components/CoverLetterWriterForm"
import Section from "@/components/Section"
import LongDownArrowIcon from "@/icons/LongDownArrowIcon"

const CoverLetterWriterPage = () => {
    return (
        <div className="bg-linear-to-br from-[rgb(var(--bg-primary))]/2 to-[rgb(var(--bg-primary-hover))]/40 min-h-screen min-h-svh">
            <Container>
                <Section className="flex flex-col items-center gap-y-6 py-25" resetStyles={true}>
                    {/* ---- Header Texts ---- */}
                    <div className="text-center">
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] mb-4 font-heading bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary-hover))] to-[rgb(var(--bg-primary))]/75">
                            AI Cover Letter Writer
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg font-sans text-foreground/80 sm:max-w-3xl leading-relaxed sm:text-balance">
                            Instantly create personalized, professional cover letters for any job — so you can show your strengths, match expectations, and apply with confidence in minutes.
                        </p>
                    </div>

                    {/* ---- Downward Arrow ---- */}
                    <div className="text-[rgb(var(--bg-primary-hover))]">
                        <LongDownArrowIcon width={30} height={60} />
                    </div>

                    {/* ---- Input Card ---- */}
                    <CoverLetterWriterForm />
                </Section>
            </Container>
        </div>
    )
}

export default CoverLetterWriterPage
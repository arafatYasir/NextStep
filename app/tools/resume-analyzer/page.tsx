import Container from "@/components/Container";
import ResumeAnalyzerInputForm from "@/components/ResumeAnalyzerInputForm";
import Section from "@/components/Section";

const ResumeAnalysesPage = () => {
    return (
        <div className="bg-linear-to-br from-[rgb(var(--bg-primary))]/2 to-[rgb(var(--bg-primary-hover))]/40 min-h-screen min-h-svh">
            <Container>
                <Section className="flex flex-col items-center gap-y-6 py-25" resetStyles={true}>
                    {/* ---- Header Texts ---- */}
                    <div className="text-center">
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] mb-4 font-heading bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary-hover))] to-[rgb(var(--bg-primary))]/75">
                            AI Resume Analyzer
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg font-sans text-foreground/80 sm:max-w-3xl leading-relaxed sm:text-balance">
                            Analyze your resume the way hiring systems do — uncover strengths, gaps, keyword alignment, and formatting issues so you can improve it with confidence before applying.
                        </p>
                    </div>

                    {/* ---- Form Section ---- */}
                    <ResumeAnalyzerInputForm />
                </Section>
            </Container>
        </div>
    );
}

export default ResumeAnalysesPage

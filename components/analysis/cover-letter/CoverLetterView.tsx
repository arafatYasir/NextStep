import Container from "@/components/Container";
import CopyBtn from "@/components/CopyBtn";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateLetterCopyContent } from "@/src/helpers/helperFunctions";
import { CoverLetter } from "@/types/global";
import { Building2, Download, Pen } from "lucide-react";

const CoverLetterView = ({ result }: { result: CoverLetter }) => {
    const { coverLetter } = result;

    const copyContent = generateLetterCopyContent(coverLetter);

    return (
        <Container>
            <div className="py-8 lg:py-12 flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center gap-4">
                {/* ---- Letter Document ---- */}
                <div
                    className={cn(
                        "w-full space-y-6",
                        "max-w-3xl bg-card rounded-xl shadow-xl border border-[rgb(var(--border-default))] p-5 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    )}
                >
                    {/* ---- Header: Role + Company + Meta ---- */}
                    <div className="space-y-2 pb-5 border-b border-[rgb(var(--border-default))]">
                        <h1 className="text-base xs:text-xl sm:text-2xl md:text-3xl font-bold font-heading tracking-tight text-foreground">
                            {result.jobTitle}
                        </h1>
                        <h2 className="flex items-center gap-x-2 text-sm xs:text-base sm:text-lg font-semibold font-heading tracking-tight">
                            <Building2 className="size-4 xs:size-4.5 shrink-0" />
                            <span className="text-[rgb(var(--text-accent))]">{result.companyName}</span>
                        </h2>
                        <div className="flex items-center justify-between gap-y-1 flex-wrap text-[10px] xs:text-xs sm:text-sm font-sans font-medium pt-1">
                            <p>
                                <span>Letter Tone: </span>
                                <span className="text-[rgb(var(--text-accent))]">
                                    {result.letterTone}
                                </span>
                            </p>
                            <p>
                                <span>Letter Type: </span>
                                <span className="text-[rgb(var(--text-accent))]">
                                    {result.letterType}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* ---- Letter Body ---- */}
                    <div className="space-y-4 font-sans text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
                        {coverLetter.greeting && (
                            <p className="text-foreground font-medium">{coverLetter.greeting}</p>
                        )}

                        {coverLetter.opening && <p>{coverLetter.opening}</p>}

                        {coverLetter.paragraphs?.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}

                        {coverLetter.closing && <p>{coverLetter.closing}</p>}
                    </div>

                    {/* ---- Signature ---- */}
                    {coverLetter.signature && (
                        <div className="pt-4 space-y-0.5 font-sans text-sm">
                            <p className="text-[rgb(var(--text-secondary))]">Sincerely,</p>
                            <p className="text-foreground font-heading font-semibold text-base">
                                {coverLetter.signature}
                            </p>
                        </div>
                    )}
                </div>

                {/* ---- Options ---- */}
                <div className="lg:sticky top-0 flex lg:flex-col items-start gap-2">
                    {/* ---- Copy Btn ---- */}
                    <CopyBtn copyContent={copyContent} />

                    {/* ---- Edit Btn ---- */}
                    <Button
                        type="button"
                        title="Edit"
                        variant="secondary"
                        className="has-[>svg]:p-2 text-foreground/80 hover:text-foreground active:text-foreground transition-all active:scale-95 border border-[rgb(var(--border-default))]"
                    >
                        <Pen className="size-3.5 xs:size-4.5" />
                    </Button>

                    {/* ---- Download Btn ---- */}
                    <Button
                        type="button"
                        title="Download"
                        variant="secondary"
                        className="has-[>svg]:p-2 text-foreground/80 hover:text-foreground active:text-foreground transition-all active:scale-95 border border-[rgb(var(--border-default))]"
                    >
                        <Download className="size-4 xs:size-4.5" />
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default CoverLetterView;
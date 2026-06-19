import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { CoverLetter } from "@/types/global";

const CoverLetterView = ({ result }: { result: CoverLetter }) => {
    const { coverLetter } = result;

    return (
        <Container>
            <div className="py-8 lg:py-12 flex items-start justify-center">
                {/* ---- Letter Document ---- */}
                <div
                    className={cn(
                        "w-full space-y-6",
                        "max-w-3xl bg-card rounded-xl shadow-xl border border-[rgb(var(--border-default))] p-5 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    )}
                >
                    {/* ---- Header: Role + Company + Meta ---- */}
                    <div className="space-y-2 pb-5 border-b border-[rgb(var(--border-default))]">
                        <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground">
                            {result.jobTitle}
                        </h1>
                        <h2 className="text-lg sm:text-xl font-semibold font-heading tracking-tight text-[rgb(var(--text-accent))]">
                            {result.companyName}
                        </h2>
                        <div className="flex items-center gap-x-2 gap-y-1 flex-wrap text-xs font-sans pt-1">
                            <span className="px-2.5 py-1 rounded-full bg-[rgb(var(--bg-primary))]/10 text-[rgb(var(--text-accent))] font-medium">
                                {result.letterTone}
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-[rgb(var(--bg-primary))]/10 text-[rgb(var(--text-accent))] font-medium">
                                {result.letterType}
                            </span>
                        </div>
                    </div>

                    {/* ---- Recipient ---- */}
                    <div className="space-y-0.5 font-sans text-sm text-[rgb(var(--text-secondary))]">
                        <p className="font-semibold text-foreground">
                            {result.hiringManagerName || "Hiring Manager"}
                        </p>
                        <p>{result.companyName}</p>
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
            </div>
        </Container>
    );
};

export default CoverLetterView;
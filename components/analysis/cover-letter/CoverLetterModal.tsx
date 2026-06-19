import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { CoverLetter } from "@/types/global";
import { X } from "lucide-react";
import CoverLetterLoadingView from "./CoverLetterLoadingView";
import CoverLetterView from "./CoverLetterView";

interface CoverLetterModalProps {
    result: CoverLetter;
    onClose: () => void;
    isLoading: boolean;
}

const CoverLetterModal = ({ result, onClose, isLoading }: CoverLetterModalProps) => {
    return (
        <div className="fixed inset-0 z-100 flex flex-col bg-[rgb(var(--bg-body))]">
            {/* ---- Header ---- */}
            <div className="flex-none py-4 border-b border-[rgb(var(--border-default))] bg-card z-10 shadow-sm">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground font-heading tracking-tight">
                                {isLoading ? "Writing Your Cover Letter" : "Cover Letter Preview"}
                            </h2>
                            <p className="text-foreground/80 mt-1 font-sans text-sm sm:text-base">
                                {isLoading
                                    ? "Our AI is crafting a tailored cover letter based on your details."
                                    : "Your AI-generated cover letter is ready."}
                            </p>
                        </div>
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            variant="secondary"
                            className="border border-[rgb(var(--border-default))] text-foreground/80 hover:text-foreground active:text-foreground has-[>svg]:p-2"
                            aria-label="Close Modal"
                        >
                            <X size={24} />
                        </Button>
                    </div>
                </Container>
            </div>

            {/* ---- Content ---- */}
            <div className="flex-1 overflow-y-auto scrollbar-custom scroll-smooth">
                {isLoading ? (
                    <CoverLetterLoadingView />
                ) : (
                    <CoverLetterView result={result} />
                )}
            </div>
        </div>
    );
};

export default CoverLetterModal;
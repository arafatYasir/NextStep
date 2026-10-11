"use client";

import Container from "@/components/Container";
import { CoverLetter } from "@/types/global";
import CoverLetterLoadingView from "./CoverLetterLoadingView";
import CoverLetterView from "./CoverLetterView";
import { useEffect } from "react";
import ModalCloseBtn from "@/components/ModalCloseBtn";

interface CoverLetterModalProps {
    result: CoverLetter;
    onClose: () => void;
    isLoading: boolean;
}

const CoverLetterModal = ({ result, onClose, isLoading }: CoverLetterModalProps) => {
    // Preventing background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    
    return (
        <div className="fixed inset-0 z-100 flex flex-col bg-[rgb(var(--bg-body))]">
            {/* ---- Header ---- */}
            <div className="flex-none py-4 border-b border-[rgb(var(--border-default))] bg-card z-10 shadow-sm">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-sm xs:text-base sm:text-xl md:text-2xl font-bold text-foreground font-heading tracking-tight">
                                {isLoading ? "Writing Your Cover Letter" : "Cover Letter Preview"}
                            </h2>
                            <p className="text-foreground/80 mt-1 font-sans text-xs xs:text-sm sm:text-base">
                                {isLoading
                                    ? "Our AI is crafting a tailored cover letter based on your details."
                                    : "Your AI-generated cover letter is ready."}
                            </p>
                        </div>
                        
                        {/* ---- Close Btn ---- */}
                        <ModalCloseBtn onClick={onClose} disabled={isLoading} />
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
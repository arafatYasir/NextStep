import { X } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    ref: React.RefObject<HTMLDivElement | null>;
    onClose: () => void;
    title: string;
    action: () => void;
}

const ConfirmationModal = ({ ref, onClose, title, action }: Props) => {
    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 animate-in fade-in duration-250">
            <div ref={ref} className="relative w-full max-w-lg flex flex-col justify-center items-center bg-card rounded-xl shadow-xl border border-[rgb(var(--border-light))] p-6 xs:p-8 md:p-10">
                {/* ---- Close Button ---- */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 xs:top-4 xs:right-4 text-foreground/80 hover:text-foreground active:text-foreground transition-all cursor-pointer active:scale-90"
                    aria-label="Close Modal"
                >
                    <X className="w-5 h-5 xs:w-[22px] xs:h-[22px] sm:w-6 sm:h-6" />
                </button>

                <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold font-heading text-center tracking-tight mb-2">
                    {title}
                </h3>

                {/* ---- Buttons ---- */}
                <div className="flex justify-center gap-4 mt-4">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="w-full"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={action}
                        className="w-full"
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
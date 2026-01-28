import { X } from "lucide-react";
import { Button } from "./ui/button"
import Link from "next/link";

interface Props {
    title: string;
    onClose: () => void;
    ref: React.RefObject<HTMLDivElement | null>
}

const SignInAlertModal = ({ title, onClose, ref }: Props) => {
    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
            <div ref={ref} className="relative w-full max-w-lg flex flex-col justify-center items-center bg-card rounded-xl shadow-xl border border-[rgb(var(--border-light))] p-6 xs:p-8 md:p-12">
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

                <p className="text-foreground/80 text-center leading-relaxed mb-6 font-sans text-xs xs:text-sm sm:text-base">
                    Sign in to generate detailed insights and keep your analysis accessible anytime.
                </p>

                <Link className="block w-full" href="/sign-in">
                    <Button className="w-full hover:-translate-y-0.5 active:-translate-y-0.5 transition-all">
                        Sign In
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default SignInAlertModal
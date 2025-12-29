import { X } from "lucide-react";
import { Button } from "./ui/button"
import Link from "next/link";

interface Props {
    heading: string;
    onClose: () => void;
    ref: React.RefObject<HTMLDivElement | null>
}

const SignInAlertModal = ({ heading, onClose, ref }: Props) => {
    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
            <div ref={ref} className="relative w-full max-w-lg flex flex-col justify-center items-center bg-[rgb(var(--bg-surface))] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-[rgb(var(--border-light))] p-8 md:p-12">
                {/* ---- Close Button ---- */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-all cursor-pointer active:scale-90"
                    aria-label="Close Modal"
                >
                    <X size={22} />
                </button>

                <h3 className="text-xl font-bold font-heading text-center tracking-tight mb-2">
                    {heading}
                </h3>

                <p className="text-[rgb(var(--text-secondary))] text-center leading-relaxed mb-6">
                    Sign in to generate detailed insights and keep your analysis accessible anytime.
                </p>

                <Link className="block w-full" href="/sign-in">
                    <Button className="w-full cursor-pointer bg-linear-to-r bg-[rgb(var(--bg-surface))] from-[rgb(var(--bg-primary-hover))] to-[rgb(var(--bg-primary))]/80 text-white text-base font-semibold hover:-translate-y-0.5 transition-all duration-300">
                        Sign In
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default SignInAlertModal
import GitHubIcon from "@/icons/GithubIcon";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-sm border-b border-slate-200">
            <div className="container mx-auto px-6 py-4">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                        <Image src="/images/logo.svg" alt="Logo" width={24} height={24} />
                        <span>Keyword Insight Engine</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/about"
                            className="text-base text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="https://github.com/arafatYasir/Keyword-Insight-Engine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2"
                        >
                            <GitHubIcon />
                            <span>GitHub</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;

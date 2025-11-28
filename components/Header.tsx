import GitHubIcon from "@/icons/GithubIcon";
import Image from "next/image";
import Link from "next/link";
import ThemeToggleBtn from "./ThemeToggleBtn";

const Header = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-[rgba(var(--bg-surface-alpha),var(--alpha-backdrop))] backdrop-blur-sm border-b border-[rgb(var(--border-default))]">
            <div className="container mx-auto px-6 py-4">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-[rgb(var(--text-primary))] font-heading flex items-center gap-2">
                        <Image src="/images/logo.svg" alt="Logo" width={24} height={24} />
                        <span>Keyword Insight Engine</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/about"
                            className="text-base text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="https://github.com/arafatYasir/Keyword-Insight-Engine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors flex items-center gap-2"
                        >
                            <GitHubIcon />
                            <span>GitHub</span>
                        </Link>
                        <ThemeToggleBtn />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;

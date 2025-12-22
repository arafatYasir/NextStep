import GitHubIcon from "@/icons/GithubIcon";
import Image from "next/image";
import Link from "next/link";
import AuthenticationMenus from "./AuthenticationMenus";

const Header = async () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-[rgba(var(--bg-surface-alpha),var(--alpha-backdrop))] backdrop-blur-sm border-b border-[rgb(var(--border-default))]">
            <div className="container mx-auto px-6 py-3">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/images/logo.svg" alt="Logo" width={24} height={24} />
                        <span className="text-[22px] font-bold text-[rgb(var(--text-primary))] font-logo">KIE</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            href="https://github.com/arafatYasir/Keyword-Insight-Engine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-surface))] transition-all border border-[rgb(var(--border-default))] dark:border-white"
                        >
                            <GitHubIcon width={16} height={16} />
                            <span className="text-[rgb(var(--text-primary))]">GitHub</span>
                        </Link>

                        {/* Authentication Menus */}
                        <AuthenticationMenus />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;

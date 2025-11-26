const Header = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-slate-900 font-heading">
                        Keyword Insight Engine
                    </h1>

                    <nav className="flex items-center gap-6">
                        <a
                            href="#about"
                            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            GitHub
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;

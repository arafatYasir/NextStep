import Link from "next/link";
import Image from "next/image";
import Container from "../Container";
import { Button } from "../ui/button";
import { navOptions } from "@/lib/navOptions";

const Footer = () => {
    // Extract tools from navOptions to keep footer in sync with navbar
    const tools = navOptions.find(opt => opt.name === "Tools")?.type === "Submenu"
        ? (navOptions.find(opt => opt.name === "Tools") as NavSubmenu).childrens
        : [];

    return (
        <footer className="w-full mt-20 bg-background border-t border-[rgb(var(--border-default))]">
            <Container>
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* ---- Column 1: Branding ---- */}
                    <div className="flex flex-col gap-6 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-x-2">
                            <div className="w-[140px] h-[35px] overflow-hidden">
                                <Image
                                    src="/images/logo.svg"
                                    alt="Logo"
                                    width={488}
                                    height={123}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Link>
                        <p className="font-sans text-foreground/80 leading-relaxed max-w-xs">
                            Your personal AI career copilot. Providing precision intelligence to help developers land more interviews and better roles.
                        </p>
                    </div>

                    {/* ---- Column 2: Product ---- */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-foreground">
                            Product
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {tools.map((tool) => (
                                <li key={tool.id}>
                                    <Link
                                        href={tool.url}
                                        className="font-sans text-foreground/80 hover:text-[rgb(var(--bg-primary-hover))] transition-colors"
                                    >
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---- Column 3: Company ---- */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-foreground">
                            Company
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {[
                                { name: "About", href: "/about" },
                                { name: "Pricing", href: "#pricing" },
                                { name: "FAQ", href: "#faq" },
                                { name: "Contact", href: "/contact" },
                                { name: "Dashboard", href: "/dashboard" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="font-sans text-foreground/80 hover:text-[rgb(var(--bg-primary-hover))] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---- Column 4: Legals ---- */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-foreground">
                            Legal
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((legal) => (
                                <li key={legal}>
                                    <Link
                                        href="#"
                                        className="font-sans text-foreground/80 hover:text-[rgb(var(--bg-primary-hover))] transition-colors"
                                    >
                                        {legal}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ---- Bottom Bar ---- */}
                <div className="py-8 border-t border-[rgb(var(--border-default))] flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-muted-foreground font-sans text-sm">
                        © {new Date().getFullYear()} NextStep. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="https://github.com" className="text-foreground/60 hover:text-foreground transition-colors">
                            <span className="sr-only">GitHub</span>
                            {/* GitHub icon would go here if needed, keeping it minimal as per nav */}
                        </Link>
                        <p className="text-muted-foreground font-sans text-sm">
                            Crafted with precision for developers.
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;

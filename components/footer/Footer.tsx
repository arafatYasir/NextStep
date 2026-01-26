import Link from "next/link";
import Image from "next/image";
import Container from "../Container";
import { navOptions } from "@/lib/navOptions";

const Footer = () => {
    // Extract tools from navOptions
    const tools = navOptions.find(opt => opt.name === "Tools")?.type === "Submenu"
        ? (navOptions.find(opt => opt.name === "Tools") as NavSubmenu).childrens
        : [];

    return (
        <footer className="w-full mt-20 bg-card border-t border-[rgb(var(--border-default))]">
            <Container>
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                    {/* ---- Column 1: Branding ---- */}
                    <div className="flex flex-col gap-6 lg:col-span-4">
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
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-foreground">
                            Product
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {tools.map((tool) => (
                                <li key={tool.id}>
                                    <Link
                                        href={tool.url}
                                        className="font-sans text-foreground/80 hover:underline hover:text-[rgb(var(--bg-primary-hover))] active:underline active:text-[rgb(var(--bg-primary-hover))] transition-colors duration-250"
                                    >
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---- Column 3: Company ---- */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
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
                                        className="font-sans text-foreground/80 hover:underline hover:text-[rgb(var(--bg-primary-hover))] active:underline active:text-[rgb(var(--bg-primary-hover))] transition-colors duration-250"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---- Column 4: Legals ---- */}
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-foreground">
                            Legal
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((legal) => (
                                <li key={legal}>
                                    <Link
                                        href="#"
                                        className="font-sans text-foreground/80 hover:underline hover:text-[rgb(var(--bg-primary-hover))] active:underline active:text-[rgb(var(--bg-primary-hover))] transition-colors duration-250"
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

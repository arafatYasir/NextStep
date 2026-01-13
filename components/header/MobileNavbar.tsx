import Image from "next/image"
import Link from "next/link"
import AuthenticationMenus from "./AuthenticationMenus"
import NavbarMenu from "./NavbarMenu"

const MobileNavbar = () => {
    return (
        <nav className="flex lg:hidden items-center justify-between py-3">
            {/* ---- Logo ---- */}
            <div>
                <Link href="/">
                    <div className="w-[140px] h-[30px] overflow-hidden">
                        <Image src="/images/logo.svg" alt="Logo" width={488} height={123} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
                    </div>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {/* ---- Authentication Menus ---- */}
                <AuthenticationMenus />

                {/* ---- Navbar Menu ---- */}
                <NavbarMenu />
            </div>
        </nav>
    )
}

export default MobileNavbar
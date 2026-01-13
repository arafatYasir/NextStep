import Container from "../Container";
import MainNavbar from "./MainNavbar";
import MobileNavbar from "./MobileNavbar";

const Header = async () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-[rgb(var(--bg-surface-alpha))] border-b border-[rgb(var(--border-default))] backdrop-blur-xs">
            <Container>
                {/* ---- Main Navbar: Laptop -> Desktop ---- */}
                <MainNavbar />

                {/* ---- Mobile Navbar: Mobile -> Tablet ---- */}
                <MobileNavbar />
            </Container>
        </header>
    );
};

export default Header;
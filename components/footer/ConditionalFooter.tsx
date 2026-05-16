"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const ConditionalFooter = () => {
    const pathname = usePathname();

    // List of paths where the footer should not be displayed
    const hiddenPaths = ["/tools/job-analyzer", "/tools/resume-analyzer", "/tools/resume-builder", "/tools/cover-letter-writer"];

    // Check if the current path is among the hiddenPaths list
    const isFooterHidden = hiddenPaths.includes(pathname) || pathname.startsWith("/dashboard");

    return (
        <>
            {!isFooterHidden && <Footer />}
        </>
    )
};

export default ConditionalFooter;

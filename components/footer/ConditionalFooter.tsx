"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const ConditionalFooter = () => {
    const pathname = usePathname();

    // List of paths where the footer should NOT be displayed
    const hiddenPaths = ["/tools/job-analyzer", "/tools/resume-analyzer", "/tools/resume-builder", "/tools/cover-letter-writer", "/dashboard"];

    // Check if the current path is in the hiddenPaths list
    const isFooterHidden = hiddenPaths.includes(pathname);

    if (isFooterHidden) {
        return null;
    }

    return <Footer />;
};

export default ConditionalFooter;

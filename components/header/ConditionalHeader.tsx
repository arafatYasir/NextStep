"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const ConditionalHeader = () => {
    const pathname = usePathname();

    // List of paths where the header should NOT be displayed
    const hiddenPaths = ["/dashboard"];

    // Check if the current path is in the hiddenPaths list
    const isHeaderHidden = hiddenPaths.includes(pathname);

    if (isHeaderHidden) {
        return null;
    }

    return (
        <Header />
    )
}

export default ConditionalHeader
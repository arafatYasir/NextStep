"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const ConditionalHeader = () => {
    const pathname = usePathname();
    const isHidden = pathname.startsWith("/dashboard") || pathname.startsWith("/resume/print");
    
    return (
        <>
            {!isHidden && <Header />}
        </>
    );
};

export default ConditionalHeader;
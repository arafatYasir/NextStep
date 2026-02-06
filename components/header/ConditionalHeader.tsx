"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const ConditionalHeader = () => {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");
    
    return (
        <>
            {!isDashboard && <Header />}
        </>
    );
};

export default ConditionalHeader;
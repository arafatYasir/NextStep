import ConditionalFooter from "@/components/footer/ConditionalFooter";
import ConditionalHeader from "@/components/header/ConditionalHeader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                {/* ---- Header ---- */}
                <ConditionalHeader />

                {/* ---- Main Content ---- */}
                {children}

                {/* ---- Footer ---- */}
                <ConditionalFooter />
            </body>
        </html>
    );
}
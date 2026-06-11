export const maxDuration = 60;

import { requireAuth } from "@/src/helpers/requireAuth";
import { mongodbIDRegex } from "@/src/helpers/validation";
import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ resumeId: string }> }
) {
    try {
        // Check authentication
        const auth = await requireAuth();
        if (auth.unauthorized) return auth.unauthorized;

        // Await params (required in Next.js 15)
        const { resumeId } = await params;

        // Validate resume ID
        if (!mongodbIDRegex.test(resumeId)) {
            return NextResponse.json({ message: "Invalid resume ID" }, { status: 400 });
        }

        // Build print URL
        const baseUrl =
            process.env.NODE_ENV === "development"
                ? process.env.NEXT_PUBLIC_SITE_URL_DEV
                : process.env.NEXT_PUBLIC_SITE_URL_PROD;

        const url = `${baseUrl}/resume/print/${resumeId}`;

        // Launch Chromium
        const browser = await (process.env.NODE_ENV === "development"
            ? (await import("puppeteer")).default.launch({
                args: [],
                headless: true,
            })
            : (await import("puppeteer-core")).default.launch({
                args: chromium.args,
                defaultViewport: { width: 1280, height: 720 },
                executablePath: await chromium.executablePath("https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-layer.arm64.zip"),
                headless: true,
            })
        );

        try {
            const page = await browser.newPage();

            await page.goto(url, {
                waitUntil: "networkidle0",
                timeout: 60000,
            });

            // Wait for full render (fonts, layout)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Generate PDF
            const pdf = await page.pdf({
                format: "A4",
                margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
            });

            // Return binary PDF
            return new NextResponse(Buffer.from(pdf), {
                status: 200,
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": `attachment; filename="resume-${resumeId}.pdf"`,
                    "Cache-Control": "private, max-age=300",
                },
            });
        } catch (e) {
            throw e;
        } finally {
            await browser.close();
        }
    } catch (e) {
        console.error("PDF generation failed:", e);
        return NextResponse.json({ message: "Failed to generate PDF" }, { status: 500 });
    }
}
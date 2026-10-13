import chromium from "@sparticuz/chromium";
import type { Browser } from "puppeteer-core";

let browserPromise: Promise<Browser> | null = null;

async function launch(): Promise<Browser> {
    if (process.env.NODE_ENV === "development") {
        const puppeteer = (await import("puppeteer")).default;

        return (await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        })) as unknown as Browser;
    }

    chromium.setGraphicsMode = false;
    const puppeteer = (await import("puppeteer-core")).default;
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: "shell"
    });

    browser.on("disconnected", () => { browserPromise = null });
    return browser;
}

async function getBrowser(): Promise<Browser> {
    if (browserPromise) {
        const existing = await browserPromise.catch(() => null);

        if (existing?.connected) return existing;

        browserPromise = null;
    }

    browserPromise = launch();
    return browserPromise;
}

export async function renderPdf(html: string): Promise<Uint8Array> {
    const browser = await getBrowser();
    const page = await browser.newPage();

    try {
        await page.setJavaScriptEnabled(false);
        await page.setRequestInterception(true);

        page.on("request", (req) => {
            const url = req.url();

            if (url.startsWith("data:") || url === "about:blank") req.continue();
            else req.abort();
        });

        await page.setContent(html, { waitUntil: "load", timeout: 15000 });

        return await page.pdf({
            preferCSSPageSize: true,
            printBackground: false,
        });
    } finally {
        await page.close();
    }
}
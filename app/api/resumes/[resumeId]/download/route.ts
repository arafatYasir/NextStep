import { connectToDatabase } from "@/src/database/mongodb";
import { requireAuth } from "@/src/helpers/requireAuth";
import resumeModel from "@/src/models/resume.model";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ resumeId: string }> }
) {
    try {
        // Verify Authentication
        const auth = await requireAuth();
        if (auth.unauthorized) {
            return auth.unauthorized;
        }

        const { resumeId } = await params;
        if (!resumeId) {
            return NextResponse.json(
                { status: "ERROR", message: "Invalid resume id" },
                { status: 400 }
            );
        }

        // Fetch Visual Theme Settings from Request Body
        const body = await req.json().catch(() => ({}));
        const accentTheme = body.theme || "slate";
        const typography = body.font || "sans";

        // Connect to Database & Retrieve Resume Record
        await connectToDatabase();
        const resumeRecord = await resumeModel.findById(resumeId);

        if (!resumeRecord) {
            return NextResponse.json(
                { status: "ERROR", message: "Resume record not found" },
                { status: 404 }
            );
        }

        // Ensure user is authorized to download this specific record
        if (resumeRecord.userId !== auth.user.id) {
            return NextResponse.json(
                { status: "ERROR", message: "Forbidden" },
                { status: 403 }
            );
        }

        // 4. Map Accent Color Codes
        const themeColors: Record<string, { primary: string; secondary: string }> = {
            navy: { primary: "#1e3a8a", secondary: "#3b82f6" },
            slate: { primary: "#0f172a", secondary: "#475569" },
            emerald: { primary: "#064e3b", secondary: "#10b981" },
            purple: { primary: "#4c1d95", secondary: "#8b5cf6" },
        };

        const activeColor = themeColors[accentTheme] || themeColors.slate;
        const fontStack =
            typography === "serif"
                ? "Georgia, Cambria, 'Times New Roman', Times, serif"
                : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

        // 5. Build Print-Optimized HTML Template
        const { personalInfo, summary, skills, experience, projects, education } = resumeRecord;

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${personalInfo.fullName} - Resume</title>
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                body {
                    font-family: ${fontStack};
                    color: #1e293b;
                    background: #ffffff;
                    line-height: 1.4;
                    font-size: 11.5px;
                    -webkit-font-smoothing: antialiased;
                }
                .container {
                    width: 100%;
                    padding: 0;
                }
                
                /* Header Styling */
                header {
                    text-align: center;
                    border-bottom: 2px solid ${activeColor.primary};
                    padding-bottom: 12px;
                    margin-bottom: 14px;
                }
                h1 {
                    font-size: 26px;
                    font-weight: 700;
                    color: ${activeColor.primary};
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 4px;
                }
                .subtitle {
                    font-size: 12px;
                    font-weight: 600;
                    color: ${activeColor.secondary};
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                }
                .contact-info {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 12px;
                    font-size: 10px;
                    color: #475569;
                }
                .contact-info span {
                    display: flex;
                    align-items: center;
                }
                .contact-info a {
                    color: #475569;
                    text-decoration: none;
                }
                .divider {
                    color: #cbd5e1;
                    margin: 0 4px;
                }

                /* Section Styling */
                section {
                    margin-bottom: 14px;
                }
                .section-title {
                    font-size: 12.5px;
                    font-weight: 700;
                    color: ${activeColor.primary};
                    text-transform: uppercase;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 3px;
                    margin-bottom: 8px;
                    letter-spacing: 0.5px;
                }
                
                /* Summary styling */
                .summary-text {
                    text-align: justify;
                    color: #334155;
                }

                /* Skills layout */
                .skills-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .skills-category {
                    display: grid;
                    grid-template-columns: 140px 1fr;
                    font-size: 11px;
                }
                .category-name {
                    font-weight: 700;
                    color: #475569;
                }
                .category-values {
                    color: #334155;
                }

                /* Work Experience & Projects */
                .entry {
                    margin-bottom: 10px;
                }
                .entry:last-child {
                    margin-bottom: 0;
                }
                .entry-header {
                    display: flex;
                    justify-content: space-between;
                    font-weight: 700;
                    font-size: 11.5px;
                    color: #0f172a;
                    margin-bottom: 2px;
                }
                .entry-company {
                    color: ${activeColor.primary};
                }
                .entry-duration {
                    font-weight: 500;
                    color: #64748b;
                }
                .entry-sub {
                    display: flex;
                    justify-content: space-between;
                    font-style: italic;
                    color: #475569;
                    font-size: 11px;
                    margin-bottom: 4px;
                }
                .entry-list {
                    margin-left: 14px;
                    color: #334155;
                }
                .entry-list li {
                    margin-bottom: 2px;
                    text-align: justify;
                }
                .entry-list li:last-child {
                    margin-bottom: 0;
                }

                /* Education List */
                .edu-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .edu-entry {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                }
                .edu-degree {
                    font-weight: 700;
                    color: #0f172a;
                }
                .edu-details {
                    color: #475569;
                }
                .edu-duration {
                    color: #64748b;
                }

                @media print {
                    body {
                        background: none;
                        color: #000;
                    }
                    section {
                        page-break-inside: avoid;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <header>
                    <h1>${personalInfo.fullName}</h1>
                    <div class="subtitle">${resumeRecord.jobTitle}</div>
                    <div class="contact-info">
                        <span>📍 ${personalInfo.location}</span>
                        <span class="divider">|</span>
                        <span>📞 ${personalInfo.phone}</span>
                        <span class="divider">|</span>
                        <span>✉️ <a href="mailto:${personalInfo.email}">${personalInfo.email}</a></span>
                        <span class="divider">|</span>
                        <span>🌐 <a href="${personalInfo.github}" target="_blank">GitHub</a></span>
                        <span class="divider">|</span>
                        <span>🔗 <a href="${personalInfo.linkedin}" target="_blank">LinkedIn</a></span>
                    </div>
                </header>

                <!-- Professional Summary -->
                <section>
                    <div class="section-title">Professional Summary</div>
                    <p class="summary-text">${summary}</p>
                </section>

                <!-- Technical Skills -->
                <section>
                    <div class="section-title">Technical Skills</div>
                    <div class="skills-grid">
                        ${
                            skills.languages?.length
                                ? `
                        <div class="skills-category">
                            <div class="category-name">Languages</div>
                            <div class="category-values">${skills.languages.join(", ")}</div>
                        </div>`
                                : ""
                        }
                        ${
                            skills.frameworksAndLibraries?.length
                                ? `
                        <div class="skills-category">
                            <div class="category-name">Frameworks & Libraries</div>
                            <div class="category-values">${skills.frameworksAndLibraries.join(", ")}</div>
                        </div>`
                                : ""
                        }
                        ${
                            skills.toolsAndPlatforms?.length
                                ? `
                        <div class="skills-category">
                            <div class="category-name">Tools & Platforms</div>
                            <div class="category-values">${skills.toolsAndPlatforms.join(", ")}</div>
                        </div>`
                                : ""
                        }
                        ${
                            skills.softSkills?.length
                                ? `
                        <div class="skills-category">
                            <div class="category-name">Soft Skills & Principles</div>
                            <div class="category-values">${skills.softSkills.join(", ")}</div>
                        </div>`
                                : ""
                        }
                    </div>
                </section>

                <!-- Professional Experience -->
                <section>
                    <div class="section-title">Professional Experience</div>
                    ${experience
                        .map(
                            (exp: any) => `
                    <div class="entry">
                        <div class="entry-header">
                            <span class="entry-title">${exp.jobTitle}</span>
                            <span class="entry-duration">${exp.duration}</span>
                        </div>
                        <div class="entry-sub">
                            <span class="entry-company">${exp.company}</span>
                        </div>
                        <ul class="entry-list">
                            ${exp.responsibilities.map((resp: string) => `<li>${resp}</li>`).join("")}
                        </ul>
                    </div>`
                        )
                        .join("")}
                </section>

                <!-- Key Projects -->
                <section>
                    <div class="section-title">Key Projects</div>
                    ${projects
                        .map(
                            (proj: any) => `
                    <div class="entry">
                        <div class="entry-header">
                            <span class="entry-title">${proj.projectName} <span style="font-weight: normal; font-size: 10px; color: #64748b; margin-left: 4px;">(${proj.techStack.join(
                                ", "
                            )})</span></span>
                            <span class="entry-duration"><a href="${proj.link}" target="_blank" style="color: ${
                                activeColor.secondary
                            }; text-decoration: none; font-size: 10.5px;">Live Link</a></span>
                        </div>
                        <ul class="entry-list">
                            ${proj.highlights.map((high: string) => `<li>${high}</li>`).join("")}
                        </ul>
                    </div>`
                        )
                        .join("")}
                </section>

                <!-- Education -->
                <section style="margin-bottom: 0;">
                    <div class="section-title">Education</div>
                    <div class="edu-grid">
                        ${education
                            .map(
                                (edu: any) => `
                        <div class="edu-entry">
                            <div>
                                <span class="edu-degree">${edu.degree}</span>
                                <span class="divider">|</span>
                                <span class="edu-details">${edu.institution}</span>
                            </div>
                            <span class="edu-duration">${edu.duration}</span>
                        </div>`
                            )
                            .join("")}
                    </div>
                </section>
            </div>
        </body>
        </html>
        `;

        // Launch Puppeteer Headless Browser
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        });

        const page = await browser.newPage();

        // Load HTML Content & Wait for Rendering
        await page.setContent(htmlContent, { waitUntil: "load" });

        // Generate Print PDF Buffer (Letter Size, 0.4in top/bottom, 0.5in sides for perfect 1-page fit)
        const pdfBuffer = await page.pdf({
            format: "Letter",
            printBackground: true,
            margin: {
                top: "0.4in",
                bottom: "0.4in",
                left: "0.5in",
                right: "0.5in",
            },
        });

        // Close Browser Instance
        await browser.close();

        //  Return PDF File Binary response
        const filename = `${personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
        return new NextResponse(Buffer.from(pdfBuffer), {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Content-Length": pdfBuffer.length.toString(),
            },
        });
    } catch (e) {
        console.error("PDF Download API Error:", e);
        return NextResponse.json(
            { status: "ERROR", message: "Failed to compile and download PDF." },
            { status: 500 }
        );
    }
}
import type { CoverLetter, ResumeData } from "@/types/global";
import { getFontFaceCss, PDF_FONT_HEADING, PDF_FONT_SANS } from "./fonts";

const link = (url: unknown, text: string) =>
  typeof url === "string" && /^https?:\/\//i.test(url)
    ? `<a href="${url}">${text}</a>`
    : "";

const section = (title: string, body: string) =>
  `<section><h3>${title}</h3>${body}</section>`;

const skillRow = (label: string, items?: string[]) =>
  items?.length
    ? `<p class="skill"><span class="skill-label">${label}:</span><span class="skill-values"> ${items.join(", ")}</span></p>`
    : "";

const bullets = (items?: string[]) =>
  items?.length ? `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>` : "";

export function buildResumeHtml(r: ResumeData): string {
  const p = r.personalInfo;

  const experience = r.experience?.length
    ? section("Work Experience", `<div class="item-group">${r.experience.map((e) => `
        <div class="item bordered">
          <div class="row"><span class="item-title">${e.jobTitle}</span><span class="muted">${e.duration}</span></div>
          <p class="company">${e.company}</p>
          ${bullets(e.responsibilities)}
        </div>`).join("")}</div>`)
    : "";

  const projects = r.projects?.length
    ? section("Projects", `<div class="item-group">${r.projects.map((pr) => `
        <div class="item bordered">
          <div class="row" style="justify-content:flex-start;gap:8px"><span class="item-title">${pr.projectName}</span>${pr.link ? `<a href="${pr.link}" class="view-link">View</a>` : ""}</div>
          <div class="tech-stack">${(pr.techStack ?? []).map((t) => `<span class="tech-item">${t}</span>`).join("")}</div>
          ${bullets(pr.highlights)}
        </div>`).join("")}</div>`)
    : "";

  const education = r.education?.length
    ? section("Education", `<div class="item-group">${r.education.map((ed) => `
        <div class="item edu-row">
          <div><span class="item-title" style="display:block">${ed.degree}</span><p class="edu-institution">${ed.institution}</p></div>
          <span class="muted">${ed.duration}</span>
        </div>`).join("")}</div>`)
    : "";

  return `<!doctype html><html><head><meta charset="utf-8">
<style>
    ${getFontFaceCss()}
    @page { size: A4; margin: 0.5in; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: ${PDF_FONT_SANS}; font-size: 12.5px; line-height: 1.5; font-weight: 400; color: #0F172A; }

    /* ---- Header ---- */
    header { text-align: center; padding-bottom: 12px; border-bottom: 1px solid #D2D2D2; }
    header > * + * { margin-top: 4px; }
    h1 { font-family: ${PDF_FONT_HEADING}; font-size: 30px; font-weight: 700; line-height: 1.2; letter-spacing: -0.025em; color: #0F172A; }
    h2 { font-family: ${PDF_FONT_HEADING}; font-size: 18px; font-weight: 600; line-height: 1.55; letter-spacing: -0.025em; color: #4F46E5; margin-top: 4px; }
    .contact { font-family: ${PDF_FONT_SANS}; font-size: 13px; font-weight: 400; line-height: 1.5; color: #475569; margin-top: 4px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px; }
    .contact .dot { color: #94A3B8; }
    .links { font-family: ${PDF_FONT_SANS}; font-size: 14px; font-weight: 400; line-height: 1.43; display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 4px; }
    a { color: #4F46E5; text-decoration: none; }

    /* ---- Sections ---- */
    section { margin-top: 12px; }
    h3 { font-family: ${PDF_FONT_HEADING}; font-size: 16px; font-weight: 700; line-height: 1.5; letter-spacing: -0.025em; color: #0F172A; margin-bottom: 0; }

    /* ---- Summary ---- */
    .summary { font-family: ${PDF_FONT_SANS}; font-size: 14px; font-weight: 400; color: #475569; line-height: 1.625; }

    /* ---- Skills ---- */
    .skills-group > * + * { margin-top: 4px; }
    .skill { font-family: ${PDF_FONT_SANS}; font-size: 13px; line-height: 1.5; }
    .skill-label { font-family: ${PDF_FONT_HEADING}; font-weight: 600; color: #0F172A; }
    .skill-values { font-family: ${PDF_FONT_SANS}; font-weight: 400; color: #475569; }

    /* ---- Items (Experience / Projects / Education) ---- */
    .item-group > * + * { margin-top: 10px; }
    .bordered { padding-left: 16px; border-left: 1px solid rgba(79, 70, 229, 0.4); }
    .bordered > * + * { margin-top: 6px; }
    .row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
    .item-title { font-family: ${PDF_FONT_HEADING}; font-size: 14px; font-weight: 600; line-height: 1.43; color: #0F172A; }
    .company { font-family: ${PDF_FONT_SANS}; font-size: 14px; font-weight: 500; line-height: 1.43; color: #4F46E5; }
    .muted { font-family: ${PDF_FONT_SANS}; font-size: 12px; font-weight: 400; line-height: 1.333; color: #64748B; white-space: nowrap; }
    ul { list-style-type: disc; list-style-position: inside; }
    ul > * + * { margin-top: 4px; }
    li { font-family: ${PDF_FONT_SANS}; font-size: 14px; font-weight: 400; line-height: 1.5; color: #475569; }

    /* ---- Projects specifics ---- */
    .view-link { font-family: ${PDF_FONT_SANS}; font-size: 12px; font-weight: 400; line-height: 1.333; color: #4F46E5; }
    .tech-stack { display: flex; flex-wrap: wrap; gap: 6px; }
    .tech-item { font-family: ${PDF_FONT_SANS}; font-size: 12px; font-weight: 500; line-height: 1.333; color: #4F46E5; }

    /* ---- Education specifics ---- */
    .edu-row { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; }
    .edu-institution { font-family: ${PDF_FONT_SANS}; font-size: 13px; font-weight: 400; line-height: 1.5; color: #475569; }
  </style></head><body>
    <header>
      <h1>${p.fullName}</h1>
      <h2>${r.resumeTitle}</h2>
      <div class="contact">${[p.email, p.phone, p.location].filter(Boolean).map((v, i, a) => i < a.length - 1 ? `<span>${v}</span><span class="dot">•</span>` : `<span>${v}</span>`).join("")}</div>
      <div class="links">${link(p.github, "GitHub")}${link(p.linkedin, "LinkedIn")}</div>
    </header>
    ${section("Professional Summary", `<p class="summary">${r.summary}</p>`)}
    ${section("Skills", `<div class="skills-group">${skillRow("Languages", r.skills?.languages) +
    skillRow("Frameworks &amp; Libraries", r.skills?.frameworksAndLibraries) +
    skillRow("Tools &amp; Platforms", r.skills?.toolsAndPlatforms) +
    skillRow("Soft Skills", r.skills?.softSkills)
    }</div>`)}
    ${experience}${projects}${education}
  </body></html>`;
}

export function buildLetterHtml(
  cl: CoverLetter
): string {
  const d = new Date(cl.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const date = d ? `<p>${d}</p>` : "";

  const recipient = cl.companyName
    ? `<div><p class="recipient-title">Hiring Manager</p><p>${cl.companyName}</p></div>`
    : "";
  
  const greeting = cl.coverLetter.greeting ? `<p class="greeting">${cl.coverLetter.greeting}</p>` : "";

  const opening = cl.coverLetter.opening ? `<p>${cl.coverLetter.opening}</p>` : "";

  const paragraphs = (cl.coverLetter.paragraphs ?? [])
    .filter((p) => p && p.trim().length > 0)
    .map((p) => `<p>${p}</p>`);
  
  const closing = cl.coverLetter.closing ? `<p>${cl.coverLetter.closing}</p>` : "";

  const signature = cl.coverLetter.signature
    ? `<div class="signature-block">
        <p class="signature-closing">Sincerely,</p>
        <p class="signature-name">${cl.coverLetter.signature}</p>
      </div>`
    : "";

  const bodyItems = [
    date,
    recipient,
    greeting,
    opening,
    ...paragraphs,
    closing,
  ].filter(Boolean);

  return `<!doctype html><html><head><meta charset="utf-8">
<style>
    @page { size: A4; margin: 10mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font: 12.5px/1.5 system-ui, -apple-system, "Segoe UI", Arial, sans-serif; line-height: 1.5; color: #0F172A; }

    /* ---- Letter Body ---- */
    .letter-body {
        font-size: 14px;
        color: #475569;
        line-height: 1.625;
    }
    .letter-body > * + * {
        margin-top: 16px;
    }
    .recipient-title {
        color: #0F172A;
        font-weight: 500;
    }
    .greeting {
        color: #0F172A;
        font-weight: 500;
    }

    /* ---- Signature ---- */
    .signature-block {
        margin-top: 24px;
        padding-top: 16px;
        font-size: 14px;
    }
    .signature-block > * + * {
        margin-top: 2px;
    }
    .signature-closing {
        color: #475569;
    }
    .signature-name {
        color: #0F172A;
        font-weight: 600;
        font-size: 16px;
    }
</style></head><body>
    <div class="letter-body">
      ${bodyItems.join("\n      ")}
    </div>
    ${signature}
</body></html>`;
}
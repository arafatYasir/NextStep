# NextStep — AI-Powered Career Toolkit

> **Analyze job descriptions, evaluate your resume, and build tailored resumes — all powered by AI to help you stand out in a competitive job market.**

NextStep is a production-grade SaaS platform that closes the gap between job seekers and the roles they want. Instead of guessing what recruiters and ATS systems are scanning for, users get **AI-driven analysis, scoring, and document generation** built directly around the job they're targeting. From decoding a job description to building an ATS-optimized resume in seconds, NextStep helps fresh graduates and experienced professionals apply with confidence and land interviews faster.

🔗 **Live URL:** [career-next-step.vercel.app](https://career-next-step.vercel.app/)

> 💳 **Note:** Subscriptions run on **Stripe Test Mode** — use Stripe's test card `4242 4242 4242 4242` (any future expiry, any CVC). No real charges occur.

## ✨ Overview

NextStep is powered by four AI tools, a per-user dashboard, full subscription management, and persistent history for every analysis and document a user generates. All AI workloads run asynchronously in the background via **Inngest**, keeping the UI responsive while **Gemini** handles the heavy lifting. Results are scored, structured, and saved so users can revisit, review, or delete any record at any time.

## 🚀 Features

### 🔍 1. Job Description Analyzer
Paste any job description and instantly extract everything that matters:
- **Hard skills** & **soft skills**
- **Action verbs** & high-impact **key phrases**
- **Salary details**, **experience level**, and **education requirements**

Know exactly what a role demands before you write a single line of your resume.

### 📊 2. AI Resume Analyzer
Evaluate a resume against a specific **job title and description** with a deep, section-by-section breakdown:
- Overall **ATS match score**
- **Strong matches** vs. **partial matches**
- **Section-level scores** (Summary, Education, Projects, Experience, etc.) with percentage values
- **Formatting issues** flagged per section
- **Matched**, **missing**, and **overused** keywords alongside with **Skill gaps**
- **ATS readability** and **confidence level**
- Targeted, **section-by-section advice**

### 🛠️ 3. AI Resume Builder
Generate a perfectly ATS-aligned resume against any job title and description in seconds. Supports two paths:
- **Fresher:** provide personal info + **3 project experiences**
- **Experienced:** provide personal info + **2 job experiences** and **1 project experience**

Captures details like name, phone, GitHub, LinkedIn, and location, then builds a tailored, scannable resume instantly.

### ✉️ 4. AI Cover Letter Writer
Produce a personalized cover letter against a specific job title and description in seconds. Optionally pass the **hiring manager's name** for an extra layer of personalization.

## 📂 Dashboard

Every user gets a personal dashboard with:
- **At-a-glance stats:** total job analyses, resume analyses, resumes built, and cover letters written
- **Four dedicated record routes** — Job Analyses, Resume Analyses, Built Resumes, and Cover Letters
- **Persistent history:** revisit any past analysis or generated document at any time
- **Full control:** delete any record whenever you choose

### ⚙️ Settings & Subscription Management
The Settings page surfaces the user's **active subscription** and lets them **cancel** or **resume** their plan directly — backed by Stripe.

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js |
| **Language** | TypeScript |
| **State Management** | Redux Toolkit |
| **AI Engine** | Google Gemini |
| **Background Jobs** | Inngest (async AI analysis & generation) |
| **Authentication** | Supabase |
| **Payments & Subscriptions** | Stripe |
| **Database** | MongoDB + Mongoose |
| **UI Components** | shadcn/ui |
| **Contact Form** | Web3Forms |
| **Deployment** | Vercel |

## 🏗️ Architecture Highlights

- **Async-first AI pipeline:** All four tools dispatch jobs to **Inngest**, which orchestrates Gemini calls in the background — no blocked requests, no timeouts on long generations.
- **Type-safe end to end** with TypeScript across the app.
- **Predictable state** via Redux Toolkit.
- **Durable records** in MongoDB so users can revisit and manage every analysis and document.
- **Secure auth & billing** through Supabase and Stripe, with subscription lifecycle controls exposed in-app.

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">Built with ❤️ to help job seekers take their <strong>NextStep</strong>.</p>
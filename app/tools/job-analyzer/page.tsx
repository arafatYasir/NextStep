import InputCard from "@/components/InputCard";
import LongDownArrowIcon from "@/icons/LongDownArrowIcon";

export default function JobDescriptionAnalyzer() {
  return (
    <div className="bg-linear-to-br from-[rgb(var(--bg-primary))]/2 to-[rgb(var(--bg-primary-hover))]/40">
      <main className="container mx-auto px-6 pt-32 pb-12 min-h-screen flex flex-col items-center gap-y-6">
        {/* ---- Hero Section ---- */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight mb-4 font-heading bg-linear-to-r text-transparent bg-clip-text from-[rgb(var(--bg-primary-hover))] to-[rgb(var(--bg-primary))]/80">
            Job Description Analyzer
          </h1>

          <p className="max-w-2xl text-lg text-[rgb(var(--text-secondary))] mx-auto">
            Instantly uncover the skills, experience, education, and expectations employers care about — so you know exactly what to highlight on your resume before you apply.
          </p>
        </div>

        <div className="text-[rgb(var(--bg-primary-hover))]">
          <LongDownArrowIcon width={30} height={60} />
        </div>

        {/* ---- Main Input Card ---- */}
        <InputCard />
      </main>
    </div>
  );
}
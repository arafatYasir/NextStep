import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="container mx-auto py-12 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl 2xl:text-5xl font-bold text-center">Keyword Insight Engine</h1>

      <p className="max-w-[800px] text-base 2xl:text-lg text-center text-slate-500 mt-2">
        <q>Instantly extract and analyze the most critical keywords from any job description. Know exactly what skills to highlight on your resume before you apply.</q>

        <em title="Keyword Insight Engine" aria-label="Keyword Insight Engine">- KIE</em>
      </p>

      <div className="flex items-center justify-center mt-6">
        <Button text="Analyze Job Description" />
      </div>
    </main>
  );
}

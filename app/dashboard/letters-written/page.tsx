import LetterCardsSkeleton from "@/components/dashboard/cover-letters/LetterCardsSkeleton";
import LettersRecordsList from "@/components/dashboard/cover-letters/LettersRecordsList";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const CoverLetters = async () => {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();
  const userId = user?.id;

  // If user id is not found redirect to sign in page
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <section className="flex-1 p-8 space-y-10 max-w-5xl">
      {/* ---- Header ---- */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">
          Cover Letters
        </h1>
        <p className="text-foreground/80 font-sans text-base">
          Manage and view your AI-generated cover letters.
        </p>
      </div>

      {/* ---- Letter Records ---- */}
      <Suspense fallback={<LetterCardsSkeleton />}>
        <LettersRecordsList userId={userId} />
      </Suspense>
    </section>
  );
};

export default CoverLetters;
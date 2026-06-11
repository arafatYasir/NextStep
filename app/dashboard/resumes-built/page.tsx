import BuiltResumeCardsSkeleton from "@/components/dashboard/resumes-built/BuiltResumeCardsSkeleton";
import BuiltResumeRecordsList from "@/components/dashboard/resumes-built/BuiltResumeRecordsList";
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import { Suspense } from "react";

const ResumesBuilt = async () => {
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
          Built Resumes
        </h1>
        <p className="text-foreground/80 font-sans text-base">
          Manage and view your the resumes you built.
        </p>
      </div>

      {/* ---- Resume Records ---- */}
      <Suspense fallback={<BuiltResumeCardsSkeleton />}>
        <BuiltResumeRecordsList />
      </Suspense>
    </section>
  )
}

export default ResumesBuilt
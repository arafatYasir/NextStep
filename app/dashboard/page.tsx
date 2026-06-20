import OverviewContainer from "@/components/dashboard/overview/OverviewContainer";
import ServiceMetricCards from "@/components/dashboard/overview/ServiceMetricCards";
import ServiceMetricCardsSkeleton from "@/components/dashboard/overview/ServiceMetricCardsSkeleton";
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import { Suspense } from "react";

const DashboardOverview = async () => {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();
  const userId = user?.id;

  // If user id is not found redirect to sign in page
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <section className="max-w-full 2xl:max-w-[90%]">
      {/* ---- Header ---- */}
      <div className="flex flex-col gap-1 pt-6 px-4 md:pt-8 md:pl-8 md:px-0 pb-2">
        <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-foreground/80 font-sans text-sm md:text-base">
          Actionable intelligence from your career progression activities.
        </p>
      </div>

      {/* ---- Body ---- */}
      <div className="flex-1 p-4 md:p-8 space-y-6 md:space-y-10">
        {/* ---- Metric Cards ---- */}
        <Suspense fallback={<ServiceMetricCardsSkeleton />}>
          <ServiceMetricCards userId={userId} />
        </Suspense>

        {/* ---- Overview Container ---- */}
        <OverviewContainer />
      </div>
    </section>
  )
}

export default DashboardOverview
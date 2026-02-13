import OverviewContainer from "@/components/dashboard/overview/OverviewContainer";
import { createClient } from "@/lib/supabase/server"

const DashboardOverview = async () => {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  return (
    <section className="max-w-7xl">
      {/* ---- Header ---- */}
      <div className="flex flex-col gap-1 pt-8 pl-8 pb-2">
        <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-foreground/80 font-sans text-base">
          Actionable intelligence from your career progression activities.
        </p>
      </div>

      {/* ---- Container ---- */}
      <OverviewContainer userId={user?.id as string} />
    </section>
  )
}

export default DashboardOverview
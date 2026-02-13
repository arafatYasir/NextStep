import OverviewContainer from "@/components/dashboard/overview/OverviewContainer";
import { createClient } from "@/lib/supabase/server";

const DashboardOverview = async () => {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  return (
    <OverviewContainer userId={user?.id as string} />
  )
}

export default DashboardOverview
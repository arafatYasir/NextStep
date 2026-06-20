import { Skeleton } from "@/components/ui/skeleton"

const SubscriptionCardSkeleton = () => {
    return (
        <div className="rounded-xl border border-[rgb(var(--border-default))] bg-card p-6 sm:p-8 space-y-6">

            {/* ---- Plan Header ---- */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex flex-col gap-2">
                    {/* "Current Plan" label */}
                    <Skeleton className="w-24 h-3 rounded" />
                    {/* Plan name */}
                    <Skeleton className="w-36 xs:w-44 h-7 xs:h-8 rounded" />
                </div>
                {/* Status badge */}
                <Skeleton className="w-14 xs:w-16 h-6 rounded-full shrink-0 mt-1" />
            </div>

            {/* ---- Price + Renewal Info Tiles ---- */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                {/* Price tile */}
                <div className="flex items-center gap-3 rounded-xl border border-[rgb(var(--border-light))] p-3 xs:p-4">
                    <Skeleton className="w-4 h-4 xs:w-5 xs:h-5 rounded shrink-0" />
                    <div className="flex flex-col gap-1.5 min-w-0">
                        <Skeleton className="w-8 h-3 rounded" />
                        <Skeleton className="w-20 xs:w-24 h-4 rounded" />
                    </div>
                </div>

                {/* Renewal tile */}
                <div className="flex items-center gap-3 rounded-xl border border-[rgb(var(--border-light))] p-3 xs:p-4">
                    <Skeleton className="w-4 h-4 xs:w-5 xs:h-5 rounded shrink-0" />
                    <div className="flex flex-col gap-1.5 min-w-0">
                        <Skeleton className="w-16 h-3 rounded" />
                        <Skeleton className="w-28 xs:w-32 h-4 rounded" />
                    </div>
                </div>
            </div>

            {/* ---- Action Buttons ---- */}
            <div className="flex flex-col xs:flex-row gap-3 pt-2">
                <Skeleton className="w-full xs:w-32 h-11 rounded-lg" />
                <Skeleton className="w-full xs:w-44 h-11 rounded-lg" />
            </div>
        </div>
    );
}

export default SubscriptionCardSkeleton
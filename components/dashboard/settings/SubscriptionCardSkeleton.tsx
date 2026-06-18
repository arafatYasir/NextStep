import { Skeleton } from "@/components/ui/skeleton"

const SubscriptionCardSkeleton = () => {
    return (
        <div className="rounded-xl border border-[rgb(var(--border-default))] bg-card p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-1/2">
                    <Skeleton className="w-24 h-4 rounded" />
                    <Skeleton className="mt-2 w-full h-8 rounded" />
                </div>
                <Skeleton className="w-15 h-[25px] rounded-full" />
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 rounded-xl border border-[rgb(var(--border-light))] p-4">
                    <Skeleton className="w-5 h-5 rounded" />
                    <div>
                        <Skeleton className="w-10 h-3 rounded" />
                        <Skeleton className="mt-1 w-22 h-4 rounded" />
                    </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-[rgb(var(--border-light))] p-4">
                    <Skeleton className="w-5 h-5 rounded" />
                    <div>
                        <Skeleton className="w-10 h-3 rounded" />
                        <Skeleton className="mt-1 w-22 h-4 rounded" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col xs:flex-row gap-3 pt-2">
                <Skeleton className="w-1/4 h-10" />
                <Skeleton className="w-[30%] h-10" />
            </div>
        </div>
    );
}

export default SubscriptionCardSkeleton
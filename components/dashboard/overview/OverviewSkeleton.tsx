import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const OverviewSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* ---- Tabs Skeleton ---- */}
            <div className="flex border-b border-[rgb(var(--border-default))]">
                <div className="px-6 py-3">
                    <Skeleton className="h-[21px] w-25 rounded" />
                </div>
                <div className="px-6 py-3">
                    <Skeleton className="h-[21px] w-25 rounded" />
                </div>
            </div>

            {/* ---- Analysis Skeletons ---- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div className={cn(
                        "bg-card p-6 rounded-xl border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] transition-colors duration-250 shadow-sm flex flex-col h-full",
                        index === 4 ? "col-span-2" : ""
                    )} key={index}>
                        <div className="mb-6 flex items-center justify-between">
                            <Skeleton className="h-5 w-[40%] rounded" />
                            <Skeleton className="size-9 rounded-lg" />
                        </div>

                        <div className="flex-1 space-y-5">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div className="space-y-1.5 w-full" key={index}>
                                    <div className="flex justify-between items-end">
                                        <Skeleton className="h-4 rounded w-[20%]" />
                                        <Skeleton className="h-4 rounded w-[10%]" />
                                    </div>
                                    <Skeleton className="h-2 w-full rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OverviewSkeleton
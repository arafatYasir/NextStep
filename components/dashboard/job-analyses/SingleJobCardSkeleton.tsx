import { Skeleton } from "@/components/ui/skeleton";

export const SingleJobCardSkeleton = () => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4">
        <div className="flex items-start gap-4 min-w-0 flex-1 w-full">
            <Skeleton className="size-9 xs:size-10 sm:size-11 shrink-0" />

            <div className="space-y-3 flex-1 min-w-0 pr-2">
                <Skeleton className="h-5 rounded w-[45%]" />
                <div className="flex flex-wrap gap-4">
                    <Skeleton className="h-4 w-12 xs:w-16 rounded-full" />
                    <Skeleton className="h-4 rounded w-16 xs:w-20" />
                    <Skeleton className="h-4 rounded w-12 xs:w-16" />
                </div>
            </div>
        </div>
    </div>
);
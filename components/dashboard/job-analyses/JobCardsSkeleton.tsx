import { Skeleton } from "@/components/ui/skeleton"

export const SingleJobCardSkeleton = () => (
    <div className="flex items-center gap-4 h-[84px] rounded-xl border border-[rgb(var(--border-default))] bg-card p-4">
        <Skeleton className="size-11 shrink-0" />

        <div className="space-y-2 w-1/3">
            <Skeleton className="h-4 rounded w-full" />
            <div className="flex gap-4">
                <Skeleton className="h-3 rounded w-1/3" />
                <Skeleton className="h-3 rounded w-1/3" />
                <Skeleton className="h-3 rounded w-1/3" />
            </div>
        </div>
    </div>
);

const JobCardsSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <SingleJobCardSkeleton key={i} />
            ))}
        </div>
    )
}

export default JobCardsSkeleton
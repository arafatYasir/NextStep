import { Skeleton } from "@/components/ui/skeleton";

export const SingleResumeCardSkeleton = () => (
    <div className="flex items-start gap-4 relative rounded-xl border border-[rgb(var(--border-default))] bg-card p-4">
        <Skeleton className="size-11 shrink-0" />

        <div className="space-y-3 w-1/2">
            <Skeleton className="h-5 rounded w-full" />
            <Skeleton className="h-4 rounded w-1/2" />

            {/* File type skeleton */}
            <Skeleton className="h-4 w-9 rounded-full absolute top-4 right-30" />

            <div className="flex gap-4">
                <Skeleton className="h-4 rounded w-1/5" />
                <Skeleton className="h-4 rounded w-1/5" />
                <Skeleton className="h-4 rounded w-1/5" />
                <Skeleton className="h-4 rounded w-1/5" />
                <Skeleton className="h-4 rounded w-1/5" />
            </div>
        </div>
    </div>
);
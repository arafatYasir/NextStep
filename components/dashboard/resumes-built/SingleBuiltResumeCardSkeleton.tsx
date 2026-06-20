import { Skeleton } from "@/components/ui/skeleton"

const SingleBuiltResumeCardSkeleton = () => {
    return (
        <div className="flex items-start gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4">
            {/* ---- Icon ---- */}
            <Skeleton className="size-9 xs:size-10 sm:size-11 shrink-0 mt-0.5 sm:mt-0" />

            {/* ---- Content ---- */}
            <div className="flex-1 min-w-0 space-y-2.5">
                {/* Title + type badge */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 xs:h-5 rounded flex-1 max-w-[50%]" />
                    <Skeleton className="h-4 w-16 rounded-md shrink-0" />
                </div>

                {/* Name + completeness indicators */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-4 w-20 rounded" />
                </div>

                {/* Status / date / time */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                </div>
            </div>
        </div>
    )
}

export default SingleBuiltResumeCardSkeleton
import { Skeleton } from "@/components/ui/skeleton";

const SingleLetterCardSkeleton = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4">
            {/* ---- Left: Icon + Content ---- */}
            <div className="flex items-start gap-4 min-w-0 flex-1 w-full">
                {/* Icon */}
                <Skeleton className="size-9 xs:size-10 sm:size-11 rounded-lg shrink-0 mt-0.5 sm:mt-0" />

                {/* Content */}
                <div className="flex-1 min-w-0 pr-2">
                    {/* Job title */}
                    <Skeleton className="h-3.5 xs:h-4 sm:h-5 w-[45%] rounded" />

                    {/* Company + status + date + time row */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-1.5">
                        <Skeleton className="h-3 xs:h-3.5 w-20 xs:w-28 rounded" />
                        <Skeleton className="h-4 xs:h-5 w-16 xs:w-20 rounded-full" />
                        <Skeleton className="h-3 xs:h-3.5 w-16 xs:w-20 rounded" />
                        <Skeleton className="h-3 xs:h-3.5 w-12 xs:w-16 rounded" />
                    </div>
                </div>
            </div>

            {/* ---- Right: Action Buttons ---- */}
            <div className="flex lg:hidden items-center gap-2 self-end sm:self-auto shrink-0">
                <Skeleton className="size-7 xs:size-8 sm:size-9 rounded-md" />
                <Skeleton className="size-7 xs:size-8 sm:size-9 rounded-md" />
            </div>
        </div>
    );
};

export default SingleLetterCardSkeleton;
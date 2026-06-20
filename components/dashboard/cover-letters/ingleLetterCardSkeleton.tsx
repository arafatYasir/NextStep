import { Skeleton } from "@/components/ui/skeleton";

const SingleLetterCardSkeleton = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4">
            <div className="flex items-start gap-4 min-w-0 flex-1 w-full">
                {/* ---- Icon ---- */}
                <Skeleton className="size-9 xs:size-10 sm:size-11 rounded-lg shrink-0" />

                {/* ---- Content ---- */}
                <div className="flex-1 flex flex-col min-w-0 gap-2.5 pr-2">
                    <Skeleton className="h-5 w-[45%] rounded" />
                    <div className="flex flex-wrap items-center gap-4">
                        <Skeleton className="h-4 w-20 xs:w-28 rounded" />
                        <Skeleton className="h-5 w-16 xs:w-20 rounded-full" />
                        <Skeleton className="h-4 w-16 xs:w-20 rounded" />
                        <Skeleton className="h-4 w-12 xs:w-16 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleLetterCardSkeleton;
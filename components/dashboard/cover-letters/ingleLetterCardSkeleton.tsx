import { Skeleton } from "@/components/ui/skeleton";

const SingleLetterCardSkeleton = () => {
    return (
        <div className="flex-1 flex items-center gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4">
            {/* ---- Icon ---- */}
            <Skeleton className="size-11 rounded-lg shrink-0" />

            {/* ---- Content ---- */}
            <div className="flex-1 flex flex-col min-w-0 gap-2.5">
                <Skeleton className="h-5 w-48 max-w-[60%] rounded" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                </div>
            </div>
        </div>
    );
};

export default SingleLetterCardSkeleton;
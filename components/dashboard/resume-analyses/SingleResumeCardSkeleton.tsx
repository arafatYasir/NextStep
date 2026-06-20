import { Skeleton } from "@/components/ui/skeleton";

export const SingleResumeCardSkeleton = () => (
    <div className="flex items-start gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4">
        {/* ---- Icon ---- */}
        <Skeleton className="size-9 xs:size-10 sm:size-11 shrink-0 mt-0.5 sm:mt-0" />

        {/* ---- Content ---- */}
        <div className="flex-1 min-w-0 space-y-2.5">
            {/* ---- File name + file type badge ---- */}
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 xs:h-5 rounded flex-1 max-w-[60%]" />
                <Skeleton className="h-4 w-9 rounded-md shrink-0" />
            </div>

            {/* ---- Target job title ---- */}
            <Skeleton className="h-3.5 xs:h-4 rounded w-2/3" />

            {/*----  Meta row (status / date / time / ats / readability) ---- */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-4 w-24 rounded-full" />
            </div>
        </div>
    </div>
);

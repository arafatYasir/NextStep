import { Skeleton } from "@/components/ui/skeleton";

export const SingleResumeCardSkeleton = () => (
    <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-xl border border-[rgb(var(--border-default))] bg-card p-4">
        <div className="flex items-start gap-4 min-w-0 flex-1 w-full">
            {/* ---- Icon ---- */}
            <Skeleton className="size-9 xs:size-10 sm:size-11 rounded-lg shrink-0 mt-0.5 sm:mt-0" />

            {/* ---- Content ---- */}
            <div className="flex-1 flex flex-col min-w-0 pr-2">
                {/* ---- File name + file type badge ---- */}
                <div className="flex items-center justify-between min-w-0">
                    <Skeleton className="h-4 xs:h-5 sm:h-6 rounded flex-1 min-w-0 max-w-[60%]" />
                    <Skeleton className="h-4 w-9 xs:w-10 rounded-md shrink-0" />
                </div>

                {/* ---- Job title ---- */}
                <div className="flex items-center gap-1.5 mt-2 min-w-0">
                    <Skeleton className="size-3.5 xs:size-4 rounded shrink-0" />
                    <Skeleton className="h-3.5 xs:h-4 rounded w-2/3" />
                </div>

                {/* ---- Meta row (status / date / time / ats / readability) ---- */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-1.5">
                    <Skeleton className="h-5 xs:h-6 w-16 rounded-full shrink-0" />
                    <Skeleton className="h-4 w-20 rounded shrink-0" />
                    <Skeleton className="h-4 w-16 rounded shrink-0" />
                    <Skeleton className="h-5 xs:h-6 w-24 rounded-full shrink-0" />
                    <Skeleton className="h-5 xs:h-6 w-28 rounded-full shrink-0" />
                </div>
            </div>
        </div>

        {/* ---- Action Buttons ---- */}
        <div className="flex lg:hidden items-center gap-2 shrink-0 self-end sm:self-auto">
            <Skeleton className="size-7 xs:size-8 sm:size-9 rounded-md" />
            <Skeleton className="size-7 xs:size-8 sm:size-9 rounded-md" />
        </div>
    </div>
);
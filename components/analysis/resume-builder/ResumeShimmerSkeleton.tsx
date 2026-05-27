import { Skeleton } from "@/components/ui/skeleton";

const ResumeShimmerSkeleton = () => {
    return (
        <div className="w-full max-w-2xl bg-card rounded-xl shadow-xl border border-[rgb(var(--border-default))] p-6 sm:p-10 space-y-8">
            {/* ---- Header: Name + Contact + Links ---- */}
            <div className="text-center space-y-3 pb-6 border-b border-[rgb(var(--border-default))]">
                <Skeleton className="h-7 w-56 mx-auto rounded" />
                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <Skeleton className="h-3.5 w-32 rounded" />
                    <Skeleton className="h-3.5 w-28 rounded" />
                    <Skeleton className="h-3.5 w-36 rounded" />
                </div>
                <div className="flex items-center justify-center gap-3">
                    <Skeleton className="h-3.5 w-40 rounded" />
                    <Skeleton className="h-3.5 w-44 rounded" />
                </div>
            </div>

            {/* ---- Summary ---- */}
            <div className="space-y-3">
                <Skeleton className="h-5 w-28 rounded" />
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-4/5 rounded" />
            </div>

            {/* ---- Skills ---- */}
            <div className="space-y-3">
                <Skeleton className="h-5 w-20 rounded" />
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Skeleton className="h-3.5 w-24 rounded" />
                        <div className="flex flex-wrap gap-1.5">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                            <Skeleton className="h-6 w-18 rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-3.5 w-32 rounded" />
                        <div className="flex flex-wrap gap-1.5">
                            <Skeleton className="h-6 w-18 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                            <Skeleton className="h-6 w-22 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ---- Experience ---- */}
            <div className="space-y-4">
                <Skeleton className="h-5 w-36 rounded" />
                {[1, 2].map(i => (
                    <div key={i} className="space-y-2 pl-4 border-l-2 border-[rgb(var(--border-default))]/50">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-44 rounded" />
                            <Skeleton className="h-3 w-28 rounded" />
                        </div>
                        <Skeleton className="h-3 w-32 rounded" />
                        <Skeleton className="h-3 w-full rounded" />
                        <Skeleton className="h-3 w-11/12 rounded" />
                        <Skeleton className="h-3 w-3/4 rounded" />
                    </div>
                ))}
            </div>

            {/* ---- Projects ---- */}
            <div className="space-y-4">
                <Skeleton className="h-5 w-24 rounded" />
                {[1, 2].map(i => (
                    <div key={i} className="space-y-2 pl-4 border-l-2 border-[rgb(var(--border-default))]/50">
                        <Skeleton className="h-4 w-40 rounded" />
                        <div className="flex gap-1.5">
                            <Skeleton className="h-5 w-14 rounded-full" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                            <Skeleton className="h-5 w-12 rounded-full" />
                        </div>
                        <Skeleton className="h-3 w-full rounded" />
                        <Skeleton className="h-3 w-4/5 rounded" />
                    </div>
                ))}
            </div>

            {/* ---- Education ---- */}
            <div className="space-y-3">
                <Skeleton className="h-5 w-28 rounded" />
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-52 rounded" />
                    <Skeleton className="h-3 w-24 rounded" />
                </div>
                <Skeleton className="h-3 w-40 rounded" />
            </div>
        </div>
    );
};

export default ResumeShimmerSkeleton;
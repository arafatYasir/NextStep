import { cn } from "@/lib/utils";

const ShimmerBar = ({ className }: { className?: string }) => (
    <div className={cn("relative overflow-hidden rounded bg-[rgb(var(--border-default))]/40", className)}>
        <div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
            style={{ animation: "shimmer 2s infinite" }}
        />
    </div>
);

const ResumeShimmerSkeleton = () => {
    return (
        <div className="w-full max-w-2xl bg-card rounded-xl shadow-xl border border-[rgb(var(--border-default))] p-6 sm:p-10 space-y-8">
            {/* Header: Name + Contact */}
            <div className="text-center space-y-3 pb-6 border-b border-dashed border-[rgb(var(--border-default))]">
                <ShimmerBar className="h-7 w-56 mx-auto" />
                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <ShimmerBar className="h-3.5 w-32" />
                    <ShimmerBar className="h-3.5 w-28" />
                    <ShimmerBar className="h-3.5 w-36" />
                </div>
                <div className="flex items-center justify-center gap-3">
                    <ShimmerBar className="h-3.5 w-40" />
                    <ShimmerBar className="h-3.5 w-44" />
                </div>
            </div>

            {/* Summary */}
            <div className="space-y-3">
                <ShimmerBar className="h-5 w-28" />
                <ShimmerBar className="h-3 w-full" />
                <ShimmerBar className="h-3 w-full" />
                <ShimmerBar className="h-3 w-4/5" />
            </div>

            {/* Skills */}
            <div className="space-y-3">
                <ShimmerBar className="h-5 w-20" />
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <ShimmerBar className="h-3.5 w-24" />
                        <div className="flex flex-wrap gap-1.5">
                            <ShimmerBar className="h-6 w-16 rounded-full" />
                            <ShimmerBar className="h-6 w-20 rounded-full" />
                            <ShimmerBar className="h-6 w-14 rounded-full" />
                            <ShimmerBar className="h-6 w-18 rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <ShimmerBar className="h-3.5 w-32" />
                        <div className="flex flex-wrap gap-1.5">
                            <ShimmerBar className="h-6 w-18 rounded-full" />
                            <ShimmerBar className="h-6 w-14 rounded-full" />
                            <ShimmerBar className="h-6 w-22 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
                <ShimmerBar className="h-5 w-36" />
                {[1, 2].map(i => (
                    <div key={i} className="space-y-2 pl-4 border-l-2 border-[rgb(var(--border-default))]/30">
                        <div className="flex items-center justify-between">
                            <ShimmerBar className="h-4 w-44" />
                            <ShimmerBar className="h-3 w-28" />
                        </div>
                        <ShimmerBar className="h-3 w-32" />
                        <ShimmerBar className="h-3 w-full" />
                        <ShimmerBar className="h-3 w-11/12" />
                        <ShimmerBar className="h-3 w-3/4" />
                    </div>
                ))}
            </div>

            {/* Projects */}
            <div className="space-y-4">
                <ShimmerBar className="h-5 w-24" />
                {[1, 2].map(i => (
                    <div key={i} className="space-y-2 pl-4 border-l-2 border-[rgb(var(--border-default))]/30">
                        <ShimmerBar className="h-4 w-40" />
                        <div className="flex gap-1.5">
                            <ShimmerBar className="h-5 w-14 rounded-full" />
                            <ShimmerBar className="h-5 w-16 rounded-full" />
                            <ShimmerBar className="h-5 w-12 rounded-full" />
                        </div>
                        <ShimmerBar className="h-3 w-full" />
                        <ShimmerBar className="h-3 w-4/5" />
                    </div>
                ))}
            </div>

            {/* Education */}
            <div className="space-y-3">
                <ShimmerBar className="h-5 w-28" />
                <div className="flex items-center justify-between">
                    <ShimmerBar className="h-4 w-52" />
                    <ShimmerBar className="h-3 w-24" />
                </div>
                <ShimmerBar className="h-3 w-40" />
            </div>
        </div>
    );
};

export default ResumeShimmerSkeleton;
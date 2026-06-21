import { Skeleton } from "@/components/ui/skeleton";

const BadgesLoadingSkeleton = ({ count, componentName }: { count: number, componentName: string }) => {
    const badges = Array.from({ length: count }).fill(0);

    return (
        <div className="flex flex-wrap gap-3">
            {badges.map((_, index) => (
                componentName === "JobAnalysisModal" ? (
                    <div className="bg-gray-100 rounded-lg border border-[rgb(var(--border-default))]" key={index}>
                        <div className="px-2 xs:px-2.5 sm:px-3 py-1 xs:py-[7px] flex items-center gap-2">
                            <Skeleton className="w-20 h-4 xs:h-[17px] sm:h-5 rounded" />
                            <Skeleton className="size-5 rounded-md" />
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-100 rounded-lg border border-[rgb(var(--border-default))]" key={index}>
                        <div className="px-2.5 py-[7px] flex items-center gap-2">
                            <Skeleton className="w-20 h-4 xs:h-[17px] sm:h-5 rounded" />
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}

export default BadgesLoadingSkeleton
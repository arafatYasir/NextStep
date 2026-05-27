import { Skeleton } from "@/components/ui/skeleton";

const BadgesLoadingSkeleton = ({ count }: { count: number }) => {
    const badges = Array.from({ length: count }).fill(0);

    return (
        <div className="flex flex-wrap gap-3">
            {badges.map((_, index) => (
                <div className="bg-gray-100 rounded-lg border border-[rgb(var(--border-default))]" key={index}>
                    <div className="pl-3 pr-2 py-[7px] flex items-center gap-2">
                        <Skeleton className="w-20 h-5 rounded" />
                        <Skeleton className="size-5 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BadgesLoadingSkeleton
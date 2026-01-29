import { Skeleton } from "@/components/ui/skeleton";

const BadgesLoadingSkeleton = ({count} : {count: number}) => {
    const badges = Array.from({ length: count }).fill(0);

    return (
        <div className="flex flex-wrap gap-3">
            {badges.map((_, index) => (
                <Skeleton key={index} className="w-[120px] h-[34px]" />
            ))}
        </div>
    )
}

export default BadgesLoadingSkeleton
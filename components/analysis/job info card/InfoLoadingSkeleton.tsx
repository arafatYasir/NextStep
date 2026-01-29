import { Skeleton } from "@/components/ui/skeleton";

const InfoLoadingSkeleton = ({ count }: { count: number }) => {
    const items = Array.from({ length: count }).fill(0);
    return (
        <ul className="space-y-2.5">
            {items.map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                    <Skeleton className="w-2 h-2 rounded-full" />
                    <Skeleton className="w-full h-3" />
                </div>
            ))}
        </ul>
    )
};

export default InfoLoadingSkeleton
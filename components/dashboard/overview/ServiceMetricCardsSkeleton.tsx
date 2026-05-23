import { Skeleton } from "@/components/ui/skeleton";

const MetricCardSkeleton = () => {
    return (
        <div className="bg-card p-6 rounded-xl border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] transition-all duration-250 shadow-md">
            {/* ---- Label Skelton ---- */}
            <div className="flex items-center gap-x-3 mb-4">
                <Skeleton className="size-9 rounded-lg" />
                <Skeleton className="w-[70%] rounded h-5" />
            </div>

            {/* ---- Value and Description Skeleton ---- */}
            <div className="space-y-1">
                <Skeleton className="w-[20%] rounded h-10" />
                <Skeleton className="w-[87%] rounded h-5" />
            </div>
        </div>
    )
};

const ServiceMetricCardsSkeleton = () => {
    const cards: Array<number> = [1, 2, 3, 4];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
                cards.map((card: number) => (
                    <MetricCardSkeleton key={card} />
                ))
            }
        </div>
    )
}

export default ServiceMetricCardsSkeleton
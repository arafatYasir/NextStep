import { Skeleton } from "@/components/ui/skeleton"

const OverviewSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* ---- Tabs Skeleton ---- */}
            <Skeleton className="w-full rounded-xl h-[45px]" />

            {/* ---- Job Analysis Skeleton ---- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="w-full rounded-xl h-[250px]" />
                ))}
            </div>
        </div>
    )
}

export default OverviewSkeleton
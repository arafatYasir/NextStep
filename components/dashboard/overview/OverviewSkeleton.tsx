import { Skeleton } from "@/components/ui/skeleton"

const OverviewSkeleton = () => {
    return (
        <div className="flex-1 p-8 space-y-10 max-w-7xl">
            {/* ---- Tabs Skeleton ---- */}
            <div className="space-y-6">
                <Skeleton className="w-full rounded-xl h-[45px]" />
            </div>

            {/* ---- Job Analysis Skeleton ---- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({length: 4}).map((_, index) => (
                    <Skeleton key={index} className="w-full rounded-xl h-[250px]" />
                ))}
            </div>
        </div>
    )
}

export default OverviewSkeleton
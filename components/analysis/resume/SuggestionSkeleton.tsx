import { Skeleton } from "@/components/ui/skeleton"

const SuggestionSkeleton = ({ count }: { count: number }) => {
    return (
        Array.from({ length: count }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg border border-[rgb(var(--border-default))] p-3">
                <div className="flex items-center gap-2">
                    <Skeleton className="size-3 xs:size-4 rounded" />
                    <Skeleton className="h-3 xs:h-4 w-[80%] rounded" />
                </div>

                <div className="pl-6 mt-2 space-y-1.5">
                    <Skeleton className="w-full h-3 rounded" />
                    <Skeleton className="w-[80%] h-3 rounded" />
                    <Skeleton className="w-[60%] h-3 rounded" />
                </div>
            </div>
        ))
    )
}

export default SuggestionSkeleton
import { SingleJobCardSkeleton } from "./SingleJobCardSkeleton"

const JobCardsSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <SingleJobCardSkeleton key={i} />
            ))}
        </div>
    )
}

export default JobCardsSkeleton
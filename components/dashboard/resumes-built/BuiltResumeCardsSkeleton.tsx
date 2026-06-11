import SingleBuiltResumeCardSkeleton from "./SingleBuiltResumeCardSkeleton"

const BuiltResumeCardsSkeleton = ({ count = 5 }: { count?: number }) => {

    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <SingleBuiltResumeCardSkeleton key={i} />
            ))}
        </div>
    )
}

export default BuiltResumeCardsSkeleton
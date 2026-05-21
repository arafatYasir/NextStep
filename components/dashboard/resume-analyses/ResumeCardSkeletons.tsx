import { SingleResumeCardSkeleton } from "./SingleResumeCardSkeleton"

const ResumeCardSkeletons = () => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <SingleResumeCardSkeleton key={i} />
            ))}
        </div>
    )
}

export default ResumeCardSkeletons
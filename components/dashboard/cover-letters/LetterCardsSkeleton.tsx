import SingleLetterCardSkeleton from "./ingleLetterCardSkeleton";

const LetterCardsSkeleton = ({ count = 5 }: { count?: number }) => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: count }).map((_, idx) => (
                <SingleLetterCardSkeleton key={idx} />
            ))}
        </div>
    );
};

export default LetterCardsSkeleton;

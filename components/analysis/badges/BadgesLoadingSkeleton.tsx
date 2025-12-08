import BadgeLoading from "./BadgeLoading";

const BadgesLoadingSkeleton = ({count} : {count: number}) => {
    const badges = Array.from({ length: count }).fill(0);
    return (
        <div className="flex flex-wrap gap-3">
            {badges.map((_, index) => (
                <BadgeLoading key={index} />
            ))}
        </div>
    )
}

export default BadgesLoadingSkeleton
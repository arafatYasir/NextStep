import InfoTextLoading from "./InfoTextLoading";

const InfoLoadingSkeleton = ({ count }: { count: number }) => {
    const items = Array.from({ length: count }).fill(0);
    return (
        <ul className="space-y-2.5">
            {items.map((_, index) => (
                <InfoTextLoading key={index} />
            ))}
        </ul>
    )
};

export default InfoLoadingSkeleton
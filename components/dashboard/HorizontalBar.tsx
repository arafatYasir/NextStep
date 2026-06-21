interface HorizontalBarProps {
    name: string;
    count: number;
    maxCount: number;
}

const HorizontalBar = ({ name, count, maxCount }: HorizontalBarProps) => {
    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

    return (
        <div className="space-y-1.5 w-full">
            <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-foreground truncate pr-4 font-heading">
                    {name}
                </span>
                <span className="text-sm font-bold text-foreground tabular-nums font-sans">
                    {count} {count === 1 ? 'time' : 'times'}
                </span>
            </div>
            <div className="h-1.5 xs:h-2 w-full bg-[rgb(var(--border-default))] rounded-full overflow-hidden">
                <div
                    className="h-full bg-[rgb(var(--bg-primary))] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default HorizontalBar;
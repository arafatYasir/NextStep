import { Skeleton } from "@/components/ui/skeleton";

const ProgressBar = ({ label, score, isLoading }: { label: string, score: number, isLoading: boolean }) => {
    if (isLoading) {
        return (
            <div>
                <div className="flex justify-between items-center mb-2 font-heading text-base font-bold text-foreground">
                    <span>{label}</span>
                    <Skeleton className="h-4 w-8" />
                </div>
                <div>
                    <Skeleton className="h-2.5" />
                </div>
            </div>
        )
    }

    const getColor = (val: number) => {
        if (val >= 80) return 'bg-emerald-500';
        if (val >= 60) return 'bg-amber-500';
        return 'bg-rose-500';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2 font-heading text-base font-bold text-foreground">
                <span>{label}</span>
                <span>{score}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className={`h-2.5 rounded-full transition-all duration-1000 ${getColor(score)}`} style={{ width: `${score}%` }}></div>
            </div>
        </div>
    );
}

export default ProgressBar;
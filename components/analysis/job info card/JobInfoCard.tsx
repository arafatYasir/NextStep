import EmptyState from "../EmptyState";
import InfoLoadingSkeleton from "./InfoLoadingSkeleton";

interface props {
    title: string;
    icon: React.ReactNode;
    items: string[];
    isLoading: boolean,
    loadingSkeletons?: number
}

const JobInfoCard = ({ title, icon, items, isLoading, loadingSkeletons = 2 }: props) => (
    <div className="p-4 sm:p-6 rounded-xl bg-card border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] transition-colors duration-250 font-sans">
        <div className="flex items-center gap-2 mb-4">
            {icon}
            <span className="text-[11px] xs:text-xs font-bold uppercase tracking-wider text-foreground">{title}</span>
        </div>
        <ul className="space-y-2">
            {
                (!items?.length && isLoading) ? (
                    <InfoLoadingSkeleton count={loadingSkeletons} />
                ) : (items?.length > 0 && !isLoading) ? (
                    items?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs xs:text-sm text-foreground font-medium leading-relaxed">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-foreground/80 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))
                ) : <EmptyState text="Not specified" />
            }
        </ul>
    </div>
);

export default JobInfoCard;
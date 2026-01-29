import BadgesLoadingSkeleton from "../badges/BadgesLoadingSkeleton";
import EmptyState from "../EmptyState";
import InfoLoadingSkeleton from "./InfoLoadingSkeleton";

interface props {
    title: string;
    icon: React.ReactNode;
    items: string[];
    isLoading: boolean
}

const JobInfoCard = ({ title, icon, items, isLoading }: props) => (
    <div className="p-6 rounded-xl bg-card border border-[rgb(var(--border-default))] font-sans">
        <div className="flex items-center gap-2 mb-4">
            {icon}
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">{title}</span>
        </div>
        <ul className="space-y-2">
            {
                (!items?.length && isLoading) ? (
                    <InfoLoadingSkeleton count={2} />
                ) : (items?.length > 0 && !isLoading) ? (
                    items?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground font-medium leading-relaxed">
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
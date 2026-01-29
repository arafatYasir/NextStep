import BadgesLoadingSkeleton from "../badges/BadgesLoadingSkeleton";
import EmptyState from "../EmptyState";
import InfoLoadingSkeleton from "./InfoLoadingSkeleton";

interface props {
    title: string;
    icon: React.ReactNode;
    items: string[];
    isLoading: boolean
}

const InfoCard = ({ title, icon, items, isLoading }: props) => (
    <div className="p-5 rounded-2xl bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-light))] shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4 text-[rgb(var(--text-secondary))]">
            {icon}
            <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
        </div>
        <ul className="space-y-2.5">
            {
                (!items?.length && isLoading) ? (
                    <InfoLoadingSkeleton count={2} />
                ) : (items?.length > 0 && !isLoading) ? (
                    items?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[rgb(var(--text-primary))] font-medium leading-relaxed">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-[rgb(var(--text-tertiary))] shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))
                ) : <EmptyState text="Not specified" />
            }
        </ul>
    </div>
);

export default InfoCard;
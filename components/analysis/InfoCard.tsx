interface props {
    title: string;
    icon: React.ReactNode;
    items: string[];
}

const InfoCard = ({ title, icon, items }: props) => (
    <div className="p-5 rounded-2xl bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-light))] shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4 text-[rgb(var(--text-secondary))]">
            {icon}
            <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
        </div>
        <ul className="space-y-2.5">
            {items?.length > 0 ? items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[rgb(var(--text-primary))] font-medium leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[rgb(var(--text-tertiary))]" />
                    <span>{item}</span>
                </li>
            )) : (
                <li className="text-sm text-[rgb(var(--text-muted))] italic pl-3">Not specified</li>
            )}
        </ul>
    </div>
);

export default InfoCard;
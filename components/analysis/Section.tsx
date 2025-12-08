interface props {
    title: string;
    description?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const Section = ({ title, description, icon, children }: props) => (
    <div className="bg-[rgb(var(--bg-surface))] rounded-2xl p-6 shadow-sm border border-[rgb(var(--border-light))]">
        <div className="flex items-start gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-[rgb(var(--bg-input))] shadow-sm border border-[rgb(var(--border-light))]">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-lg text-[rgb(var(--text-primary))]">{title}</h3>
                {description && <p className="text-sm text-[rgb(var(--text-secondary))] font-medium">{description}</p>}
            </div>
        </div>
        {children}
    </div>
);

export default Section;
const ResumeSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-1">
        <h3 className="font-heading font-bold text-foreground text-base sm:text-lg tracking-tight flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-linear-to-b from-[rgb(var(--bg-primary))] to-[rgb(var(--bg-primary-hover))]" />
            {title}
        </h3>
        {children}
    </div>
);

export default ResumeSection;
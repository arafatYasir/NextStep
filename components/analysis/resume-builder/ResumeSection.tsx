const ResumeSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-1">
        <h3 className="font-heading font-bold text-foreground text-base tracking-tight">
            {title}
        </h3>
        {children}
    </div>
);

export default ResumeSection;
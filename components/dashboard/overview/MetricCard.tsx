import { cn } from "@/lib/utils";

interface MetricCardProps {
    label: string;
    value: number | string;
    icon: React.ElementType;
    description: string;
    className?: string;
}

const MetricCard = ({ label, value, icon: Icon, description, className }: MetricCardProps) => (
    <div className={cn(
        "bg-card p-6 rounded-xl border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] transition-all duration-250 shadow-md",
        className
    )}>
        {/* ---- Label ---- */}
        <div className="flex items-center gap-x-3 mb-4">
            <div className="p-2 rounded-lg bg-[rgb(var(--bg-primary))]/10">
                <Icon className="size-5 text-[rgb(var(--bg-primary))]" />
            </div>
            <span className="font-medium text-foreground uppercase tracking-wider">
                {label}
            </span>
        </div>

        {/* ---- Value and Description ---- */}
        <div className="space-y-1">
            <h3 className="text-2xl font-bold font-heading text-foreground">
                {value}
            </h3>
            <p className="text-sm font-sans text-foreground/80">
                {description}
            </p>
        </div>
    </div>
);

export default MetricCard;
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
    const isPopular = plan.tag === "Most Popular";

    return (
        <div className={cn(
            "group relative flex flex-col gap-5 xs:gap-6 p-5 xs:p-6 rounded-xl border transition-all duration-250 shadow-xl bg-card",
            isPopular
                ? "border-[rgb(var(--border-hover))]"
                : "border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))]"
        )}>
            {/* ---- Popular Tag ---- */}
            {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-foreground text-background text-xs font-bold tracking-wider uppercase shadow-lg">
                    {plan.tag}
                </div>
            )}

            {/* ---- Plan Header ---- */}
            <div className="space-y-2">
                <h3 className="font-heading text-xl xs:text-[22px] font-bold tracking-tight text-foreground">
                    {plan.plan}
                </h3>
                <p className="font-sans text-sm xs:text-base text-foreground/80 leading-relaxed">
                    {plan.description}
                </p>
            </div>

            {/* ---- Pricing ---- */}
            <div className="flex items-baseline gap-1">
                <span className="text-3xl xs:text-4xl font-bold tracking-tight text-foreground">{plan.price}</span>
                <span className="text-muted-foreground font-medium">/month</span>
            </div>

            {/* ---- CTA Button ---- */}
            <Button
                variant={isPopular ? "default" : "outline"}
                className={cn("w-full font-sans shadow-md duration-250", {
                    "hover:-translate-y-0.5 active:-translate-y-0.5": isPopular
                })}
            >
                {plan.cta || "Get Started"}
            </Button>

            {/* ---- Divider ---- */}
            <div className="h-px w-full bg-[rgb(var(--border-default))]" />

            {/* ---- Features ---- */}
            <div className="flex-1 space-y-4">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">What's included:</p>
                <ul className="space-y-3 leading-normal">
                    {plan.allowed.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 group/item">
                            <div className="rounded-full p-1 bg-[rgb(var(--text-accent))]/10 text-[rgb(var(--text-accent))]">
                                <Check className="w-3 h-3 xs:w-[14px] xs:h-[14px]" strokeWidth={3} />
                            </div>
                            <span className="text-xs xs:text-sm font-sans text-foreground/90 leading-tight">
                                {feature}
                            </span>
                        </li>
                    ))}

                    {plan.notAllowed.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 grayscale">
                            <div className="rounded-full p-1 bg-[rgb(var(--text-accent))]/10 text-[rgb(var(--text-accent))]">
                                <X size={14} strokeWidth={3} />
                            </div>
                            <span className="text-xs xs:text-sm font-sans text-muted-foreground leading-tight line-through decoration-[rgb(var(--text-accent))]">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PricingCard
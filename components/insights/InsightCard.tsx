const InsightCard = ({ item }: { item: InsightItem }) => {
    return (
        <div className="group relative flex flex-col gap-4 p-4 xs:p-6 rounded-xl border border-transparent hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] bg-card transition-all duration-250 shadow-xl">
            <div className="flex items-center gap-2.5">
                <div className="size-8 sm:size-10 rounded-xl bg-[rgb(var(--bg-primary))] text-white flex items-center justify-center shrink-0">
                    <item.icon className="size-5 sm:size-6" />
                </div>
                <h3 className="text-base sm:text-lg font-heading font-bold text-foreground">
                    {item.title}
                </h3>
            </div>
            <p className="text-foreground/80 font-sans leading-relaxed text-sm">
                {item.description}
            </p>
        </div>
    )
}

export default InsightCard
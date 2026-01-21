const InsightCard = ({ item }: { item: InsightItem }) => {
    return (
        <div className="group relative flex flex-col gap-4 p-4 xs:p-6 rounded-xl border border-transparent hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] bg-card transition-all duration-250 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[rgb(var(--bg-primary))] text-white flex items-center justify-center">
                <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">
                {item.title}
            </h3>
            <p className="text-foreground/80 font-sans leading-relaxed text-sm">
                {item.description}
            </p>
        </div>
    )
}

export default InsightCard
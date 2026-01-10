const InsightCard = ({ item }: { item: InsightItem }) => {
    return (
        <div className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-[rgb(var(--border-default))] hover:border-[rgb(var(--border-hover))] bg-card hover:bg-[rgb(var(--bg-primary))]/10 transition-all duration-250 hover:-translate-y-1 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[rgb(var(--bg-primary))] text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-250">
                <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-[rgb(var(--bg-primary))] transition-colors duration-250">
                {item.title}
            </h3>
            <p className="text-muted-foreground font-sans leading-relaxed text-sm group-hover:text-foreground transition-colors duration-250">
                {item.description}
            </p>
        </div>
    )
}

export default InsightCard
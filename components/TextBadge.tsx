const TextBadge = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="inline-flex items-center gap-x-2 rounded-full border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface-alpha))] px-2 py-1 text-sm font-medium text-foreground shadow-sm">
            {children}
        </div>
    )
}

export default TextBadge
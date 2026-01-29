const InfoTextLoading = () => {
    return (
        <li className="flex items-center gap-2">
            {/* Bullet point placeholder */}
            <span className="w-2 h-2 rounded-full bg-[rgb(var(--border-default))] shrink-0 opacity-50" />

            <div className="w-full relative overflow-hidden">
                {/* Text placeholder */}
                <div className="w-full h-4 bg-[rgb(var(--border-default))] rounded opacity-50" />

                {/* Shimmer overlay */}
                <div
                    className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 dark:via-white/20 to-transparent"
                    style={{
                        animation: 'shimmer 2s linear infinite'
                    }}
                />
            </div>
        </li>
    )
}

export default InfoTextLoading
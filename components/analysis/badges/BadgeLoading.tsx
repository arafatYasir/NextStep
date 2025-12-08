const BadgeLoading = () => {
    return (
        <div className="relative flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg px-3 bg-[rgb(var(--bg-input))] border border-[rgb(var(--border-light))] overflow-hidden">
            {/* Text placeholder */}
            <div className="h-3 w-20 bg-[rgb(var(--border-default))] rounded opacity-50"></div>
            
            {/* Count badge placeholder */}
            <div className="h-4 w-4 bg-[rgb(var(--border-default))] rounded-full opacity-50"></div>
            
            {/* Shimmer overlay */}
            <div 
                className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 dark:via-white/15 to-transparent"
                style={{
                    animation: 'shimmer 2s linear infinite'
                }}
            ></div>
        </div>
    );
};

export default BadgeLoading;
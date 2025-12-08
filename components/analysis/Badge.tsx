interface props {
    name: string;
    count: number;
    variant: "blue" | "indigo" | "emerald" | "rose" | "teal"
}

const Badge = ({ name, count, variant }: props) => {
    // Enhanced styles for better visibility in light mode
    const styles = {
        blue: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-200 dark:border-blue-500/20 dark:hover:bg-blue-500/20",
        indigo: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-200 dark:border-indigo-500/20 dark:hover:bg-indigo-500/20",
        emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20 dark:hover:bg-emerald-500/20",
        rose: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-200 dark:border-rose-500/20 dark:hover:bg-rose-500/20",
        teal: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 dark:bg-teal-500/10 dark:text-teal-200 dark:border-teal-500/20 dark:hover:bg-teal-500/20",
    };

    return (
        <div className={`
            group flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border transition-all duration-200
            ${styles[variant]} cursor-default
        `}>
            <span className="font-semibold text-[13px] tracking-wide">{name}</span>
            {count > 0 && (
                <span className={`
                    flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-md
                    bg-white/80 text-current shadow-sm dark:bg-black/20
                `}>
                    {count}
                </span>
            )}
        </div>
    );
};

export default Badge;
interface props {
    name: string;
    count: number;
    variant: "blue" | "indigo" | "emerald" | "rose" | "teal"
}

const Badge = ({ name, count, variant }: props) => {
    // Enhanced styles for better visibility in light mode
    const styles = {
        blue: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
        indigo: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
        emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
        rose: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
        teal: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
    };

    return (
        <div className={`group flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border transition-all duration-200
            ${styles[variant]} cursor-default font-sans
        `}>
            <span className="font-semibold text-sm tracking-wide">{name}</span>
            {count > 0 && (
                <span className={`
                    flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-md bg-white/80 text-current shadow-sm font-sans
                `}>
                    {count}
                </span>
            )}
        </div>
    );
};

export default Badge;
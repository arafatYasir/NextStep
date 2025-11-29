const DashboardStatus = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
                { label: "Total Jobs", value: "24", icon: "📋", color: "from-blue-500 to-blue-600" },
                { label: "Active Roles", value: "18", icon: "✅", color: "from-green-500 to-green-600" },
                { label: "Categories", value: "8", icon: "📁", color: "from-purple-500 to-purple-600" },
                { label: "This Month", value: "+12", icon: "📈", color: "from-orange-500 to-orange-600" },
            ].map((stat, index) => (
                <div
                    key={index}
                    className="bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] rounded-2xl p-6 hover:shadow-xl hover:border-[rgb(var(--border-hover))] transition-all duration-200 group"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-[rgb(var(--text-primary))] mb-1">{stat.value}</h3>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}

export default DashboardStatus
import LeftSidebar from "@/components/dashboard/LeftSidebar"

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex items-start h-screen overflow-hidden">
            <LeftSidebar />
            <div className="flex-1 h-full scrollbar-custom overflow-y-auto">
                {children}
            </div>
        </main>
    )
}

export default DashboardPage
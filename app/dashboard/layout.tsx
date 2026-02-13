import LeftSidebar from "@/components/dashboard/LeftSidebar"

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex items-start">
            <LeftSidebar />
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </main>
    )
}

export default DashboardPage
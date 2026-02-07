import LeftSidebar from "@/components/dashboard/LeftSidebar"

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex items-start gap-x-12">
            <LeftSidebar />
            {children}
        </main>
    )
}

export default DashboardPage
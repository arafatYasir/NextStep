import { cn } from "@/lib/utils"

const Container = ({ children, removeDefault = false }: { children: React.ReactNode, removeDefault?: boolean }) => {
    return (
        <div className={cn(
            !removeDefault && "max-w-[1360px] mx-auto px-6"
        )}>
            {children}
        </div>
    )
}

export default Container
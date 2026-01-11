import { cn } from "@/lib/utils";

const Section = ({ sectionId, resetStyles, className, children }: { sectionId?: string; resetStyles?: boolean; className?: string; children: React.ReactNode }) => {
    return (
        <section id={sectionId} className={cn(className, {"py-25 space-y-20": !resetStyles})}>{children}</section>
    )
}

export default Section
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-[rgb(var(--border-default))] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-white/50 before:to-transparent before:animate-shimmer rounded-lg", className)}
      {...props}
    />
  )
}

export { Skeleton }

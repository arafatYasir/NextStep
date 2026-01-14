import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Submenu = ({ option }: { option: NavSubmenu }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 py-1.5 text-base font-medium text-foreground hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-200 ease-in-out cursor-pointer group data-[state=open]:text-[rgb(var(--bg-primary-hover))] outline-none">
                <span>
                    {option.name}
                </span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180 opacity-70 group-hover:opacity-100" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                className="mt-2.5 min-w-[320px] p-2 bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] shadow-lg rounded-xl duration-200"
            >
                {option.childrens.map((child) => (
                    <DropdownMenuItem key={child.id} asChild className="outline-none">
                        <Link
                            href={child.url}
                            className="flex items-start gap-4 w-full px-3 py-3 text-sm font-sans text-foreground rounded-lg transition-colors duration-250 ease-in-out group"
                        >
                            {child.icon && (
                                <div className="shrink-0">
                                    <child.icon
                                        size={24}
                                        className="group-hover:text-[rgb(var(--bg-primary-hover))] transition-colors duration-250 ease-in-out"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <span className="font-bold leading-none">{child.name}</span>

                                <span className="text-xs text-muted-foreground leading-snug group-hover:text-foreground transition-colors duration-250 ease-in-out">
                                    {child.description}
                                </span>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Submenu
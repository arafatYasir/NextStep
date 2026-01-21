import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
    id: number;
    title: string;
    description: React.ReactNode;
    image: string;
}

const HowItWorksStep = ({ step }: { step: Props }) => {
    const { id, title, description, image } = step;

    // Determine layout direction based on ID
    const isEven = id % 2 === 0;

    return (
        <div className={cn(
            `flex flex-col-reverse gap-5 md:gap-10 items-center justify-center p-4 border border-transparent hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))] bg-card hover:bg-[rgb(var(--bg-primary))]/5 active:bg-[rgb(var(--bg-primary))]/5 transition-all duration-250 py-4 rounded-xl relative group shadow-lg`,
            isEven ? "md:flex-row-reverse" : "md:flex-row",

        )}>
            <div className="absolute bottom-[calc(100%+40px)] md:bottom-[calc(100%+60px)] left-1/2 -translate-x-1/2 translate-y-1/2 w-7 h-7 flex items-center justify-center text-background font-bold bg-[rgb(var(--bg-primary-hover))] z-20 rounded-full font-sans">
                {id}
            </div>
            
            {/* ---- Section Connector ---- */}
            <div className="absolute bottom-[calc(100%+1px)] w-[2px] h-20 md:h-[120px] bg-linear-to-br from-[rgb(var(--bg-primary))]/20 to-[rgb(var(--bg-primary-hover))] z-10"></div>

            {/* ---- Description Part ---- */}
            <div className={cn(
                "w-full md:w-1/2 space-y-6",
                isEven ? "md:text-right" : "text-left"
            )}>
                <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground group-hover:text-[rgb(var(--bg-primary-hover))] group-active:text-[rgb(var(--bg-primary-hover))] transition-all duration-250 font-heading">
                    {title}
                </h3>

                {/* ---- Main Description ---- */}
                <div className="text-sm xs:text-base md:text-lg text-muted-foreground leading-relaxed [&_a]:text-[rgb(var(--bg-primary))] [&_a]:font-medium [&_a]:hover:underline [&_a]:hover:text-[rgb(var(--bg-primary-hover))] group-hover:text-foreground group-active:text-foreground transition-all duration-250 font-sans">
                    {description}
                </div>
            </div>

            {/* ---- Image Part ---- */}
            <div className="w-full md:w-[35%] max-w-[400px] hover:scale-105 active:scale-105 transition-all duration-400 aspect-square relative overflow-hidden rounded-xl bg-white/5 shadow-xl">
                <Image
                    src={image}
                    width={400}
                    height={400}
                    alt={`How It works step ${id}`}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}

export default HowItWorksStep
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
            "flex flex-col gap-10 lg:items-center justify-center border border-[rgb(var(--border-default))] py-4 rounded-xl",
            isEven ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
            {/* ---- Description Part ---- */}
            <div className={cn(
                "w-1/2 space-y-6",
                isEven ? "text-right" : "text-left"
            )}>
                {/* ---- Step Indicator ---- */}
                <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-sm font-medium text-primary backdrop-blur-md shadow-sm">
                    <span>• Step {id}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {title}
                </h3>

                {/* ---- Main Description ---- */}
                <div className="text-lg text-muted-foreground leading-relaxed [&_a]:text-[rgb(var(--bg-primary))] [&_a]:font-medium [&_a]:hover:underline [&_a]:hover:text-[rgb(var(--bg-primary-hover))]">
                    {description}
                </div>
            </div>

            {/* ---- Image Part ---- */}
            <div className="w-[35%] relative overflow-hidden rounded-xl bg-white/5 shadow-2xl">
                <Image
                    src={image}
                    width={442}
                    height={442}
                    alt={`How It works step ${id}`}
                    className="w-full h-auto object-cover"
                />
            </div>
        </div>
    )
}

export default HowItWorksStep
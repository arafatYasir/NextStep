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
            "flex flex-col gap-12 lg:items-center",
            isEven ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
            {/* ---- Description Part ---- */}
            <div className="flex-1 space-y-6">
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
            <div className="flex-1 w-full relative group">
                {/* ---- Background Glow Effect ---- */}
                <div className="absolute -inset-4 bg-linear-to-r from-[rgb(var(--bg-primary))]/20 to-[rgb(var(--bg-primary))]/5 blur-2xl rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* ---- Image ---- */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                    <Image
                        src={image}
                        width={800}
                        height={600}
                        alt={`How It works step ${id}`}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

export default HowItWorksStep
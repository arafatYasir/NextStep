import Image from "next/image"
import { Quote, Star } from "lucide-react"

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialItem }) => {
    const { rating, quote, name, title, image } = testimonial;
    
    return (
        <div className="group relative max-w-[420px] flex flex-col gap-6 p-6 rounded-2xl border border-[rgb(var(--border-default))] bg-card transition-all duration-250 shadow-xl hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))]">
            {/* ---- Quote Icon ---- */}
            <div className="absolute top-5 right-5 text-muted-foreground/20">
                <Quote size={36} fill="currentColor" />
            </div>

            {/* ---- Rating ---- */}
            <div className="flex gap-1">
                {[...Array(rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                ))}
            </div>

            {/* ---- Comment ---- */}
            <q className="text-foreground/80 font-sans leading-relaxed text-base italic">
                {quote}
            </q>

            {/* ---- User Info ---- */}
            <div className="flex items-center gap-4">
                {/* ---- Image with Border ---- */}
                <div className="relative p-0.5 rounded-full bg-foreground">
                    <div className="w-14 h-14 overflow-hidden rounded-full border-2 border-background">
                        <Image
                            src={image || "/images/avatar.png"}
                            alt={`${name} Profile Image`}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover select-none group-hover:scale-110 transition-transform duration-250"
                        />
                    </div>
                </div>

                {/* ---- Info ---- */}
                <div className="flex flex-col">
                    <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">{name}</h3>
                    <p className="text-sm font-sans text-foreground/80 font-medium">{title}</p>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard
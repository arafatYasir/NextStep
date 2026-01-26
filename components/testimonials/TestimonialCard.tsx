import Image from "next/image"
import { Quote, Star } from "lucide-react"

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialItem }) => {
    const { rating, quote, name, title, image } = testimonial;
    
    return (
        <div className="group relative max-w-[420px] mx-auto flex flex-col gap-5 sm:gap-6 p-6 rounded-2xl border border-[rgb(var(--border-default))] bg-card transition-all duration-250 shadow-xl hover:border-[rgb(var(--border-hover))] active:border-[rgb(var(--border-hover))]">
            {/* ---- Quote Icon ---- */}
            <div className="absolute top-5 right-5 text-muted-foreground/20">
                <Quote className="w-7 h-7 sm:w-9 sm:h-9" fill="currentColor" />
            </div>

            {/* ---- Rating ---- */}
            <div className="flex gap-1">
                {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="fill-amber-400 text-amber-400 w-4 h-4 sm:w-5 sm:h-5" />
                ))}
            </div>

            {/* ---- Comment ---- */}
            <q className="text-foreground/80 font-sans leading-relaxed text-sm sm:text-base italic">
                {quote}
            </q>

            {/* ---- User Info ---- */}
            <div className="flex items-center gap-3 sm:gap-4">
                {/* ---- Image with Border ---- */}
                <div className="relative p-0.5 rounded-full bg-foreground">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-full border-2 border-background">
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
                    <h3 className="font-heading text-base sm:text-lg font-bold tracking-tight text-foreground">{name}</h3>
                    <p className="text-xs sm:text-sm font-sans text-foreground/80 font-medium">{title}</p>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard
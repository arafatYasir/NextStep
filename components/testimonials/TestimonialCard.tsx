import Image from "next/image"
import { Quote, Star } from "lucide-react"

const TestimonialCard = () => {
    return (
        <div className="group relative max-w-[420px] flex flex-col gap-6 p-6 rounded-2xl border border-[rgb(var(--border-default))] bg-card hover:bg-[rgb(var(--bg-primary))]/10 transition-all duration-250 hover:-translate-y-1 shadow-xl hover:border-[rgb(var(--border-hover))]">
            {/* ---- Quote Icon ---- */}
            <div className="absolute top-5 right-5 text-muted-foreground/20">
                <Quote size={36} fill="currentColor" />
            </div>

            {/* ---- Rating ---- */}
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                ))}
            </div>

            {/* ---- Comment ---- */}
            <q className="text-muted-foreground font-sans leading-relaxed text-base group-hover:text-foreground transition-colors duration-250 italic">
                Finding the right roles was always a challenge until I started using this platform. The AI insights helped me tailor my profile perfectly for the jobs I actually wanted.
            </q>

            {/* ---- User Info ---- */}
            <div className="flex items-center gap-4">
                {/* ---- Image with Border ---- */}
                <div className="relative p-0.5 rounded-full bg-primary/50">
                    <div className="w-14 h-14 overflow-hidden rounded-full border-2 border-background">
                        <Image
                            src="/images/zaved-karim.webp"
                            alt="Zaved Karim Profile"
                            width={56}
                            height={56}
                            className="w-full h-full object-cover select-none group-hover:scale-110 transition-transform duration-250"
                        />
                    </div>
                </div>

                {/* ---- Info ---- */}
                <div className="flex flex-col">
                    <h4 className="font-heading text-lg font-bold tracking-tight text-foreground">Zaved Karim</h4>
                    <p className="text-sm font-sans text-muted-foreground font-medium group-hover:text-primary/80 transition-colors">Sr. Software Engineer @Google</p>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard
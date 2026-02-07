const Offer = ({ offer }: { offer: OfferItem }) => {
    const { id, title, description } = offer;

    return (
        <li className="flex items-stretch gap-x-3 sm:gap-x-5 group">
            {/* ---- Left Side Indicator w/ Connector ---- */}
            <div className="flex flex-col items-center shrink-0">
                <div id={`offer-dot-${id}`} className="flex items-center justify-center w-7 h-7 rounded-full bg-[rgb(var(--bg-primary-hover))] font-sans text-white border border-[rgb(var(--border-default))] z-10">
                    {id}
                </div>

                {/* Dynamic Connector Line */}
                <div className="w-[4px] bg-[rgb(var(--bg-primary))] flex-1 -my-px rounded-b-full"></div>
            </div>

            {/* ---- Right Side Content ---- */}
            <div className="pb-5 group-last:pb-0">
                <h3 className="text-lg xs:text-xl sm:text-2xl font-heading font-bold text-foreground leading-none py-px">{title}</h3>
                <p className="text-sm sm:text-base text-foreground/80 font-sans leading-normal mt-2">{description}</p>
            </div>
        </li>
    )
}

export default Offer
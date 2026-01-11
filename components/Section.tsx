const Section = ({ sectionId, children }: { sectionId: string; children: React.ReactNode }) => {
    return (
        <section id={sectionId} className="py-25 space-y-20">{children}</section>
    )
}

export default Section
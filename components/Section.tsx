const Section = ({ sectionId, children }: { sectionId: string; children: React.ReactNode }) => {
    return (
        <section id={sectionId}>{children}</section>
    )
}

export default Section
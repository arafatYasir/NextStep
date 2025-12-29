import Image from "next/image";

interface Props {
    id: number;
    title: string;
    description: React.ReactNode;
    image: string;
}

const HowItWorksStep = ({ step }: { step: Props }) => {
    const { id, title, description, image } = step;
    console.log(title);
    return (
        <div className="flex items-start justify-center gap-x-10 border rounded-2xl p-4">
            <div className="w-1/2">
                <h3 className="text-2xl font-semibold">{title}</h3>

                <p className="text-base font-medium text-[rgb(var(--text-secondary))]">{description}</p>
            </div>
            <div className="w-1/2 h-full max-w-[600px] max-h-[600px] overflow-hidden rounded-2xl">
                <Image src={image} width={800} height={700} alt={`How It works step ${id}`} className="w-full h-full object-cover" />
            </div>
        </div>
    )
}

export default HowItWorksStep
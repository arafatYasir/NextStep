import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";

const CoverLetterLoadingView = () => {
    return (
        <Container>
            <div className="py-8 lg:py-12 flex items-start justify-center">
                <div className="w-full max-w-3xl bg-card rounded-xl shadow-xl border border-[rgb(var(--border-default))] p-5 lg:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* ---- Header: applicant + meta ---- */}
                    <div className="space-y-3 pb-6 border-b border-[rgb(var(--border-default))]">
                        <Skeleton className="h-7 w-48 rounded" />
                        <Skeleton className="h-4 w-64 rounded" />
                        <div className="flex flex-wrap gap-2 pt-1">
                            <Skeleton className="h-4 w-32 rounded" />
                            <Skeleton className="h-4 w-40 rounded" />
                        </div>
                    </div>

                    {/* ---- Recipient block ---- */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-40 rounded" />
                        <Skeleton className="h-4 w-52 rounded" />
                    </div>

                    {/* ---- Greeting ---- */}
                    <Skeleton className="h-5 w-44 rounded" />

                    {/* ---- Opening ---- */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-[92%] rounded" />
                        <Skeleton className="h-4 w-[80%] rounded" />
                    </div>

                    {/* ---- Body paragraphs ---- */}
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="space-y-2">
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-[95%] rounded" />
                            <Skeleton className="h-4 w-[70%] rounded" />
                        </div>
                    ))}

                    {/* ---- Closing ---- */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[85%] rounded" />
                        <Skeleton className="h-4 w-[60%] rounded" />
                    </div>

                    {/* ---- Signature ---- */}
                    <div className="space-y-2 pt-2">
                        <Skeleton className="h-4 w-24 rounded" />
                        <Skeleton className="h-5 w-40 rounded" />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CoverLetterLoadingView;
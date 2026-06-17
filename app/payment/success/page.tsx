import PaymentSuccessPageClient from "@/components/payment/PaymentSuccessPageClient"

const PaymentSuccessPage = async ({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) => {
    const { session_id } = await searchParams;
    return (
        <PaymentSuccessPageClient sessionId={session_id || ""} />
    )
}

export default PaymentSuccessPage
import HeroSection from "@/components/hero/HeroSection"
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection"
import InsightSection from "@/components/insights/InsightSection"
import OffersSection from "@/components/offers/OffersSection"
import TestimonialsSection from "@/components/testimonials/TestimonialsSection"
import PricingSection from "@/components/pricing/PricingSection"
import FaqSection from "@/components/faq/FaqSection"

const Home = () => {
  return (
    <main>
      {/* ---- Hero Section ---- */}
      <HeroSection />

      {/* ---- How It Works Section ---- */}
      <HowItWorksSection />

      {/* ---- Insights Section ---- */}
      <InsightSection />

      {/* ---- Offers Section ---- */}
      <OffersSection />

      {/* ---- Testimonials Section ---- */}
      <TestimonialsSection />

      {/* ---- Pricing Section ---- */}
      <PricingSection />

      {/* ---- Faq Section ---- */}
      <FaqSection />
    </main>
  )
}

export default Home;
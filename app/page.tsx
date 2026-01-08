import { Hero } from "@/components/hero/Hero";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import InsightSection from "@/components/insights/InsightSection";

const Home = () => {
  return (
    <main>
      {/* ---- Hero Section ---- */}
      <Hero />

      {/* ---- How It Works Section ---- */}
      <HowItWorks />

      {/* ---- Insights Section ---- */}
      <InsightSection />
    </main>
  )
}

export default Home
import { Hero } from "@/components/hero/Hero";
import HowItWorks from "@/components/how-it-works/HowItWorks";

const Home = () => {
  return (
    <main>
      {/* ---- Hero Section ---- */}
      <Hero />

      {/* ---- How It Works Section ---- */}
      <HowItWorks />
    </main>
  )
}

export default Home
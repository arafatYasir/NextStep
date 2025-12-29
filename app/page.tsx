import { Hero } from "@/components/Hero";
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
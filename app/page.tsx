import Hero from "@/components/Hero";
import FeaturesGrid from "@/components/FeaturesGrid";
import ComparisonCard from "@/components/ComparisonCard";
import CategoryGrid from "@/components/CategoryGrid";
import ManufacturerBadge from "@/components/ManufacturerBadge";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import QualitySection from "@/components/QualitySection";
import TrustStrip from "@/components/TrustStrip";
import Footer from "@/components/Footer";
import PromoBundle from "@/components/PromoBundle";
import PromoApp from "@/components/PromoApp";
import TexturePattern from "@/components/TexturePattern";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <ManufacturerBadge />
      <Hero />
      <FeaturesGrid />



      <section className="py-24 px-4 relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <TexturePattern />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Compare & Save Big
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how much you can save by switching to Supracyn's premium generics.
            </p>
          </div>

          <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
            <div className="min-w-[280px] snap-center">
              <ComparisonCard
                brand="Lipitor (Atorvastatin)"
                brandPrice={120.50}
                supracynPrice={15.00}
              />
            </div>
            <div className="min-w-[280px] snap-center">
              <ComparisonCard
                brand="Plavix (Clopidogrel)"
                brandPrice={95.00}
                supracynPrice={12.50}
              />
            </div>
            <div className="min-w-[280px] snap-center">
              <ComparisonCard
                brand="Glucophage (Metformin)"
                brandPrice={45.00}
                supracynPrice={8.00}
              />
            </div>
            <div className="min-w-[280px] snap-center">
              <ComparisonCard
                brand="Norvasc (Amlodipine)"
                brandPrice={60.00}
                supracynPrice={9.50}
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="text-primary font-bold hover:text-teal-700 text-lg transition-colors border-b-2 border-primary hover:border-teal-700 pb-1">
              View All Medicines
            </button>
          </div>
        </div>
      </section>

      <PromoBundle />
      <HowItWorks />
      <CategoryGrid />
      <QualitySection />
      <Testimonials />
      <PromoApp />
      <TrustStrip />
      <Footer />
    </main>
  );
}


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import AnimateOnScroll from "@/components/landing/AnimateOnScroll";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FixedNavigation from "@/components/landing/FixedNavigation";

const Index = () => {
  return (
    <div className="min-h-screen font-glacial overflow-x-hidden w-full max-w-full">
      <FixedNavigation />
      <AnimateOnScroll />
      <div id="inicio" className="max-w-[100vw] overflow-hidden">
        <HeroSection />
      </div>
      <div id="como-funciona" className="max-w-[100vw] overflow-hidden">
        <HowItWorksSection />
      </div>
      <div id="recursos" className="max-w-[100vw] overflow-hidden">
        <FeaturesSection />
      </div>
      <div id="depoimentos" className="max-w-[100vw] overflow-hidden">
        <TestimonialsSection />
      </div>
      <div id="precos" className="max-w-[100vw] overflow-hidden">
        <PricingSection />
      </div>
      <div className="max-w-[100vw] overflow-hidden">
        <CTASection />
      </div>
      <div className="max-w-[100vw] overflow-hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Index;

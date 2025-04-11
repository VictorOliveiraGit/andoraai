
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
    <div className="min-h-screen font-glacial w-full">
      <FixedNavigation />
      <AnimateOnScroll />
      <div id="inicio" className="scroll-mt-20">
        <HeroSection />
      </div>
      <div id="como-funciona" className="scroll-mt-20">
        <HowItWorksSection />
      </div>
      <div id="recursos" className="scroll-mt-20">
        <FeaturesSection />
      </div>
      <div id="depoimentos" className="scroll-mt-20">
        <TestimonialsSection />
      </div>
      <div id="precos" className="scroll-mt-20">
        <PricingSection />
      </div>
      <div>
        <CTASection />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;

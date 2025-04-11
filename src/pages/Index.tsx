
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
    <div className="min-h-screen font-glacial overflow-x-hidden w-full max-w-[100vw]" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      <FixedNavigation />
      <AnimateOnScroll />
      <div id="inicio">
        <HeroSection />
      </div>
      <div id="como-funciona">
        <HowItWorksSection />
      </div>
      <div id="recursos">
        <FeaturesSection />
      </div>
      <div id="depoimentos">
        <TestimonialsSection />
      </div>
      <div id="precos">
        <PricingSection />
      </div>
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;

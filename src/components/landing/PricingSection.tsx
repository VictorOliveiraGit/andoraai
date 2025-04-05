
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

const PricingSection = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handleSubscribe = (planType: string) => {
    toast.info(`Redirecionando para o checkout do plano ${planType}...`);
  };

  const handleMouseEnter = (planType: string) => {
    setHoveredPlan(planType);
  };

  const handleMouseLeave = () => {
    setHoveredPlan(null);
  };

  return (
    <section id="precos" className="py-16 md:py-20 px-4 md:px-6 relative">
      {/* Tech-inspired background with AI elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95 z-0"></div>
        
        {/* Circuit and code pattern background */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6')] bg-cover bg-right opacity-20"></div>
        </div>
        
        {/* AI Neural network paths */}
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,100 C150,150 250,50 300,100 S400,150 500,100 S650,50 700,100" stroke="#c6ba77" strokeWidth="2" fill="none" />
            <path d="M100,200 C200,250 300,150 400,200 S500,250 600,200 S700,150 750,200" stroke="#c6ba77" strokeWidth="2" fill="none" />
            <path d="M50,300 C150,350 250,250 350,300 S450,350 550,300 S650,250 750,300" stroke="#c6ba77" strokeWidth="2" fill="none" />
            
            <circle cx="100" cy="100" r="5" fill="#c6ba77" opacity="0.8" />
            <circle cx="300" cy="100" r="5" fill="#c6ba77" opacity="0.8" />
            <circle cx="500" cy="100" r="5" fill="#c6ba77" opacity="0.8" />
            <circle cx="700" cy="100" r="5" fill="#c6ba77" opacity="0.8" />
            
            <circle cx="100" cy="200" r="5" fill="#c6ba77" opacity="0.8" />
            <circle cx="400" cy="200" r="5" fill="#c6ba77" opacity="0.8" />
            <circle cx="600" cy="200" r="5" fill="#c6ba77" opacity="0.8" />
            <circle cx="750" cy="200" r="5" fill="#c6ba77" opacity="0.8" />
            
            <circle cx="50" cy="300" r="5" fill="#c6ba77" opacity="0.8" />
            <circle cx="350" cy="300" r="5" fill="#c6ba77" opacity="0.8" />
            <circle cx="550" cy="300" r="5" fill="#c6ba77" opacity="0.8" />
            <circle cx="750" cy="300" r="5" fill="#c6ba77" opacity="0.8" />
          </svg>
        </div>
        
        {/* Floating tech particles */}
        <div className="absolute top-10 left-1/4 w-3 h-3 rounded-full bg-secondary/50 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-5 h-5 rounded-full bg-secondary/40 animate-pulse" style={{ animationDelay: "1.2s" }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-secondary/60 animate-pulse" style={{ animationDelay: "0.7s" }}></div>
        <div className="absolute bottom-10 right-1/3 w-6 h-6 rounded-full bg-secondary/30 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      </div>
      
      <div className="container mx-auto space-y-8 md:space-y-10 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">Planos de Assinatura</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <Card 
            className={`p-6 flex flex-col h-full border border-primary/20 transition-all duration-300 hover:shadow-lg backdrop-blur-sm bg-white/95 ${
              hoveredPlan === 'basic' ? 'transform scale-105' : ''
            }`}
            onMouseEnter={() => handleMouseEnter('basic')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative overflow-hidden">
              <div className="flex items-center gap-2 z-10 relative">
                <div className="p-2 bg-primary/10 rounded-full">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Básico</h3>
              </div>
            </div>
            
            <div className="space-y-1 mt-6">
              <p className="text-4xl font-bold text-primary">R$ 29<span className="text-sm font-normal text-gray-500">/mês</span></p>
              <p className="text-sm text-gray-500">Ideal para pequenos negócios</p>
            </div>
            
            <ul className="space-y-3 mt-6 flex-grow">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Até 100 usuários</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Relatórios básicos</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Suporte por email</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button 
                className="w-full bg-white hover:bg-white/90 text-primary border border-primary/20"
                onClick={() => handleSubscribe('basic')}
              >
                Assinar Plano Básico
              </Button>
            </div>
          </Card>

          <Card 
            className={`p-6 flex flex-col h-full border-2 border-secondary bg-gradient-to-b from-primary to-primary/90 text-white shadow-xl transition-all duration-300 hover:shadow-2xl backdrop-blur-sm ${
              hoveredPlan === 'pro' ? 'transform scale-105' : ''
            }`}
            onMouseEnter={() => handleMouseEnter('pro')}
            onMouseLeave={handleMouseLeave}
          >          
            <div className="relative overflow-hidden">
              <div className="flex items-center gap-2 z-10 relative">
                <div className="p-2 bg-secondary/20 rounded-full">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Pro</h3>
              </div>
            </div>
            
            <div className="space-y-1 mt-6">
              <p className="text-4xl font-bold">R$ 59<span className="text-sm font-normal text-white/70">/mês</span></p>
              <p className="text-sm text-white/70">Para negócios em crescimento</p>
            </div>
            
            <ul className="space-y-3 mt-6 flex-grow">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Até 1000 usuários</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Relatórios avançados</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Suporte prioritário</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>API access</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-primary"
                onClick={() => handleSubscribe('pro')}
              >
                Assinar Plano Pro
              </Button>
            </div>
          </Card>

          <Card 
            className={`p-6 flex flex-col h-full border border-primary/20 transition-all duration-300 hover:shadow-lg backdrop-blur-sm bg-white/95 ${
              hoveredPlan === 'enterprise' ? 'transform scale-105' : ''
            }`}
            onMouseEnter={() => handleMouseEnter('enterprise')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative overflow-hidden">
              <div className="flex items-center gap-2 z-10 relative">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Enterprise</h3>
              </div>
            </div>
            
            <div className="space-y-1 mt-6">
              <p className="text-4xl font-bold text-primary">R$ 99<span className="text-sm font-normal text-gray-500">/mês</span></p>
              <p className="text-sm text-gray-500">Para grandes empresas</p>
            </div>
            
            <ul className="space-y-3 mt-6 flex-grow">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Usuários ilimitados</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Relatórios personalizados</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Suporte 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>API dedicated</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Setup personalizado</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button 
                className="w-full bg-white hover:bg-white/90 text-primary border border-primary/20"
                onClick={() => handleSubscribe('enterprise')}
              >
                Assinar Plano Enterprise
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

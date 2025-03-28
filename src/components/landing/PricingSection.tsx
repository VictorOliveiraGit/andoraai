
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
    <section id="precos" className="py-16 md:py-20 px-4 md:px-6 gradient-plans relative">
      <div className="container mx-auto space-y-8 md:space-y-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">Planos de Assinatura</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <Card 
            className={`p-6 flex flex-col h-full border border-primary/20 transition-all duration-300 hover:shadow-lg ${
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
            className={`p-6 flex flex-col h-full border-2 border-secondary bg-gradient-to-b from-primary to-primary/90 text-white shadow-xl transition-all duration-300 hover:shadow-2xl ${
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
            className={`p-6 flex flex-col h-full border border-primary/20 transition-all duration-300 hover:shadow-lg ${
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

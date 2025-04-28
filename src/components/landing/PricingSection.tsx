
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Shield, Zap, CircuitBoard, Cpu, DatabaseZap } from "lucide-react";
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
    <section id="precos" className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Tech background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 opacity-70"></div>
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="techGridPattern" patternUnits="userSpaceOnUse" width="50" height="50">
              <path d="M 0 0 L 50 0 L 50 50 L 0 50 Z" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>
              <circle cx="25" cy="25" r="1" fill="#8B5CF6" />
              <circle cx="0" cy="0" r="1" fill="#8B5CF6" />
              <circle cx="0" cy="50" r="1" fill="#8B5CF6" />
              <circle cx="50" cy="0" r="1" fill="#8B5CF6" />
              <circle cx="50" cy="50" r="1" fill="#8B5CF6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGridPattern)" />
        </svg>
      </div>
      
      {/* Circuit lines animations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q200,50 400,100 T800,100" stroke="#8B5CF6" strokeWidth="2" fill="none">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" 
              values="M0,100 Q200,50 400,100 T800,100;
                     M0,100 Q200,150 400,100 T800,100;
                     M0,100 Q200,50 400,100 T800,100" />
          </path>
          <path d="M0,200 Q200,150 400,200 T800,200" stroke="#1EAEDB" strokeWidth="2" fill="none">
            <animate attributeName="d" dur="15s" repeatCount="indefinite" 
              values="M0,200 Q200,150 400,200 T800,200;
                     M0,200 Q200,250 400,200 T800,200;
                     M0,200 Q200,150 400,200 T800,200" />
          </path>
        </svg>
      </div>

      <div className="container mx-auto space-y-8 md:space-y-10 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondarys animate-on-scroll">Planos de Assinatura</h2>
          <p className="text-muted-foreground mt-4 animate-on-scroll">
            Escolha o plano ideal para o seu negócio e comece a transformar suas conversas em vendas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <Card 
            className={`p-6 flex flex-col h-full border border-primary/20 bg-gradient-to-b from-white to-secondary/5 transition-all duration-300 shadow hover:shadow-lg ${
              hoveredPlan === 'basic' ? 'transform scale-105' : ''
            }`}
            onMouseEnter={() => handleMouseEnter('basic')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative overflow-hidden mb-2">
              <div className="flex items-center gap-2 z-10 relative">
                <div className="p-2 bg-primary/10 rounded-full">
                  <CircuitBoard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Básico</h3>
              </div>
              
              {/* Tech decorative element */}
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-primary/5 blur-xl"></div>
            </div>
            
            <div className="space-y-1 mt-4">
              <p className="text-4xl font-bold text-primary">R$ 500<span className="text-sm font-normal text-gray-500">/mês</span></p>
              <p className="text-sm text-gray-500">Ideal para pequenos negócios</p>
            </div>
            
            <ul className="space-y-3 mt-6 flex-grow">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Até 100 conversas/mês</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>ChatBot com IA</span>
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
                className="w-full border border-primary/20 bg-white hover:bg-white/90 text-primary relative overflow-hidden group"
                onClick={() => handleSubscribe('basic')}
              >
                <span className="relative z-10">Começar Agora</span>
                <span className="absolute inset-0 bg-primary/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </div>
          </Card>

          <Card 
            className={`p-6 flex flex-col h-full border-2 border-secondary bg-gradient-to-b from-primary/95 to-primary/85 text-white shadow-xl transition-all duration-300 hover:shadow-2xl ${
              hoveredPlan === 'pro' ? 'transform scale-105' : ''
            }`}
            onMouseEnter={() => handleMouseEnter('pro')}
            onMouseLeave={handleMouseLeave}
          >          
            <div className="relative overflow-hidden mb-2">
              <div className="flex items-center gap-2 z-10 relative">
                <div className="p-2 bg-secondary/20 rounded-full">
                  <Cpu className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Pro</h3>
                <span className="absolute -right-2 -top-2 bg-secondary text-primary text-xs font-semibold px-2 py-1 rounded-md transform rotate-3">
                  Popular
                </span>
              </div>
              
              {/* Tech decorative element */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-secondary/20 blur-xl"></div>
            </div>
            
            <div className="space-y-1 mt-4">
              <p className="text-4xl font-bold">R$ 1.200<span className="text-sm font-normal text-white/70">/mês</span></p>
              <p className="text-sm text-white/70">Para negócios em crescimento</p>
            </div>
            
            <ul className="space-y-3 mt-6 flex-grow">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Até 1000 conversas/mês</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>ChatBot com IA avançada</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Relatórios avançados</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Qualificação de leads</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>API access</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Suporte prioritário</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-primary relative overflow-hidden group"
                onClick={() => handleSubscribe('pro')}
              >
                <span className="relative z-10">Escolher Plano Pro</span>
                <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Button>
            </div>
          </Card>

          <Card 
            className={`p-6 flex flex-col h-full border border-primary/20 bg-gradient-to-b from-white to-secondary/5 transition-all duration-300 shadow hover:shadow-lg ${
              hoveredPlan === 'enterprise' ? 'transform scale-105' : ''
            }`}
            onMouseEnter={() => handleMouseEnter('enterprise')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative overflow-hidden mb-2">
              <div className="flex items-center gap-2 z-10 relative">
                <div className="p-2 bg-primary/10 rounded-full">
                  <DatabaseZap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary">Enterprise</h3>
              </div>
              
              {/* Tech decorative element */}
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-primary/5 blur-xl"></div>
            </div>
            
            <div className="space-y-1 mt-4">
              <p className="text-4xl font-bold text-primary">R$ 2.000<span className="text-sm font-normal text-gray-500">/mês</span></p>
              <p className="text-sm text-gray-500">Para grandes empresas</p>
            </div>
            
            <ul className="space-y-3 mt-6 flex-grow">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Mensagens ilimitadas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>IA personalizada</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Relatórios personalizados</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Integrações avançadas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>API dedicated</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Suporte 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Setup personalizado</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button 
                className="w-full border border-primary/20 bg-white hover:bg-white/90 text-primary relative overflow-hidden group"
                onClick={() => handleSubscribe('enterprise')}
              >
                <span className="relative z-10">Entrar em Contato</span>
                <span className="absolute inset-0 bg-primary/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </div>
          </Card>
        </div>

        <div className="flex justify-center mt-8">
          <Card className="p-4 border border-secondary/30 bg-white/50 backdrop-blur-sm max-w-lg">
            <p className="text-center text-sm text-secondary font-semibold">
              Todos os planos incluem <span className="font-semibold text-sm text-primary">7 dias de teste grátis</span>. 
              Cancele a qualquer momento. Precisa de um plano personalizado?{" "}
              <a href="#contato" className="text-secondary font-medium hover:underline">Entre em contato</a>.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

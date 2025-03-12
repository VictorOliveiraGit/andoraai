
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Shield, Zap, Check, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Subscription = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  // Define current plan
  const [currentPlan, setCurrentPlan] = useState<string>("basic");
  
  const handleSubscribe = (planType: string) => {
    if (planType === currentPlan) {
      toast.info("Você já está neste plano");
      return;
    }
    
    // Show upgrade confirmation for higher plans
    if (
      (currentPlan === "basic" && (planType === "pro" || planType === "enterprise")) ||
      (currentPlan === "pro" && planType === "enterprise")
    ) {
      toast.success(`Plano atualizado com sucesso para ${planType}!`);
      setCurrentPlan(planType);
    } else {
      toast.error("Não é possível fazer downgrade para um plano inferior");
    }
  };

  const handleMouseEnter = (planType: string) => {
    setHoveredPlan(planType);
  };

  const handleMouseLeave = () => {
    setHoveredPlan(null);
  };

  // Define ribbon labels based on plan
  const getRibbonLabel = (planType: string) => {
    if (planType === currentPlan) {
      return "Seu Plano Atual";
    }
    
    if (
      (currentPlan === "basic" && (planType === "pro" || planType === "enterprise")) ||
      (currentPlan === "pro" && planType === "enterprise")
    ) {
      return "Upgrade Disponível";
    }
    
    return "";
  };

  return (
    <div className="space-y-10 gradient-plans p-4 md:p-10 rounded-xl">
      <h2 className="text-2xl md:text-3xl font-bold text-primary">Planos de Assinatura</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Plano Básico */}
        <Card 
          className={`p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg relative ${
            hoveredPlan === 'basic' ? 'transform scale-105' : ''
          } ${
            currentPlan === 'basic' ? 'border-2 border-primary' : 'border border-primary/20'
          }`}
          onMouseEnter={() => handleMouseEnter('basic')}
          onMouseLeave={handleMouseLeave}
        >
          {getRibbonLabel('basic') && (
            <div className={`absolute top-0 right-0 text-xs font-bold px-3 py-1 -mt-1 -mr-1 rounded-bl-md rounded-tr-md ${
              currentPlan === 'basic' ? 'bg-primary text-white' : 'bg-secondary text-primary'
            }`}>
              {getRibbonLabel('basic')}
            </div>
          )}
          
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
              className={`w-full ${
                currentPlan === 'basic'
                  ? 'bg-primary hover:bg-primary/90 text-white'
                  : 'bg-white hover:bg-white/90 text-primary border border-primary/20'
              }`}
              onClick={() => handleSubscribe('basic')}
              disabled={currentPlan === 'basic'}
            >
              {currentPlan === 'basic' ? 'Plano Atual' : 'Assinar Plano Básico'}
            </Button>
          </div>
        </Card>

        {/* Plano Pro */}
        <Card 
          className={`p-6 flex flex-col h-full relative transition-all duration-300 hover:shadow-2xl ${
            hoveredPlan === 'pro' ? 'transform scale-105' : ''
          } ${
            currentPlan === 'pro' 
              ? 'border-2 border-secondary bg-gradient-to-b from-primary to-primary/90 text-white shadow-xl' 
              : 'border-2 border-secondary bg-gradient-to-b from-primary/5 to-white text-gray-900'
          }`}
          onMouseEnter={() => handleMouseEnter('pro')}
          onMouseLeave={handleMouseLeave}
        >
          {getRibbonLabel('pro') && (
            <div className={`absolute top-0 right-0 text-xs font-bold px-3 py-1 -mt-1 -mr-1 rounded-bl-md rounded-tr-md ${
              currentPlan === 'pro' ? 'bg-secondary text-primary' : 'bg-secondary text-primary'
            }`}>
              {getRibbonLabel('pro')}
            </div>
          )}
          
          {currentPlan === 'basic' && (
            <div className="absolute -top-3 -right-3 bg-secondary text-primary text-xs font-bold p-1 rounded-full flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              Upgrade
            </div>
          )}
          
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-2 z-10 relative">
              <div className={`p-2 ${currentPlan === 'pro' ? 'bg-secondary/20' : 'bg-primary/10'} rounded-full`}>
                <Shield className={`w-6 h-6 ${currentPlan === 'pro' ? 'text-secondary' : 'text-primary'}`} />
              </div>
              <h3 className="text-xl font-semibold">Pro</h3>
            </div>
          </div>
          
          <div className="space-y-1 mt-6">
            <p className="text-4xl font-bold">R$ 59<span className={`text-sm font-normal ${currentPlan === 'pro' ? 'text-white/70' : 'text-gray-500'}`}>/mês</span></p>
            <p className={`text-sm ${currentPlan === 'pro' ? 'text-white/70' : 'text-gray-500'}`}>Para negócios em crescimento</p>
          </div>
          
          <ul className="space-y-3 mt-6 flex-grow">
            <li className="flex items-center gap-2">
              <Check className={`w-5 h-5 ${currentPlan === 'pro' ? 'text-secondary' : 'text-secondary'} flex-shrink-0`} />
              <span>Até 1000 usuários</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className={`w-5 h-5 ${currentPlan === 'pro' ? 'text-secondary' : 'text-secondary'} flex-shrink-0`} />
              <span>Relatórios avançados</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className={`w-5 h-5 ${currentPlan === 'pro' ? 'text-secondary' : 'text-secondary'} flex-shrink-0`} />
              <span>Suporte prioritário</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className={`w-5 h-5 ${currentPlan === 'pro' ? 'text-secondary' : 'text-secondary'} flex-shrink-0`} />
              <span>API access</span>
            </li>
          </ul>
          
          <div className="mt-6">
            <Button 
              className={`w-full ${
                currentPlan === 'pro'
                  ? 'bg-secondary hover:bg-secondary/90 text-primary'
                  : 'bg-secondary hover:bg-secondary/90 text-primary'
              }`}
              onClick={() => handleSubscribe('pro')}
              disabled={currentPlan === 'pro'}
            >
              {currentPlan === 'pro' 
                ? 'Plano Atual' 
                : currentPlan === 'basic' 
                  ? 'Fazer Upgrade' 
                  : 'Assinar Plano Pro'}
            </Button>
          </div>
        </Card>

        {/* Plano Enterprise */}
        <Card 
          className={`p-6 flex flex-col h-full relative transition-all duration-300 hover:shadow-lg ${
            hoveredPlan === 'enterprise' ? 'transform scale-105' : ''
          } ${
            currentPlan === 'enterprise' ? 'border-2 border-primary' : 'border border-primary/20'
          }`}
          onMouseEnter={() => handleMouseEnter('enterprise')}
          onMouseLeave={handleMouseLeave}
        >
          {getRibbonLabel('enterprise') && (
            <div className={`absolute top-0 right-0 text-xs font-bold px-3 py-1 -mt-1 -mr-1 rounded-bl-md rounded-tr-md ${
              currentPlan === 'enterprise' ? 'bg-primary text-white' : 'bg-secondary text-primary'
            }`}>
              {getRibbonLabel('enterprise')}
            </div>
          )}
          
          {(currentPlan === 'basic' || currentPlan === 'pro') && (
            <div className="absolute -top-3 -right-3 bg-secondary text-primary text-xs font-bold p-1 rounded-full flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              Upgrade
            </div>
          )}
          
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
              className={`w-full ${
                currentPlan === 'enterprise'
                  ? 'bg-primary hover:bg-primary/90 text-white'
                  : 'bg-white hover:bg-white/90 text-primary border border-primary/20'
              }`}
              onClick={() => handleSubscribe('enterprise')}
              disabled={currentPlan === 'enterprise'}
            >
              {currentPlan === 'enterprise' 
                ? 'Plano Atual' 
                : (currentPlan === 'basic' || currentPlan === 'pro')
                  ? 'Fazer Upgrade' 
                  : 'Assinar Plano Enterprise'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

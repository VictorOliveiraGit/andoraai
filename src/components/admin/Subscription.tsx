
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Shield, Zap, Check, ArrowUp, ArrowDown, Info, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type PlanType = 'basic' | 'pro' | 'enterprise';

export const Subscription = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<PlanType>('pro'); // Assuming 'pro' is the current plan
  
  const handleSubscribe = (planType: PlanType) => {
    if (planType === currentPlan) {
      toast.info("Você já está inscrito neste plano.");
      return;
    }

    if (planType === 'basic' && currentPlan !== 'basic') {
      toast.warning("Você está fazendo downgrade para um plano com menos recursos.");
    } else if (
      (planType === 'pro' && currentPlan === 'enterprise') || 
      (planType === 'basic' && currentPlan === 'pro')
    ) {
      toast.warning("Você está fazendo downgrade para um plano com menos recursos.");
    } else {
      toast.success("Upgrade de plano solicitado com sucesso!");
    }
    
    // In a real application, this would redirect to a payment page
    toast.info("Redirecionando para o checkout...");
  };

  const handleMouseEnter = (planType: string) => {
    setHoveredPlan(planType);
  };

  const handleMouseLeave = () => {
    setHoveredPlan(null);
  };

  const isDowngrade = (plan: PlanType): boolean => {
    if (currentPlan === 'enterprise') return plan === 'pro' || plan === 'basic';
    if (currentPlan === 'pro') return plan === 'basic';
    return false;
  };

  const isUpgrade = (plan: PlanType): boolean => {
    if (currentPlan === 'basic') return plan === 'pro' || plan === 'enterprise';
    if (currentPlan === 'pro') return plan === 'enterprise';
    return false;
  };

  const getResourceComparisonInfo = (plan: PlanType): { 
    title: string; 
    description: string; 
    changes: { label: string; before: string; after: string }[];
  } => {
    if (currentPlan === plan) {
      return {
        title: "Seu plano atual",
        description: "Você já está inscrito neste plano.",
        changes: []
      };
    }
    
    if (isUpgrade(plan)) {
      if (currentPlan === 'basic' && plan === 'pro') {
        return {
          title: "Upgrade para o plano Pro",
          description: "Aumente seu limite de usuários e obtenha recursos adicionais.",
          changes: [
            { label: "Usuários", before: "100", after: "1000" },
            { label: "Relatórios", before: "Básicos", after: "Avançados" },
            { label: "Suporte", before: "Email", after: "Prioritário" },
            { label: "API", before: "Não", after: "Sim" }
          ]
        };
      } else if (currentPlan === 'basic' && plan === 'enterprise') {
        return {
          title: "Upgrade para o plano Enterprise",
          description: "Máximo de recursos para grandes empresas.",
          changes: [
            { label: "Usuários", before: "100", after: "Ilimitados" },
            { label: "Relatórios", before: "Básicos", after: "Personalizados" },
            { label: "Suporte", before: "Email", after: "24/7" },
            { label: "API", before: "Não", after: "Dedicated" },
            { label: "Setup", before: "Não", after: "Personalizado" }
          ]
        };
      } else if (currentPlan === 'pro' && plan === 'enterprise') {
        return {
          title: "Upgrade para o plano Enterprise",
          description: "Máximo de recursos para grandes empresas.",
          changes: [
            { label: "Usuários", before: "1000", after: "Ilimitados" },
            { label: "Relatórios", before: "Avançados", after: "Personalizados" },
            { label: "Suporte", before: "Prioritário", after: "24/7" },
            { label: "API", before: "Sim", after: "Dedicated" },
            { label: "Setup", before: "Não", after: "Personalizado" }
          ]
        };
      }
    }
    
    if (isDowngrade(plan)) {
      if (currentPlan === 'enterprise' && plan === 'pro') {
        return {
          title: "Downgrade para o plano Pro",
          description: "Redução de alguns recursos. Revise com cuidado.",
          changes: [
            { label: "Usuários", before: "Ilimitados", after: "1000" },
            { label: "Relatórios", before: "Personalizados", after: "Avançados" },
            { label: "Suporte", before: "24/7", after: "Prioritário" },
            { label: "API", before: "Dedicated", after: "Sim" },
            { label: "Setup", before: "Personalizado", after: "Não" }
          ]
        };
      } else if (currentPlan === 'enterprise' && plan === 'basic') {
        return {
          title: "Downgrade para o plano Básico",
          description: "Redução significativa de recursos. Revise com cuidado.",
          changes: [
            { label: "Usuários", before: "Ilimitados", after: "100" },
            { label: "Relatórios", before: "Personalizados", after: "Básicos" },
            { label: "Suporte", before: "24/7", after: "Email" },
            { label: "API", before: "Dedicated", after: "Não" },
            { label: "Setup", before: "Personalizado", after: "Não" }
          ]
        };
      } else if (currentPlan === 'pro' && plan === 'basic') {
        return {
          title: "Downgrade para o plano Básico",
          description: "Redução de recursos. Revise com cuidado.",
          changes: [
            { label: "Usuários", before: "1000", after: "100" },
            { label: "Relatórios", before: "Avançados", after: "Básicos" },
            { label: "Suporte", before: "Prioritário", after: "Email" },
            { label: "API", before: "Sim", after: "Não" }
          ]
        };
      }
    }
    
    // Default fallback - should never reach here
    return {
      title: "Comparação de planos",
      description: "Revise as mudanças de recursos.",
      changes: []
    };
  };

  const PlanResourcesDialog = ({ plan }: { plan: PlanType }) => {
    const info = getResourceComparisonInfo(plan);
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-primary/70 hover:text-primary hover:bg-transparent underline"
          >
            <Info className="w-3 h-3 mr-1" />
            Ver comparação
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{info.title}</DialogTitle>
            <DialogDescription>{info.description}</DialogDescription>
          </DialogHeader>
          
          {info.changes.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Mudanças de recursos:</h4>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 text-sm font-medium bg-muted px-4 py-2">
                  <div>Recurso</div>
                  <div>Plano atual</div>
                  <div>Novo plano</div>
                </div>
                {info.changes.map((change, index) => (
                  <div 
                    key={index} 
                    className={`grid grid-cols-3 text-sm px-4 py-2 ${
                      index % 2 === 0 ? "bg-background" : "bg-muted/50"
                    }`}
                  >
                    <div>{change.label}</div>
                    <div>{change.before}</div>
                    <div className={isUpgrade(plan) ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                      {change.after}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-10 gradient-plans p-4 md:p-10 rounded-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">Planos de Assinatura</h2>
        
        <div className="bg-primary/10 p-2 rounded-lg text-sm">
          <div className="flex items-center gap-2">
            <BadgeCheck className="text-secondary w-5 h-5" />
            <span>
              Plano atual: <span className="font-semibold text-primary">{
                currentPlan === 'basic' ? 'Básico' : 
                currentPlan === 'pro' ? 'Pro' : 'Enterprise'
              }</span>
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Plano Básico */}
        <Card 
          className={`p-6 flex flex-col h-full border ${
            currentPlan === 'basic' 
              ? 'border-2 border-green-500 shadow-lg shadow-green-100' 
              : 'border-primary/20'
          } transition-all duration-300 hover:shadow-lg ${
            hoveredPlan === 'basic' ? 'transform scale-105' : ''
          }`}
          onMouseEnter={() => handleMouseEnter('basic')}
          onMouseLeave={handleMouseLeave}
        >
          {currentPlan === 'basic' && (
            <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Plano Atual
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
          
          {currentPlan !== 'basic' && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                {isUpgrade('basic') ? (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <ArrowUp className="w-3 h-3" />
                    <span>Upgrade</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <ArrowDown className="w-3 h-3" />
                    <span>Downgrade</span>
                  </div>
                )}
                
                <PlanResourcesDialog plan="basic" />
              </div>
            </div>
          )}
          
          <div className="mt-6">
            {currentPlan === 'basic' ? (
              <Button 
                className="w-full bg-green-100 hover:bg-green-100 text-green-700 cursor-default"
                disabled
              >
                <BadgeCheck className="mr-2 w-5 h-5" />
                Plano Atual
              </Button>
            ) : (
              <Button 
                className={`w-full ${
                  isDowngrade('basic') 
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : "bg-white hover:bg-white/90 text-primary border border-primary/20"
                }`}
                onClick={() => handleSubscribe('basic')}
              >
                {isDowngrade('basic') ? (
                  <>
                    <ArrowDown className="mr-2 w-5 h-5" />
                    Fazer Downgrade
                  </>
                ) : (
                  'Assinar Plano Básico'
                )}
              </Button>
            )}
          </div>
        </Card>

        {/* Plano Pro */}
        <Card 
          className={`p-6 flex flex-col h-full ${
            currentPlan === 'pro'
              ? 'border-2 border-green-500 bg-gradient-to-b from-primary to-primary/90 text-white shadow-xl'
              : 'border-2 border-secondary bg-gradient-to-b from-primary to-primary/90 text-white shadow-xl'
          } transition-all duration-300 hover:shadow-2xl ${
            hoveredPlan === 'pro' ? 'transform scale-105' : ''
          }`}
          onMouseEnter={() => handleMouseEnter('pro')}
          onMouseLeave={handleMouseLeave}
        >          
          {currentPlan === 'pro' && (
            <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Plano Atual
            </div>
          )}
          
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
          
          {currentPlan !== 'pro' && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                {isUpgrade('pro') ? (
                  <div className="flex items-center gap-1 text-xs text-secondary">
                    <ArrowUp className="w-3 h-3" />
                    <span>Upgrade</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-amber-200">
                    <ArrowDown className="w-3 h-3" />
                    <span>Downgrade</span>
                  </div>
                )}
                
                <PlanResourcesDialog plan="pro" />
              </div>
            </div>
          )}
          
          <div className="mt-6">
            {currentPlan === 'pro' ? (
              <Button 
                className="w-full bg-green-700 hover:bg-green-700 text-white cursor-default"
                disabled
              >
                <BadgeCheck className="mr-2 w-5 h-5" />
                Plano Atual
              </Button>
            ) : (
              <Button 
                className={`w-full ${
                  isDowngrade('pro')
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : "bg-secondary hover:bg-secondary/90 text-primary"
                }`}
                onClick={() => handleSubscribe('pro')}
              >
                {isDowngrade('pro') ? (
                  <>
                    <ArrowDown className="mr-2 w-5 h-5" />
                    Fazer Downgrade
                  </>
                ) : (
                  <>
                    <ArrowUp className="mr-2 w-5 h-5" />
                    Fazer Upgrade
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>

        {/* Plano Enterprise */}
        <Card 
          className={`p-6 flex flex-col h-full border ${
            currentPlan === 'enterprise' 
              ? 'border-2 border-green-500 shadow-lg shadow-green-100' 
              : 'border-primary/20'
          } transition-all duration-300 hover:shadow-lg ${
            hoveredPlan === 'enterprise' ? 'transform scale-105' : ''
          }`}
          onMouseEnter={() => handleMouseEnter('enterprise')}
          onMouseLeave={handleMouseLeave}
        >
          {currentPlan === 'enterprise' && (
            <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Plano Atual
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
          
          {currentPlan !== 'enterprise' && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <ArrowUp className="w-3 h-3" />
                  <span>Upgrade</span>
                </div>
                
                <PlanResourcesDialog plan="enterprise" />
              </div>
            </div>
          )}
          
          <div className="mt-6">
            {currentPlan === 'enterprise' ? (
              <Button 
                className="w-full bg-green-100 hover:bg-green-100 text-green-700 cursor-default"
                disabled
              >
                <BadgeCheck className="mr-2 w-5 h-5" />
                Plano Atual
              </Button>
            ) : (
              <Button 
                className="w-full bg-white hover:bg-white/90 text-primary border border-primary/20"
                onClick={() => handleSubscribe('enterprise')}
              >
                <ArrowUp className="mr-2 w-5 h-5" />
                Fazer Upgrade
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

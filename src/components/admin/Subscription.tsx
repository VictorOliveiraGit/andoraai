
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Shield, Zap, Check } from "lucide-react";
import { toast } from "sonner";

export const Subscription = () => {
  const handleSubscribe = (planType: string) => {
    toast.info("Redirecionando para o checkout...");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Planos de Assinatura</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Plano Básico */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold">Básico</h3>
          </div>
          <p className="text-3xl font-bold">R$ 29<span className="text-sm font-normal">/mês</span></p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Até 100 usuários</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Relatórios básicos</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Suporte por email</span>
            </li>
          </ul>
          <Button 
            className="w-full"
            onClick={() => handleSubscribe('basic')}
          >
            Assinar Plano Básico
          </Button>
        </Card>

        {/* Plano Pro */}
        <Card className="p-6 space-y-4 border-blue-500 shadow-lg">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold">Pro</h3>
          </div>
          <p className="text-3xl font-bold">R$ 59<span className="text-sm font-normal">/mês</span></p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Até 1000 usuários</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Relatórios avançados</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Suporte prioritário</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>API access</span>
            </li>
          </ul>
          <Button 
            className="w-full"
            variant="secondary"
            onClick={() => handleSubscribe('pro')}
          >
            Assinar Plano Pro
          </Button>
        </Card>

        {/* Plano Enterprise */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold">Enterprise</h3>
          </div>
          <p className="text-3xl font-bold">R$ 99<span className="text-sm font-normal">/mês</span></p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Usuários ilimitados</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Relatórios personalizados</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Suporte 24/7</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>API dedicated</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Setup personalizado</span>
            </li>
          </ul>
          <Button 
            className="w-full"
            onClick={() => handleSubscribe('enterprise')}
          >
            Assinar Plano Enterprise
          </Button>
        </Card>
      </div>
    </div>
  );
};

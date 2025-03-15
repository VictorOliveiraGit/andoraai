
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CreditCard, DollarSign, CalendarDays, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const SubscriptionsContent = () => {
  const [autoRenew, setAutoRenew] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [premiumFeatures, setPremiumFeatures] = useState(false);
  
  const subscriptionPlans = [
    {
      id: 1,
      name: "Plano Básico",
      price: 29.90,
      status: "active",
      nextBilling: "15/11/2023",
      features: ["5 usuários", "Armazenamento básico", "Suporte por email"]
    },
    {
      id: 2,
      name: "Plano Premium",
      price: 59.90,
      status: "pending",
      nextBilling: "23/11/2023",
      features: ["10 usuários", "Armazenamento premium", "Suporte prioritário", "Recursos avançados"]
    },
    {
      id: 3,
      name: "Plano Enterprise",
      price: 129.90,
      status: "canceled",
      nextBilling: "Cancelado",
      features: ["Usuários ilimitados", "Armazenamento ilimitado", "Suporte 24/7", "API completa"]
    }
  ];
  
  const handleSaveSettings = () => {
    toast.success("Configurações de assinatura salvas com sucesso!");
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" /> Ativa</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><Clock className="w-3 h-3 mr-1" /> Pendente</Badge>;
      case "canceled":
        return <Badge className="bg-red-500 hover:bg-red-600"><AlertCircle className="w-3 h-3 mr-1" /> Cancelada</Badge>;
      default:
        return <Badge>Indefinido</Badge>;
    }
  };

  return (
    <div className="space-y-6 bg-gray-50">
      <h2 className="text-2xl font-bold">Assinaturas</h2>
      <p className="text-gray-500">Gerencie suas assinaturas e configurações de pagamento.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assinaturas Ativas */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-medium">Suas Assinaturas</h3>
          
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <h4 className="font-medium">{plan.name}</h4>
                      {getStatusBadge(plan.status)}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <DollarSign className="w-4 h-4" />
                        <span>R$ {plan.price.toFixed(2)}/mês</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <CalendarDays className="w-4 h-4" />
                        <span>{plan.nextBilling}</span>
                      </div>
                    </div>
                    
                    <ul className="text-sm text-gray-500 space-y-1 mt-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col gap-2">
                    {plan.status === "active" && (
                      <Button variant="outline" size="sm" className="text-red-500 border-red-300 hover:bg-red-50">
                        Cancelar Plano
                      </Button>
                    )}
                    {plan.status === "canceled" && (
                      <Button variant="outline" size="sm" className="text-green-500 border-green-300 hover:bg-green-50">
                        Reativar Plano
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Configurações da Assinatura */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Configurações de Pagamento</h3>
          
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoRenew" className="font-medium">Renovação Automática</Label>
                  <Switch
                    id="autoRenew"
                    checked={autoRenew}
                    onCheckedChange={setAutoRenew}
                  />
                </div>
                <p className="text-sm text-gray-500">Renova automaticamente seu plano atual quando expirar</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications" className="font-medium">Notificações por Email</Label>
                  <Switch
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <p className="text-sm text-gray-500">Receba notificações sobre pagamentos e renovações</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="premiumFeatures" className="font-medium">Recursos Premium</Label>
                  <Switch
                    id="premiumFeatures"
                    checked={premiumFeatures}
                    onCheckedChange={setPremiumFeatures}
                  />
                </div>
                <p className="text-sm text-gray-500">Habilitar recursos premium adicionais</p>
              </div>
              
              <div className="pt-2 space-y-2">
                <Label htmlFor="paymentMethod" className="font-medium">Método de Pagamento</Label>
                <select 
                  id="paymentMethod" 
                  className="w-full p-2 border rounded-md bg-white"
                >
                  <option value="creditCard">Cartão de Crédito</option>
                  <option value="debitCard">Cartão de Débito</option>
                  <option value="bankTransfer">Transferência Bancária</option>
                  <option value="pix">PIX</option>
                </select>
              </div>
              
              <Button onClick={handleSaveSettings} className="w-full mt-2">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6 space-y-4">
              <h4 className="font-medium">Histórico de Pagamentos</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-sm">
                    <p className="font-medium">Outubro 2023</p>
                    <p className="text-gray-500">Plano Básico</p>
                  </div>
                  <span className="font-medium">R$ 29,90</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="text-sm">
                    <p className="font-medium">Setembro 2023</p>
                    <p className="text-gray-500">Plano Básico</p>
                  </div>
                  <span className="font-medium">R$ 29,90</span>
                </div>
                
                <div className="flex justify-between items-center pb-2">
                  <div className="text-sm">
                    <p className="font-medium">Agosto 2023</p>
                    <p className="text-gray-500">Plano Básico</p>
                  </div>
                  <span className="font-medium">R$ 29,90</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                Ver Histórico Completo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsContent;

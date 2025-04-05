
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  CreditCard, 
  DollarSign, 
  CalendarDays, 
  Check, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  CreditCardIcon 
} from "lucide-react";

type PlanType = 'basic' | 'pro' | 'enterprise';

interface PaymentHistoryItem {
  id: string;
  date: string;
  amount: number;
  planName: string;
  status: 'successful' | 'pending' | 'failed';
}

interface SubscriptionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    type: PlanType;
    name: string;
    price: number;
    status: 'active' | 'pending' | 'suspended' | 'canceled';
    startDate?: string;
    nextBillingDate?: string;
    features: string[];
  };
}

const SubscriptionDetailsModal = ({ isOpen, onClose, plan }: SubscriptionDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [autoRenew, setAutoRenew] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [paymentMethodDialog, setPaymentMethodDialog] = useState(false);

  // Mock payment history data
  const paymentHistory: PaymentHistoryItem[] = [
    {
      id: "pay_123456",
      date: "2023-12-15",
      amount: plan.price,
      planName: plan.name,
      status: 'successful'
    },
    {
      id: "pay_123455",
      date: "2023-11-15",
      amount: plan.price,
      planName: plan.name,
      status: 'successful'
    },
    {
      id: "pay_123454",
      date: "2023-10-15",
      amount: plan.price,
      planName: plan.name,
      status: 'successful'
    },
    {
      id: "pay_123453",
      date: "2023-09-15",
      amount: plan.price,
      planName: plan.name,
      status: 'successful'
    },
    {
      id: "pay_123452",
      date: "2023-08-15",
      amount: plan.price,
      planName: plan.name,
      status: 'successful'
    }
  ];

  const handleSaveSettings = () => {
    toast.success("Configurações de pagamento salvas com sucesso!");
  };

  const openPaymentMethodDialog = () => {
    setPaymentMethodDialog(true);
  };

  const savePaymentMethod = () => {
    toast.success("Método de pagamento atualizado com sucesso!");
    setPaymentMethodDialog(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "successful":
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" /> Concluído</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><Clock className="w-3 h-3 mr-1" /> Pendente</Badge>;
      case "failed":
        return <Badge className="bg-red-500 hover:bg-red-600"><X className="w-3 h-3 mr-1" /> Falhou</Badge>;
      default:
        return <Badge>Indefinido</Badge>;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto w-[95vw] p-4 md:p-6">
          <DialogHeader>
            <DialogTitle>Detalhes da Assinatura - {plan.name}</DialogTitle>
            <DialogDescription>
              Visualize detalhes, histórico de pagamentos e configurações da sua assinatura.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
            <TabsList className="w-full flex flex-nowrap overflow-x-auto mb-4">
              <TabsTrigger value="details" className="flex-shrink-0">Detalhes</TabsTrigger>
              <TabsTrigger value="history" className="flex-shrink-0">Histórico</TabsTrigger>
              <TabsTrigger value="payment" className="flex-shrink-0">Configurações</TabsTrigger>
            </TabsList>
            
            {/* Detalhes da Assinatura */}
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={
                          plan.status === "active" ? "default" : 
                          plan.status === "pending" ? "secondary" : "destructive"
                        }
                        className={plan.status === "active" ? "bg-green-500 hover:bg-green-600" : plan.status === "pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                      >
                        {plan.status === "active" ? "Ativo" : 
                         plan.status === "pending" ? "Pendente" : 
                         plan.status === "suspended" ? "Suspenso" : "Cancelado"}
                      </Badge>
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Preço:</span>
                        <span className="font-medium">R$ {plan.price.toFixed(2)}/mês</span>
                      </div>
                      
                      {plan.startDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Data de início:</span>
                          <span>{new Date(plan.startDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                      
                      {plan.nextBillingDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Próxima cobrança:</span>
                          <span>{new Date(plan.nextBillingDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Recursos Incluídos</h3>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                <Button variant="outline" onClick={() => setActiveTab("history")} className="w-full sm:w-auto">
                  Ver Histórico <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button onClick={() => setActiveTab("payment")} className="w-full sm:w-auto">
                  Configurações de Pagamento <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            {/* Histórico de Pagamentos */}
            <TabsContent value="history" className="space-y-4 pt-4">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-semibold mb-4">Histórico Completo de Pagamentos</h3>
                  
                  <div className="relative overflow-x-auto">
                    <div className="md:hidden">
                      {/* Mobile view - card-based list */}
                      <div className="space-y-4">
                        {paymentHistory.map((payment) => (
                          <div key={payment.id} className="bg-white border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{payment.id}</span>
                              {getStatusBadge(payment.status)}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-gray-500">Data:</p>
                                <p>{new Date(payment.date).toLocaleDateString('pt-BR')}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Plano:</p>
                                <p>{payment.planName}</p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-gray-500">Valor:</p>
                                <p className="font-medium">R$ {payment.amount.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <table className="w-full text-sm text-left hidden md:table">
                      <thead className="text-xs uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-3">ID</th>
                          <th className="px-4 py-3">Data</th>
                          <th className="px-4 py-3">Plano</th>
                          <th className="px-4 py-3">Valor</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory.map((payment) => (
                          <tr key={payment.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">
                              {payment.id}
                            </td>
                            <td className="px-4 py-3">
                              {new Date(payment.date).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-4 py-3">
                              {payment.planName}
                            </td>
                            <td className="px-4 py-3">
                              R$ {payment.amount.toFixed(2)}
                            </td>
                            <td className="px-4 py-3">
                              {getStatusBadge(payment.status)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <span className="font-medium">Total pago:</span>
                    <span className="font-bold">
                      R$ {paymentHistory.reduce((total, payment) => 
                        payment.status === 'successful' ? total + payment.amount : total, 0
                      ).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                <Button variant="outline" onClick={() => setActiveTab("details")} className="w-full sm:w-auto">
                  Voltar para Detalhes
                </Button>
                <Button onClick={() => setActiveTab("payment")} className="w-full sm:w-auto">
                  Configurações de Pagamento <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            {/* Configurações de Pagamento */}
            <TabsContent value="payment" className="space-y-4 pt-4">
              <Card>
                <CardContent className="p-4 md:p-6 space-y-4">
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
                  
                  <div className="pt-2 space-y-2">
                    <Label htmlFor="paymentMethod" className="font-medium">Método de Pagamento</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select 
                        id="paymentMethod" 
                        className="w-full p-2 border rounded-md bg-white"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <option value="creditCard">Cartão de Crédito</option>
                        <option value="debitCard">Cartão de Débito</option>
                        <option value="bankTransfer">Transferência Bancária</option>
                        <option value="pix">PIX</option>
                      </select>
                      <Button variant="outline" onClick={openPaymentMethodDialog} className="sm:w-auto">
                        Editar
                      </Button>
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveSettings} className="w-full mt-2">
                    Salvar Configurações
                  </Button>
                </CardContent>
              </Card>
              
              <div className="flex justify-start pt-2">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Voltar para Detalhes
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Payment Method Dialog */}
      <Dialog open={paymentMethodDialog} onOpenChange={setPaymentMethodDialog}>
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle>Atualizar Método de Pagamento</DialogTitle>
            <DialogDescription>
              Escolha um método de pagamento para suas assinaturas.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número do Cartão</Label>
              <div className="flex items-center">
                <CreditCardIcon className="w-4 h-4 mr-2 text-gray-500" />
                <Input 
                  id="cardNumber" 
                  placeholder="0000 0000 0000 0000" 
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Validade</Label>
                <Input id="expiry" placeholder="MM/AA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardHolder">Nome no Cartão</Label>
              <Input id="cardHolder" placeholder="Nome completo" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button variant="outline" onClick={() => setPaymentMethodDialog(false)} className="w-full sm:w-auto">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={savePaymentMethod} className="w-full sm:w-auto">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionDetailsModal;

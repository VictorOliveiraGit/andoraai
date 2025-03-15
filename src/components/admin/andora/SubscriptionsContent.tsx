
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, CreditCard, CheckCircle, AlertCircle, Check, Edit2, XCircle, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

// Mock data for all subscribed users
const subscribedUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
    planName: "Pro",
    price: 59.00,
    billingCycle: "monthly",
    startDate: "2023-12-15",
    nextBillingDate: "2024-02-15",
    status: "active",
    paymentMethod: "credit_card",
    cardInfo: "**** **** **** 5678",
    features: [
      "Até 1000 usuários",
      "Relatórios avançados",
      "Suporte prioritário",
      "API access"
    ]
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria.souza@exemplo.com",
    phone: "(11) 97654-3210",
    planName: "Basic",
    price: 29.00,
    billingCycle: "monthly",
    startDate: "2023-12-18",
    nextBillingDate: "2024-02-18",
    status: "active",
    paymentMethod: "credit_card",
    cardInfo: "**** **** **** 1234",
    features: [
      "Até 100 usuários",
      "Relatórios básicos",
      "Suporte por email"
    ]
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedro.santos@exemplo.com",
    phone: "(11) 96543-2109",
    planName: "Enterprise",
    price: 99.00,
    billingCycle: "annual",
    startDate: "2023-12-20",
    nextBillingDate: "2024-12-20",
    status: "active",
    paymentMethod: "bank_transfer",
    cardInfo: null,
    features: [
      "Usuários ilimitados",
      "Relatórios personalizados",
      "Suporte 24/7",
      "API dedicated",
      "Setup personalizado"
    ]
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana.oliveira@exemplo.com",
    phone: "(11) 95432-1098",
    planName: "Pro",
    price: 59.00,
    billingCycle: "monthly",
    startDate: "2023-12-22",
    nextBillingDate: "2024-02-22",
    status: "overdue",
    paymentMethod: "credit_card",
    cardInfo: "**** **** **** 9876",
    features: [
      "Até 1000 usuários",
      "Relatórios avançados",
      "Suporte prioritário",
      "API access"
    ]
  },
  {
    id: 5,
    name: "Carlos Pereira",
    email: "carlos.pereira@exemplo.com",
    phone: "(11) 94321-0987",
    planName: "Basic",
    price: 29.00,
    billingCycle: "annual",
    startDate: "2023-12-25",
    nextBillingDate: "2024-12-25",
    status: "suspended",
    paymentMethod: "credit_card",
    cardInfo: "**** **** **** 4321",
    features: [
      "Até 100 usuários",
      "Relatórios básicos",
      "Suporte por email"
    ]
  },
  {
    id: 6,
    name: "Fernanda Lima",
    email: "fernanda.lima@exemplo.com",
    phone: "(11) 93210-9876",
    planName: "Enterprise",
    price: 99.00,
    billingCycle: "monthly",
    startDate: "2024-01-05",
    nextBillingDate: "2024-02-05",
    status: "active",
    paymentMethod: "pix",
    cardInfo: null,
    features: [
      "Usuários ilimitados",
      "Relatórios personalizados",
      "Suporte 24/7",
      "API dedicated",
      "Setup personalizado"
    ]
  },
  {
    id: 7,
    name: "Roberto Costa",
    email: "roberto.costa@exemplo.com",
    phone: "(11) 92109-8765",
    planName: "Pro",
    price: 59.00,
    billingCycle: "annual",
    startDate: "2024-01-10",
    nextBillingDate: "2025-01-10",
    status: "active",
    paymentMethod: "credit_card",
    cardInfo: "**** **** **** 6543",
    features: [
      "Até 1000 usuários",
      "Relatórios avançados",
      "Suporte prioritário",
      "API access"
    ]
  }
];

const SubscriptionsContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Filter subscriptions
  const filteredSubscriptions = subscribedUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesPlan = 
      selectedPlan === "all" || 
      user.planName.toLowerCase() === selectedPlan.toLowerCase();
      
    const matchesStatus = 
      selectedStatus === "all" || 
      user.status === selectedStatus;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });
  
  // Get unique plans
  const uniquePlans = [...new Set(subscribedUsers.map(user => user.planName))];
  
  // Calculate summary statistics
  const totalUsers = subscribedUsers.length;
  const activeUsers = subscribedUsers.filter(user => user.status === "active").length;
  const totalMRR = subscribedUsers
    .filter(user => user.status === "active")
    .reduce((total, user) => {
      if (user.billingCycle === "monthly") {
        return total + user.price;
      } else {
        // For annual, divide by 12 to get monthly equivalent
        return total + (user.price / 12);
      }
    }, 0);
    
  // Handle contact user
  const handleContactUser = (type, contact) => {
    if (type === "email") {
      window.open(`mailto:${contact}`);
    } else if (type === "phone") {
      window.open(`tel:${contact}`);
    }
  };
  
  // Handle subscription actions
  const handleSubscriptionAction = (action, userId, userName) => {
    switch(action) {
      case "cancel":
        toast.success(`Assinatura de ${userName} cancelada com sucesso!`);
        break;
      case "suspend":
        toast.success(`Assinatura de ${userName} suspensa com sucesso!`);
        break;
      case "reactivate":
        toast.success(`Assinatura de ${userName} reativada com sucesso!`);
        break;
      case "upgrade":
        toast.success(`Solicitação de upgrade para ${userName} enviada com sucesso!`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assinaturas</h2>
      <p className="text-gray-500">Gerenciamento de assinaturas e planos dos usuários.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Assinantes</p>
                <h3 className="text-3xl font-bold">{totalUsers}</h3>
              </div>
              <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assinantes Ativos</p>
                <h3 className="text-3xl font-bold">{activeUsers}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((activeUsers / totalUsers) * 100)}% do total
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 flex items-center justify-center rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Receita Mensal (MRR)</p>
                <h3 className="text-3xl font-bold">R$ {totalMRR.toFixed(2)}</h3>
                <p className="text-xs text-green-600 mt-1">
                  +12% em relação ao mês anterior
                </p>
              </div>
              <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Assinantes Detalhados</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar assinante..."
                  className="pl-9 pr-4 py-2 border rounded-md w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border rounded-md px-3 py-2"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                <option value="all">Todos os Planos</option>
                {uniquePlans.map((plan, index) => (
                  <option key={index} value={plan.toLowerCase()}>{plan}</option>
                ))}
              </select>
              <select
                className="border rounded-md px-3 py-2"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">Todos os Status</option>
                <option value="active">Ativo</option>
                <option value="overdue">Em atraso</option>
                <option value="suspended">Suspenso</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Usuário</th>
                  <th className="px-6 py-3">Plano</th>
                  <th className="px-6 py-3">Cobrança</th>
                  <th className="px-6 py-3">Próximo Pagamento</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Método</th>
                  <th className="px-6 py-3">Contato</th>
                  <th className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((user) => (
                  <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        user.planName === "Basic" ? "outline" : 
                        user.planName === "Pro" ? "secondary" : "default"
                      }>
                        {user.planName}
                      </Badge>
                      <div className="mt-1">
                        <p className="text-xs">R$ {user.price.toFixed(2)}/{user.billingCycle === "monthly" ? "mês" : "ano"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">
                        {user.billingCycle === "monthly" ? "Mensal" : "Anual"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.nextBillingDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant={
                          user.status === "active" ? "success" : 
                          user.status === "overdue" ? "warning" : "destructive"
                        }
                      >
                        {user.status === "active" ? "Ativo" : 
                         user.status === "overdue" ? "Em atraso" : "Suspenso"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {user.paymentMethod === "credit_card" ? "Cartão" : 
                           user.paymentMethod === "bank_transfer" ? "Transferência" : "PIX"}
                        </span>
                      </div>
                      {user.cardInfo && (
                        <p className="text-xs text-gray-500 mt-1">{user.cardInfo}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleContactUser("email", user.email)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleContactUser("phone", user.phone)}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {user.status === "active" ? (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => handleSubscriptionAction("upgrade", user.id, user.name)}
                            >
                              <Edit2 className="h-3 w-3 mr-1" />
                              Alterar
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => handleSubscriptionAction("suspend", user.id, user.name)}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Suspender
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="success" 
                            size="sm"
                            className="h-8 text-xs bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleSubscriptionAction("reactivate", user.id, user.name)}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Reativar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredSubscriptions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum assinante encontrado com os critérios de busca.</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Mostrando <span className="font-medium">{filteredSubscriptions.length}</span> de <span className="font-medium">{subscribedUsers.length}</span> assinantes
              </div>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">Próximo</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionsContent;

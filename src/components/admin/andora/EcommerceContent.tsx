
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpRight, ExternalLink, Mail, Phone, Check, X } from "lucide-react";
import { toast } from "sonner";

// Mock data for plan sales
const planSalesData = [
  { 
    id: 1,
    customerName: "João Silva",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
    plan: "Pro",
    price: 59.00,
    date: "2023-12-15",
    status: "paid",
    activationLink: "https://andora.app/activate/jsilva123"
  },
  { 
    id: 2,
    customerName: "Maria Souza",
    email: "maria.souza@exemplo.com",
    phone: "(11) 97654-3210",
    plan: "Basic",
    price: 29.00,
    date: "2023-12-18",
    status: "paid",
    activationLink: "https://andora.app/activate/msouza456"
  },
  { 
    id: 3,
    customerName: "Pedro Santos",
    email: "pedro.santos@exemplo.com",
    phone: "(11) 96543-2109",
    plan: "Enterprise",
    price: 99.00,
    date: "2023-12-20",
    status: "pending",
    activationLink: "https://andora.app/activate/psantos789"
  },
  { 
    id: 4,
    customerName: "Ana Oliveira",
    email: "ana.oliveira@exemplo.com",
    phone: "(11) 95432-1098",
    plan: "Pro",
    price: 59.00,
    date: "2023-12-22",
    status: "paid",
    activationLink: "https://andora.app/activate/aoliveira101"
  },
  { 
    id: 5,
    customerName: "Carlos Pereira",
    email: "carlos.pereira@exemplo.com",
    phone: "(11) 94321-0987",
    plan: "Enterprise",
    price: 99.00,
    date: "2023-12-25",
    status: "failed",
    activationLink: "https://andora.app/activate/cpereira202"
  }
];

// Mock data for subscriptions
const subscriptionsData = [
  {
    id: 1,
    customerName: "João Silva",
    email: "joao.silva@exemplo.com",
    plan: "Pro",
    startDate: "2023-12-15",
    nextBillingDate: "2024-01-15",
    status: "active",
    planDetails: {
      name: "Pro",
      price: 59.00,
      features: [
        "Até 1000 usuários",
        "Relatórios avançados",
        "Suporte prioritário",
        "API access"
      ]
    }
  },
  {
    id: 2,
    customerName: "Maria Souza",
    email: "maria.souza@exemplo.com",
    plan: "Basic",
    startDate: "2023-12-18",
    nextBillingDate: "2024-01-18",
    status: "active",
    planDetails: {
      name: "Basic",
      price: 29.00,
      features: [
        "Até 100 usuários",
        "Relatórios básicos",
        "Suporte por email"
      ]
    }
  },
  {
    id: 4,
    customerName: "Ana Oliveira",
    email: "ana.oliveira@exemplo.com",
    plan: "Pro",
    startDate: "2023-12-22",
    nextBillingDate: "2024-01-22",
    status: "active",
    planDetails: {
      name: "Pro",
      price: 59.00,
      features: [
        "Até 1000 usuários",
        "Relatórios avançados",
        "Suporte prioritário",
        "API access"
      ]
    }
  },
  {
    id: 5,
    customerName: "Carlos Pereira",
    email: "carlos.pereira@exemplo.com",
    plan: "Enterprise",
    startDate: "2023-12-25",
    nextBillingDate: "2024-01-25",
    status: "suspended",
    planDetails: {
      name: "Enterprise",
      price: 99.00,
      features: [
        "Usuários ilimitados",
        "Relatórios personalizados",
        "Suporte 24/7",
        "API dedicated",
        "Setup personalizado"
      ]
    }
  }
];

const EcommerceContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState("all");
  
  // Filter plan sales
  const filteredSales = planSalesData.filter(sale => {
    const matchesSearch = 
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === "all" || 
      sale.status === selectedStatus;
      
    const matchesPlan = 
      selectedPlan === "all" || 
      sale.plan.toLowerCase() === selectedPlan.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPlan;
  });
  
  // Filter subscriptions
  const filteredSubscriptions = subscriptionsData.filter(subscription => {
    const matchesSearch = 
      subscription.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === "all" || 
      subscription.status === selectedStatus;
      
    const matchesPlan = 
      selectedPlan === "all" || 
      subscription.plan.toLowerCase() === selectedPlan.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPlan;
  });
  
  // Handle sending activation link
  const handleSendActivationLink = (email, link) => {
    // In a real app, this would call an API to send the email
    toast.success(`Link de ativação enviado para ${email}`);
  };
  
  // Handle contact customer
  const handleContactCustomer = (type, contact) => {
    if (type === "email") {
      window.open(`mailto:${contact}`);
    } else if (type === "phone") {
      window.open(`tel:${contact}`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Vendas e Assinaturas</h2>
      <p className="text-gray-500">Gerencie vendas de planos e assinaturas ativas.</p>
      
      <Tabs defaultValue="sales" className="w-full">
        <TabsList>
          <TabsTrigger value="sales">Vendas de Planos</TabsTrigger>
          <TabsTrigger value="subscriptions">Assinaturas Ativas</TabsTrigger>
        </TabsList>
        
        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <CardTitle>Vendas de Planos</CardTitle>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Buscar cliente..."
                      className="pl-9 pr-4 py-2 border rounded-md w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="border rounded-md px-3 py-2"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">Todos os Status</option>
                    <option value="paid">Pago</option>
                    <option value="pending">Pendente</option>
                    <option value="failed">Falhou</option>
                  </select>
                  <select
                    className="border rounded-md px-3 py-2"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                  >
                    <option value="all">Todos os Planos</option>
                    <option value="basic">Basic</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Cliente</th>
                      <th className="px-6 py-3">Plano</th>
                      <th className="px-6 py-3">Valor</th>
                      <th className="px-6 py-3">Data</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Contato</th>
                      <th className="px-6 py-3">Ativação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.map((sale) => (
                      <tr key={sale.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{sale.customerName}</p>
                            <p className="text-xs text-gray-500">{sale.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={
                            sale.plan === "Basic" ? "outline" : 
                            sale.plan === "Pro" ? "secondary" : "default"
                          }>
                            {sale.plan}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">R$ {sale.price.toFixed(2)}</td>
                        <td className="px-6 py-4">{new Date(sale.date).toLocaleDateString('pt-BR')}</td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant={
                              sale.status === "paid" ? "success" : 
                              sale.status === "pending" ? "warning" : "destructive"
                            }
                          >
                            {sale.status === "paid" ? "Pago" : 
                             sale.status === "pending" ? "Pendente" : "Falhou"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleContactCustomer("email", sale.email)}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleContactCustomer("phone", sale.phone)}
                            >
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => handleSendActivationLink(sale.email, sale.activationLink)}
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Enviar Link
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => window.open(sale.activationLink, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredSales.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhuma venda encontrada com os critérios de busca.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-center">
                    <ArrowUpRight className="h-5 w-5 mr-2 text-green-600" />
                    <p className="text-sm font-medium">Total de Vendas</p>
                  </div>
                  <p className="text-2xl font-bold mt-1">R$ {planSalesData.reduce((total, sale) => total + sale.price, 0).toFixed(2)}</p>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm font-medium">Plano Mais Vendido</p>
                  <p className="text-2xl font-bold mt-1">Pro</p>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm font-medium">Taxa de Conversão</p>
                  <p className="text-2xl font-bold mt-1">68%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <CardTitle>Assinaturas Ativas</CardTitle>
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
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">Todos os Status</option>
                    <option value="active">Ativo</option>
                    <option value="suspended">Suspenso</option>
                    <option value="canceled">Cancelado</option>
                  </select>
                  <select
                    className="border rounded-md px-3 py-2"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                  >
                    <option value="all">Todos os Planos</option>
                    <option value="basic">Basic</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSubscriptions.map((subscription) => (
                  <Card key={subscription.id} className="border-2 overflow-hidden">
                    <div className={`h-2 w-full ${
                      subscription.status === "active" ? "bg-green-500" :
                      subscription.status === "suspended" ? "bg-amber-500" : "bg-red-500"
                    }`}></div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{subscription.customerName}</h3>
                          <p className="text-sm text-gray-500">{subscription.email}</p>
                        </div>
                        <Badge 
                          variant={
                            subscription.status === "active" ? "success" : 
                            subscription.status === "suspended" ? "warning" : "destructive"
                          }
                        >
                          {subscription.status === "active" ? "Ativo" : 
                           subscription.status === "suspended" ? "Suspenso" : "Cancelado"}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Plano:</span>
                          <Badge variant={
                            subscription.plan === "Basic" ? "outline" : 
                            subscription.plan === "Pro" ? "secondary" : "default"
                          }>
                            {subscription.plan}
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm font-medium">Valor Mensal:</span>
                          <span>R$ {subscription.planDetails.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm font-medium">Data de Início:</span>
                          <span>{new Date(subscription.startDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm font-medium">Próxima Cobrança:</span>
                          <span>{new Date(subscription.nextBillingDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-medium mb-2">Detalhes do Plano:</p>
                        <ul className="space-y-1">
                          {subscription.planDetails.features.map((feature, index) => (
                            <li key={index} className="text-xs flex items-center">
                              <Check className="h-3 w-3 text-green-600 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleContactCustomer("email", subscription.email)}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Contato
                        </Button>
                        <Button 
                          size="sm" 
                          variant={subscription.status === "active" ? "destructive" : "default"}
                          className="flex-1"
                          onClick={() => {
                            if (subscription.status === "active") {
                              toast.success("Assinatura suspensa com sucesso!");
                            } else {
                              toast.success("Assinatura reativada com sucesso!");
                            }
                          }}
                        >
                          {subscription.status === "active" ? (
                            <>
                              <X className="h-3 w-3 mr-1" />
                              Suspender
                            </>
                          ) : (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Reativar
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredSubscriptions.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">Nenhuma assinatura encontrada com os critérios de busca.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Assinaturas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm font-medium">Total de Assinantes</p>
                  <p className="text-2xl font-bold mt-1">{subscriptionsData.length}</p>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm font-medium">Receita Recorrente</p>
                  <p className="text-2xl font-bold mt-1">R$ {subscriptionsData.reduce((total, sub) => total + sub.planDetails.price, 0).toFixed(2)}/mês</p>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm font-medium">Taxa de Retenção</p>
                  <p className="text-2xl font-bold mt-1">92%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EcommerceContent;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  ArrowUpRight, 
  Edit, 
  Search, 
  Trash,
  User, 
  Users,
  Plus
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Customer data for the customer management section
const customersData = [
  { id: 1, nome: "João Silva", email: "joao.silva@example.com", telefone: "(11) 98765-4321", ultimaCompra: "10/06/2023", totalGasto: 4750.00, status: "Ativo", plano: "Premium" },
  { id: 2, nome: "Maria Oliveira", email: "maria@example.com", telefone: "(21) 98765-4321", ultimaCompra: "05/06/2023", totalGasto: 3500.00, status: "Ativo", plano: "Básico" },
  { id: 3, nome: "Pedro Santos", email: "pedro@example.com", telefone: "(31) 98765-4321", ultimaCompra: "01/06/2023", totalGasto: 1250.00, status: "Inativo", plano: "Básico" },
  { id: 4, nome: "Ana Costa", email: "ana@example.com", telefone: "(41) 98765-4321", ultimaCompra: "20/05/2023", totalGasto: 950.00, status: "Ativo", plano: "Premium" },
  { id: 5, nome: "Carlos Ferreira", email: "carlos@example.com", telefone: "(51) 98765-4321", ultimaCompra: "15/05/2023", totalGasto: 2200.00, status: "Ativo", plano: "Pro" },
  { id: 6, nome: "Mariana Lima", email: "mariana@example.com", telefone: "(61) 98765-4321", ultimaCompra: "10/05/2023", totalGasto: 1800.00, status: "Inativo", plano: "Básico" },
];

interface CustomersContentProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedPlan: string;
  setSelectedPlan: (value: string) => void;
  minValue: number;
  setMinValue: (value: number) => void;
  maxValue: number;
  setMaxValue: (value: number) => void;
  showDeleteConfirm: number | null;
  setShowDeleteConfirm: (value: number | null) => void;
}

const CustomersContent = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedPlan,
  setSelectedPlan,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  showDeleteConfirm,
  setShowDeleteConfirm,
}: CustomersContentProps) => {
  
  // Filtra os dados com base nos critérios
  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = 
      customer.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.telefone.includes(searchTerm) ||
      customer.plano.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === "todos" || 
      customer.status.toLowerCase() === selectedStatus.toLowerCase();
    
    const matchesPlan =
      selectedPlan === "todos" ||
      customer.plano.toLowerCase() === selectedPlan.toLowerCase();
    
    const matchesValue =
      customer.totalGasto >= minValue && 
      customer.totalGasto <= maxValue;
    
    return matchesSearch && matchesStatus && matchesPlan && matchesValue;
  });

  const handleDeleteCustomer = (id: number) => {
    // In a real application, this would call an API to delete the customer
    toast.success(`Cliente #${id} excluído com sucesso!`);
    setShowDeleteConfirm(null);
  };

  const handleEditCustomer = (id: number) => {
    // In a real application, this would navigate to an edit form or open a modal
    toast.info(`Editando cliente #${id}`);
  };

  const plansCount = {
    "Basic": customersData.filter(c => c.plano === "Básico").length,
    "Pro": customersData.filter(c => c.plano === "Pro").length,
    "Premium": customersData.filter(c => c.plano === "Premium").length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2 h-6 w-6" />
          Gerenciamento de Clientes
        </h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-primary/20 p-2 rounded-full">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
              <h3 className="text-2xl font-bold">{customersData.length}</h3>
              <div className="flex items-center mt-1 text-xs">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+2 esta semana</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-green-100 p-2 rounded-full">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Clientes Ativos</p>
              <h3 className="text-2xl font-bold">
                {customersData.filter(c => c.status === "Ativo").length}
              </h3>
              <p className="text-xs text-muted-foreground">
                {Math.round(customersData.filter(c => c.status === "Ativo").length / customersData.length * 100)}% do total
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-yellow-100 p-2 rounded-full">
              <User className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tempo Médio</p>
              <h3 className="text-2xl font-bold">45 dias</h3>
              <p className="text-xs text-muted-foreground">Entre compras</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Valor Médio</p>
              <h3 className="text-2xl font-bold">R$ 2.408</h3>
              <p className="text-xs text-muted-foreground">Por cliente</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-blue-700">Plano Básico</p>
              <h3 className="text-xl font-bold text-blue-800">{plansCount.Basic} clientes</h3>
            </div>
            <div className="bg-blue-200 p-2 rounded-full">
              <User className="h-6 w-6 text-blue-700" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-purple-700">Plano Pro</p>
              <h3 className="text-xl font-bold text-purple-800">{plansCount.Pro} clientes</h3>
            </div>
            <div className="bg-purple-200 p-2 rounded-full">
              <User className="h-6 w-6 text-purple-700" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-amber-700">Plano Premium</p>
              <h3 className="text-xl font-bold text-amber-800">{plansCount.Premium} clientes</h3>
            </div>
            <div className="bg-amber-200 p-2 rounded-full">
              <User className="h-6 w-6 text-amber-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar clientes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedPlan} onValueChange={setSelectedPlan}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Plano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Planos</SelectItem>
            <SelectItem value="básico">Básico</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customers table */}
      <div className="border rounded-lg">
        <div className="bg-muted/50 grid grid-cols-12 p-4 text-sm font-medium">
          <div className="col-span-4">Nome / Email</div>
          <div className="col-span-2">Telefone</div>
          <div className="col-span-2">Última Compra</div>
          <div className="col-span-1">Total</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Plano</div>
          <div className="col-span-1">Ações</div>
        </div>
        
        <div className="divide-y">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <div 
                key={customer.id} 
                className="grid grid-cols-12 p-4 items-center hover:bg-muted/30 transition-colors"
              >
                <div className="col-span-4">
                  <p className="font-medium">{customer.nome}</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
                <div className="col-span-2 text-sm">{customer.telefone}</div>
                <div className="col-span-2 text-sm">{customer.ultimaCompra}</div>
                <div className="col-span-1 text-sm">
                  R$ {customer.totalGasto.toLocaleString('pt-BR')}
                </div>
                <div className="col-span-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    customer.status === "Ativo" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {customer.status}
                  </span>
                </div>
                <div className="col-span-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    customer.plano === "Premium" 
                      ? "bg-amber-100 text-amber-800" 
                      : customer.plano === "Pro"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                  }`}>
                    {customer.plano}
                  </span>
                </div>
                <div className="col-span-1 flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditCustomer(customer.id)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  
                  {showDeleteConfirm === customer.id ? (
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        Sim
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        Não
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setShowDeleteConfirm(customer.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              Nenhum cliente encontrado com os filtros selecionados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersContent;

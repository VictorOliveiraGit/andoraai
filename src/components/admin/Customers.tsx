
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  User,
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  Edit,
  Trash,
  ArrowUpRight,
  Clock,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";
import { FilterDialog } from "./reports/FilterDialog";

// Dados de exemplo expandidos com informações de plano
const customersData = [
  { id: 1, nome: "João Silva", email: "joao.silva@example.com", telefone: "(11) 98765-4321", ultimaCompra: "10/06/2023", totalGasto: 4750.00, status: "Ativo", plano: "Premium" },
  { id: 2, nome: "Maria Oliveira", email: "maria@example.com", telefone: "(21) 98765-4321", ultimaCompra: "05/06/2023", totalGasto: 3500.00, status: "Ativo", plano: "Básico" },
  { id: 3, nome: "Pedro Santos", email: "pedro@example.com", telefone: "(31) 98765-4321", ultimaCompra: "01/06/2023", totalGasto: 1250.00, status: "Inativo", plano: "Básico" },
  { id: 4, nome: "Ana Costa", email: "ana@example.com", telefone: "(41) 98765-4321", ultimaCompra: "20/05/2023", totalGasto: 950.00, status: "Ativo", plano: "Premium" },
  { id: 5, nome: "Carlos Ferreira", email: "carlos@example.com", telefone: "(51) 98765-4321", ultimaCompra: "15/05/2023", totalGasto: 2200.00, status: "Ativo", plano: "Pro" },
  { id: 6, nome: "Mariana Lima", email: "mariana@example.com", telefone: "(61) 98765-4321", ultimaCompra: "10/05/2023", totalGasto: 1800.00, status: "Inativo", plano: "Básico" },
];

export const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [selectedPlan, setSelectedPlan] = useState("todos");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5000);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  
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
              <Clock className="h-8 w-8 text-yellow-600" />
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

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Lista de Clientes</CardTitle>
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
                <option value="todos">Todos os Status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
              <select
                className="border rounded-md px-3 py-2"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                <option value="todos">Todos os Planos</option>
                <option value="básico">Básico</option>
                <option value="pro">Pro</option>
                <option value="premium">Premium</option>
              </select>
              <FilterDialog
                minValue={minValue}
                maxValue={maxValue}
                setMinValue={setMinValue}
                setMaxValue={setMaxValue}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Contato</th>
                  <th className="px-6 py-3">Plano</th>
                  <th className="px-6 py-3">Última Compra</th>
                  <th className="px-6 py-3">Total Gasto</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{customer.id}</td>
                    <td className="px-6 py-4">{customer.nome}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="flex items-center text-xs mb-1">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </span>
                        <span className="flex items-center text-xs">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.telefone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs ${
                        customer.plano === "Premium" 
                          ? "bg-amber-100 text-amber-800" 
                          : customer.plano === "Pro"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                      }`}>
                        {customer.plano}
                      </span>
                    </td>
                    <td className="px-6 py-4">{customer.ultimaCompra}</td>
                    <td className="px-6 py-4">R$ {customer.totalGasto.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs ${
                        customer.status === "Ativo" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditCustomer(customer.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {showDeleteConfirm === customer.id ? (
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              className="h-8 p-0 px-2 text-xs"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              Confirmar
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 p-0 px-2 text-xs"
                              onClick={() => setShowDeleteConfirm(null)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => setShowDeleteConfirm(customer.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center">
                        <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
                        <p className="text-muted-foreground">Nenhum cliente encontrado com os filtros atuais</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              Mostrando <span className="font-medium">{filteredCustomers.length}</span> de <span className="font-medium">{customersData.length}</span> clientes
            </span>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm" className="bg-secondary text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">Próximo</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

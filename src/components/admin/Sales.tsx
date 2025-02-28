
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Calendar,
  Edit,
  Trash,
  Plus,
  Search,
  Filter,
  Download
} from "lucide-react";

// Dados de exemplo
const salesData = [
  { id: 1, cliente: "João Silva", produto: "Produto Premium", data: "15/06/2023", valor: 1250.00, status: "Completo" },
  { id: 2, cliente: "Maria Oliveira", produto: "Serviço Anual", data: "10/06/2023", valor: 3500.00, status: "Completo" },
  { id: 3, cliente: "Pedro Santos", produto: "Produto Basic", data: "05/06/2023", valor: 550.00, status: "Pendente" },
  { id: 4, cliente: "Ana Costa", produto: "Plano Mensal", data: "01/06/2023", valor: 150.00, status: "Cancelado" },
  { id: 5, cliente: "Carlos Ferreira", produto: "Produto Standard", data: "28/05/2023", valor: 850.00, status: "Completo" },
];

export const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  
  // Filtra os dados com base no termo de busca e status selecionado
  const filteredSales = salesData.filter(sale => {
    const matchesSearch = 
      sale.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.produto.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === "todos" || 
      sale.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center">
          <ShoppingBag className="mr-2 h-6 w-6" />
          Gerenciamento de Vendas
        </h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Venda
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Vendas Recentes</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar..."
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
                <option value="completo">Completo</option>
                <option value="pendente">Pendente</option>
                <option value="cancelado">Cancelado</option>
              </select>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Período
              </Button>
              <Button variant="secondary" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Produto</th>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3">Valor</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{sale.id}</td>
                    <td className="px-6 py-4">{sale.cliente}</td>
                    <td className="px-6 py-4">{sale.produto}</td>
                    <td className="px-6 py-4">{sale.data}</td>
                    <td className="px-6 py-4">R$ {sale.valor.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs ${
                        sale.status === "Completo" ? "bg-green-100 text-green-800" :
                        sale.status === "Pendente" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              Mostrando <span className="font-medium">{filteredSales.length}</span> de <span className="font-medium">{salesData.length}</span> vendas
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Vendas Hoje</p>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-xs text-green-600">+20% em relação a ontem</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Receita Hoje</p>
              <h3 className="text-2xl font-bold">R$ 4.320,50</h3>
              <p className="text-xs text-green-600">+15% em relação a ontem</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Ticket Médio</p>
              <h3 className="text-2xl font-bold">R$ 360,04</h3>
              <p className="text-xs text-red-600">-5% em relação a ontem</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold">3,8%</h3>
              <p className="text-xs text-green-600">+0,5% em relação a ontem</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

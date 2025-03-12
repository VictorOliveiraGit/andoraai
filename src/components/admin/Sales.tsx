
import { useState, useEffect } from "react";
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
import { NewSaleModal, Sale } from "./sales/NewSaleModal";
import { exportToExcel } from "@/utils/excel-export";
import { toast } from "sonner";
import { format } from "date-fns";

// Tipos de filtro para período
type PeriodFilter = "hoje" | "semana" | "mes" | "ano" | "todos";

export const Sales = () => {
  const [salesData, setSalesData] = useState<Sale[]>([
    { id: 1, cliente: "João Silva", produto: "Produto Premium", data: "15/06/2023", valor: 1250.00, status: "Completo" },
    { id: 2, cliente: "Maria Oliveira", produto: "Serviço Anual", data: "10/06/2023", valor: 3500.00, status: "Completo" },
    { id: 3, cliente: "Pedro Santos", produto: "Produto Basic", data: "05/06/2023", valor: 550.00, status: "Pendente" },
    { id: 4, cliente: "Ana Costa", produto: "Plano Mensal", data: "01/06/2023", valor: 150.00, status: "Cancelado" },
    { id: 5, cliente: "Carlos Ferreira", produto: "Produto Standard", data: "28/05/2023", valor: 850.00, status: "Completo" },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("todos");
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [totalSalesCount, setTotalSalesCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageTicket, setAverageTicket] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  
  // Filtra os dados com base nos filtros aplicados
  const filteredSales = salesData.filter(sale => {
    // Filtro de busca
    const matchesSearch = 
      sale.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.produto.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de status
    const matchesStatus = 
      selectedStatus === "todos" || 
      sale.status.toLowerCase() === selectedStatus.toLowerCase();
    
    // Filtro de período
    let matchesPeriod = true;
    if (periodFilter !== "todos") {
      const saleDate = new Date(sale.data.split('/').reverse().join('-'));
      const today = new Date();
      
      if (periodFilter === "hoje") {
        matchesPeriod = saleDate.toDateString() === today.toDateString();
      } else if (periodFilter === "semana") {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        matchesPeriod = saleDate >= weekStart;
      } else if (periodFilter === "mes") {
        matchesPeriod = 
          saleDate.getMonth() === today.getMonth() && 
          saleDate.getFullYear() === today.getFullYear();
      } else if (periodFilter === "ano") {
        matchesPeriod = saleDate.getFullYear() === today.getFullYear();
      }
    }
    
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  // Calcula os KPIs com base nos dados filtrados
  useEffect(() => {
    // Total de vendas
    setTotalSalesCount(filteredSales.length);
    
    // Receita total
    const revenue = filteredSales.reduce((total, sale) => total + sale.valor, 0);
    setTotalRevenue(revenue);
    
    // Ticket médio
    setAverageTicket(filteredSales.length > 0 ? revenue / filteredSales.length : 0);
    
    // Taxa de conversão (simulada - normalmente viria de outro lugar)
    setConversionRate(Math.random() * 5 + 2); // Valor aleatório entre 2% e 7%
  }, [filteredSales]);

  // Adiciona uma nova venda
  const handleAddSale = (newSale: Sale) => {
    setSalesData(prev => [newSale, ...prev]);
    toast.success("Venda registrada com sucesso!");
  };

  // Exporta para Excel
  const handleExportToExcel = () => {
    exportToExcel(filteredSales, `vendas-${format(new Date(), 'dd-MM-yyyy')}`);
    toast.success("Relatório exportado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center">
          <ShoppingBag className="mr-2 h-6 w-6" />
          Gerenciamento de Vendas
        </h1>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setIsNewSaleModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Nova Venda
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Vendas Recentes</CardTitle>
            <div className="flex flex-wrap gap-3">
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
              <select
                className="border rounded-md px-3 py-2"
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value as PeriodFilter)}
              >
                <option value="todos">Todos os Períodos</option>
                <option value="hoje">Hoje</option>
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mês</option>
                <option value="ano">Este Ano</option>
              </select>
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleExportToExcel}
              >
                <Download className="h-4 w-4" />
                Exportar Excel
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
              <p className="text-sm font-medium text-muted-foreground">Vendas</p>
              <h3 className="text-2xl font-bold">{totalSalesCount}</h3>
              <p className="text-xs text-green-600">Período selecionado</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
              <h3 className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</h3>
              <p className="text-xs text-green-600">Período selecionado</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Ticket Médio</p>
              <h3 className="text-2xl font-bold">R$ {averageTicket.toFixed(2)}</h3>
              <p className="text-xs text-green-600">Período selecionado</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold">{conversionRate.toFixed(1)}%</h3>
              <p className="text-xs text-green-600">Período selecionado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Nova Venda */}
      <NewSaleModal 
        isOpen={isNewSaleModalOpen}
        onClose={() => setIsNewSaleModalOpen(false)}
        onAddSale={handleAddSale}
      />
    </div>
  );
};


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
  Download,
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { format } from "date-fns";

// Dados de exemplo
const initialSalesData = [
  { id: 1, cliente: "João Silva", produto: "Produto Premium", data: "15/06/2023", valor: 1250.00, status: "Completo" },
  { id: 2, cliente: "Maria Oliveira", produto: "Serviço Anual", data: "10/06/2023", valor: 3500.00, status: "Completo" },
  { id: 3, cliente: "Pedro Santos", produto: "Produto Basic", data: "05/06/2023", valor: 550.00, status: "Pendente" },
  { id: 4, cliente: "Ana Costa", produto: "Plano Mensal", data: "01/06/2023", valor: 150.00, status: "Cancelado" },
  { id: 5, cliente: "Carlos Ferreira", produto: "Produto Standard", data: "28/05/2023", valor: 850.00, status: "Completo" },
];

// Produtos disponíveis para venda
const availableProducts = [
  { nome: "Produto Premium", valor: 1250.00 },
  { nome: "Serviço Anual", valor: 3500.00 },
  { nome: "Produto Basic", valor: 550.00 },
  { nome: "Plano Mensal", valor: 150.00 },
  { nome: "Produto Standard", valor: 850.00 },
];

export const Sales = () => {
  const [salesData, setSalesData] = useState(initialSalesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("todos");
  const [datePeriod, setDatePeriod] = useState({ startDate: "", endDate: "" });
  
  // Estado para o formulário de nova venda
  const [newSale, setNewSale] = useState({
    cliente: "",
    produto: "",
    data: format(new Date(), "yyyy-MM-dd"),
    valor: "",
    status: "Completo"
  });

  // Estatísticas de vendas
  const getSalesStats = () => {
    const filteredForStats = getFilteredSales();
    
    const totalSales = filteredForStats.length;
    const totalRevenue = filteredForStats.reduce((acc, sale) => acc + sale.valor, 0);
    const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;
    
    return {
      totalSales,
      totalRevenue,
      averageTicket
    };
  };

  // Filtra os dados com base no termo de busca, status e período
  const getFilteredSales = () => {
    return salesData.filter(sale => {
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
      
      if (selectedPeriod === "personalizado" && datePeriod.startDate && datePeriod.endDate) {
        const saleDate = new Date(sale.data.split('/').reverse().join('-'));
        const startDate = new Date(datePeriod.startDate);
        const endDate = new Date(datePeriod.endDate);
        matchesPeriod = saleDate >= startDate && saleDate <= endDate;
      } else if (selectedPeriod !== "todos") {
        const today = new Date();
        const saleDate = new Date(sale.data.split('/').reverse().join('-'));
        
        if (selectedPeriod === "hoje") {
          matchesPeriod = 
            saleDate.getDate() === today.getDate() && 
            saleDate.getMonth() === today.getMonth() && 
            saleDate.getFullYear() === today.getFullYear();
        } else if (selectedPeriod === "semana") {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          matchesPeriod = saleDate >= oneWeekAgo;
        } else if (selectedPeriod === "mes") {
          matchesPeriod = 
            saleDate.getMonth() === today.getMonth() && 
            saleDate.getFullYear() === today.getFullYear();
        } else if (selectedPeriod === "ano") {
          matchesPeriod = saleDate.getFullYear() === today.getFullYear();
        }
      }
      
      return matchesSearch && matchesStatus && matchesPeriod;
    });
  };

  const filteredSales = getFilteredSales();
  const stats = getSalesStats();
  
  // Manipulação do formulário de nova venda
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Se for o select de produto, atualiza automaticamente o valor
    if (name === "produto" && value) {
      const selectedProduct = availableProducts.find(p => p.nome === value);
      setNewSale({
        ...newSale,
        [name]: value,
        valor: selectedProduct?.valor.toString() || ""
      });
    } else {
      setNewSale({
        ...newSale,
        [name]: value
      });
    }
  };
  
  // Adicionar nova venda
  const handleAddSale = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!newSale.cliente || !newSale.produto || !newSale.data || !newSale.valor) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    // Formatar a data para o padrão DD/MM/YYYY
    const formattedDate = new Date(newSale.data).toLocaleDateString('pt-BR');
    
    // Criar nova venda
    const sale = {
      id: salesData.length > 0 ? Math.max(...salesData.map(s => s.id)) + 1 : 1,
      cliente: newSale.cliente,
      produto: newSale.produto,
      data: formattedDate,
      valor: parseFloat(newSale.valor),
      status: newSale.status
    };
    
    // Adicionar ao estado
    setSalesData([sale, ...salesData]);
    
    // Resetar formulário e fechar modal
    setNewSale({
      cliente: "",
      produto: "",
      data: format(new Date(), "yyyy-MM-dd"),
      valor: "",
      status: "Completo"
    });
    
    setIsNewSaleModalOpen(false);
    toast.success("Venda adicionada com sucesso!");
  };
  
  // Exportar para Excel
  const exportToExcel = () => {
    // Criar uma worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredSales);
    
    // Criar um workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendas");
    
    // Converter para binário e baixar
    XLSX.writeFile(workbook, `Vendas_${format(new Date(), "dd-MM-yyyy")}.xlsx`);
    
    toast.success("Dados exportados com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center">
          <ShoppingBag className="mr-2 h-6 w-6" />
          Gerenciamento de Vendas
        </h1>
        <Button className="flex items-center gap-2" onClick={() => setIsNewSaleModalOpen(true)}>
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
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="todos">Todos os Períodos</option>
                <option value="hoje">Hoje</option>
                <option value="semana">Última Semana</option>
                <option value="mes">Este Mês</option>
                <option value="ano">Este Ano</option>
                <option value="personalizado">Personalizado</option>
              </select>
              {selectedPeriod === "personalizado" && (
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="border rounded-md px-3 py-2"
                    value={datePeriod.startDate}
                    onChange={(e) => setDatePeriod({...datePeriod, startDate: e.target.value})}
                  />
                  <input
                    type="date"
                    className="border rounded-md px-3 py-2"
                    value={datePeriod.endDate}
                    onChange={(e) => setDatePeriod({...datePeriod, endDate: e.target.value})}
                  />
                </div>
              )}
              <Button variant="secondary" size="sm" className="flex items-center gap-2" onClick={exportToExcel}>
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => {
                          setSalesData(salesData.filter(s => s.id !== sale.id));
                          toast.success("Venda removida com sucesso!");
                        }}
                      >
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
              <h3 className="text-2xl font-bold">{stats.totalSales}</h3>
              <p className="text-xs text-green-600">+20% em relação a ontem</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Receita Hoje</p>
              <h3 className="text-2xl font-bold">R$ {stats.totalRevenue.toFixed(2)}</h3>
              <p className="text-xs text-green-600">+15% em relação a ontem</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Ticket Médio</p>
              <h3 className="text-2xl font-bold">R$ {stats.averageTicket.toFixed(2)}</h3>
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

      {/* Modal de Nova Venda */}
      <Dialog open={isNewSaleModalOpen} onOpenChange={setIsNewSaleModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nova Venda</DialogTitle>
            <DialogDescription>
              Preencha os dados para registrar uma nova venda.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSale}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="cliente" className="text-right font-medium col-span-1">
                  Cliente
                </label>
                <input
                  id="cliente"
                  name="cliente"
                  value={newSale.cliente}
                  onChange={handleInputChange}
                  className="col-span-3 border rounded-md px-3 py-2"
                  placeholder="Nome do cliente"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="produto" className="text-right font-medium col-span-1">
                  Produto
                </label>
                <select
                  id="produto"
                  name="produto"
                  value={newSale.produto}
                  onChange={handleInputChange}
                  className="col-span-3 border rounded-md px-3 py-2"
                >
                  <option value="">Selecione um produto</option>
                  {availableProducts.map((product, index) => (
                    <option key={index} value={product.nome}>
                      {product.nome} - R$ {product.valor.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="data" className="text-right font-medium col-span-1">
                  Data
                </label>
                <input
                  id="data"
                  name="data"
                  type="date"
                  value={newSale.data}
                  onChange={handleInputChange}
                  className="col-span-3 border rounded-md px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="valor" className="text-right font-medium col-span-1">
                  Valor (R$)
                </label>
                <input
                  id="valor"
                  name="valor"
                  type="number"
                  value={newSale.valor}
                  onChange={handleInputChange}
                  className="col-span-3 border rounded-md px-3 py-2"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right font-medium col-span-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newSale.status}
                  onChange={handleInputChange}
                  className="col-span-3 border rounded-md px-3 py-2"
                >
                  <option value="Completo">Completo</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

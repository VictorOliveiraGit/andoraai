
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash,
  Tag,
  BarChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// Dados de exemplo
const productsData = [
  { id: 1, nome: "Produto Premium", categoria: "Assinatura", preco: 1250.00, estoque: 0, vendas: 156, status: "Ativo" },
  { id: 2, nome: "Serviço Anual", categoria: "Serviço", preco: 3500.00, estoque: 0, vendas: 89, status: "Ativo" },
  { id: 3, nome: "Produto Basic", categoria: "Assinatura", preco: 550.00, estoque: 0, vendas: 327, status: "Ativo" },
  { id: 4, nome: "Plano Mensal", categoria: "Assinatura", preco: 150.00, estoque: 0, vendas: 512, status: "Ativo" },
  { id: 5, nome: "Produto Standard", categoria: "Produto Físico", preco: 850.00, estoque: 45, vendas: 78, status: "Baixo Estoque" },
  { id: 6, nome: "Curso Online", categoria: "Digital", preco: 750.00, estoque: 0, vendas: 114, status: "Ativo" },
  { id: 7, nome: "Acessório Premium", categoria: "Produto Físico", preco: 320.00, estoque: 2, vendas: 42, status: "Baixo Estoque" },
  { id: 8, nome: "E-book Completo", categoria: "Digital", preco: 120.00, estoque: 0, vendas: 231, status: "Ativo" },
];

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  
  // Filtra os dados com base no termo de busca e categoria selecionada
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = 
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "todas" || 
      product.categoria.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Extrair categorias únicas
  const uniqueCategories = [...new Set(productsData.map(product => product.categoria))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Package className="mr-2 h-6 w-6" />
          Catálogo de Produtos
        </h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Tag className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Produtos</p>
              <h3 className="text-2xl font-bold">{productsData.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-green-100 p-2 rounded-full">
              <BarChart className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Vendas Totais</p>
              <h3 className="text-2xl font-bold">1.549</h3>
              <div className="flex items-center mt-1 text-xs">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-primary/20 p-2 rounded-full">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mais Vendido</p>
              <h3 className="text-lg font-medium">Plano Mensal</h3>
              <p className="text-xs text-muted-foreground">512 vendas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-red-100 p-2 rounded-full">
              <Package className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Baixo Estoque</p>
              <h3 className="text-2xl font-bold">2</h3>
              <div className="flex items-center mt-1 text-xs">
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                <span className="text-red-600 font-medium">Alerta</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Lista de Produtos</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar produto..."
                  className="pl-9 pr-4 py-2 border rounded-md w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border rounded-md px-3 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="todas">Todas as Categorias</option>
                {uniqueCategories.map((category, index) => (
                  <option key={index} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
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
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Categoria</th>
                  <th className="px-6 py-3">Preço</th>
                  <th className="px-6 py-3">Estoque</th>
                  <th className="px-6 py-3">Vendas</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{product.id}</td>
                    <td className="px-6 py-4">{product.nome}</td>
                    <td className="px-6 py-4">{product.categoria}</td>
                    <td className="px-6 py-4">R$ {product.preco.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {product.categoria === "Digital" || product.categoria === "Serviço" || product.categoria === "Assinatura" 
                        ? "∞" 
                        : product.estoque}
                    </td>
                    <td className="px-6 py-4">{product.vendas}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs ${
                        product.status === "Ativo" ? "bg-green-100 text-green-800" :
                        product.status === "Baixo Estoque" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {product.status}
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
              Mostrando <span className="font-medium">{filteredProducts.length}</span> de <span className="font-medium">{productsData.length}</span> produtos
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

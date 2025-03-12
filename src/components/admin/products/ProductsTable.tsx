
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Edit, Trash } from "lucide-react";
import { Product } from "./NewProductModal";
import { ProductStatusBadge } from "./ProductStatusBadge";

interface ProductsTableProps {
  filteredProducts: Product[];
  productsData: Product[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  uniqueCategories: string[];
  handleDeleteProduct: (id: number) => void;
}

export const ProductsTable = ({
  filteredProducts,
  productsData,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  uniqueCategories,
  handleDeleteProduct
}: ProductsTableProps) => {
  return (
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
                    <ProductStatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-500"
                      onClick={() => handleDeleteProduct(product.id)}
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
  );
};

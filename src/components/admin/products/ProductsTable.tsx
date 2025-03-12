
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "./types";
import { ProductSearch } from "./ProductSearch";
import { ProductTableRow } from "./ProductTableRow";
import { TablePagination } from "./TablePagination";

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
          <ProductSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            uniqueCategories={uniqueCategories}
          />
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
              {filteredProducts.map((product) => (
                <ProductTableRow 
                  key={product.id} 
                  product={product} 
                  handleDeleteProduct={handleDeleteProduct} 
                />
              ))}
            </tbody>
          </table>
        </div>

        <TablePagination 
          filteredCount={filteredProducts.length} 
          totalCount={productsData.length} 
        />
      </CardContent>
    </Card>
  );
};


import { Card, CardContent } from "@/components/ui/card";
import { Tag, BarChart, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Product } from "./types";

interface ProductsStatsProps {
  productsData: Product[];
}

export const ProductsStats = ({ productsData }: ProductsStatsProps) => {
  // Find the product with the most sales
  const mostSoldProduct = [...productsData].sort((a, b) => b.vendas - a.vendas)[0];
  
  // Count products with low stock
  const lowStockCount = productsData.filter(product => 
    product.status === "Baixo Estoque"
  ).length;

  return (
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
            <h3 className="text-lg font-medium">{mostSoldProduct?.nome || "Plano Mensal"}</h3>
            <p className="text-xs text-muted-foreground">{mostSoldProduct?.vendas || 0} vendas</p>
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
            <h3 className="text-2xl font-bold">{lowStockCount}</h3>
            <div className="flex items-center mt-1 text-xs">
              <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              <span className="text-red-600 font-medium">Alerta</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

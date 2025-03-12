
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

const ProductsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Produtos</h2>
    <p className="text-gray-500">Gerencie o catálogo de produtos da sua loja.</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Card key={item}>
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <Package className="h-10 w-10 text-gray-400" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium">Produto {item}</h3>
            <p className="text-sm text-gray-500 mb-2">Categoria</p>
            <p className="font-bold">R$ {(item * 99.9).toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ProductsContent;

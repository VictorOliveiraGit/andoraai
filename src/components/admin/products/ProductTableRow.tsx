
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Product } from "./types";
import { ProductStatusBadge } from "./ProductStatusBadge";

interface ProductTableRowProps {
  product: Product;
  handleDeleteProduct: (id: number) => void;
}

export const ProductTableRow = ({ product, handleDeleteProduct }: ProductTableRowProps) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
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
  );
};

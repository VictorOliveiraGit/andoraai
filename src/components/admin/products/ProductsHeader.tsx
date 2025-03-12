
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductsHeaderProps {
  openNewProductModal: () => void;
}

export const ProductsHeader = ({ openNewProductModal }: ProductsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h1 className="text-2xl font-bold flex items-center">
        <Package className="mr-2 h-6 w-6" />
        Catálogo de Produtos
      </h1>
      <Button 
        className="flex items-center gap-2"
        onClick={openNewProductModal}
      >
        <Plus className="h-4 w-4" />
        Novo Produto
      </Button>
    </div>
  );
};

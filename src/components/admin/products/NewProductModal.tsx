
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ProductForm } from "./ProductForm";
import { Product } from "./types";

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  categories: string[];
}

export const NewProductModal = ({ isOpen, onClose, onAddProduct, categories }: NewProductModalProps) => {
  const handleAddProduct = (product: Product) => {
    onAddProduct(product);
    onClose();
    toast.success("Produto adicionado com sucesso!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para cadastrar um novo produto.
          </DialogDescription>
        </DialogHeader>
        
        <ProductForm 
          onSubmit={handleAddProduct}
          onCancel={onClose}
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
};

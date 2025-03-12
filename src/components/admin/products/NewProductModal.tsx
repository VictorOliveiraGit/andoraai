
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Package, Tag, BarChart } from "lucide-react";

export interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  vendas: number;
  status: string;
}

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  categories: string[];
}

export const NewProductModal = ({ isOpen, onClose, onAddProduct, categories }: NewProductModalProps) => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [status, setStatus] = useState("Ativo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !categoria || !preco) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Handle stock for non-physical products
    let stockValue = parseInt(estoque || "0");
    if (categoria === "Digital" || categoria === "Serviço" || categoria === "Assinatura") {
      stockValue = 0;
    }

    const newProduct: Product = {
      id: Date.now(),
      nome,
      categoria,
      preco: parseFloat(preco),
      estoque: stockValue,
      vendas: 0,
      status
    };

    onAddProduct(newProduct);
    resetForm();
    onClose();
    toast.success("Produto adicionado com sucesso!");
  };

  const resetForm = () => {
    setNome("");
    setCategoria("");
    setPreco("");
    setEstoque("");
    setStatus("Ativo");
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  // Format currency input
  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    let value = e.target.value.replace(/\D/g, "");
    
    // Convert to number format with decimals
    if (value) {
      const numberValue = parseInt(value) / 100;
      setPreco(numberValue.toString());
    } else {
      setPreco("");
    }
  };

  // Handle physical/non-physical product types
  const isPhysicalProduct = categoria !== "Digital" && categoria !== "Serviço" && categoria !== "Assinatura";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Novo Produto</DialogTitle>
            <DialogDescription>
              Preencha os detalhes para cadastrar um novo produto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome do produto"
                  className="flex-1"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoria" className="text-right">
                Categoria
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={categoria}
                  onValueChange={setCategoria}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preco" className="text-right">
                Preço (R$)
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <BarChart className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="preco"
                  value={preco ? `R$ ${parseFloat(preco).toFixed(2)}` : ""}
                  onChange={handlePrecoChange}
                  placeholder="R$ 0,00"
                  className="flex-1"
                  required
                />
              </div>
            </div>
            {isPhysicalProduct && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estoque" className="text-right">
                  Estoque
                </Label>
                <Input
                  id="estoque"
                  type="number"
                  min="0"
                  value={estoque}
                  onChange={(e) => setEstoque(e.target.value)}
                  placeholder="Quantidade em estoque"
                  className="col-span-3"
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={status}
                onValueChange={setStatus}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                  <SelectItem value="Baixo Estoque">Baixo Estoque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Produto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

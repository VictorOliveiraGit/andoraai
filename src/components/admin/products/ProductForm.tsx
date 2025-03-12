
import { useState } from "react";
import { Package, Tag, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FormField } from "./FormField";
import { Product } from "./types";

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  categories: string[];
}

export const ProductForm = ({ onSubmit, onCancel, categories }: ProductFormProps) => {
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

    onSubmit(newProduct);
    resetForm();
  };

  const resetForm = () => {
    setNome("");
    setCategoria("");
    setPreco("");
    setEstoque("");
    setStatus("Ativo");
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
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <FormField id="nome" label="Nome" icon={<Package className="h-4 w-4 text-muted-foreground" />}>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do produto"
            className="flex-1"
            required
          />
        </FormField>

        <FormField id="categoria" label="Categoria" icon={<Tag className="h-4 w-4 text-muted-foreground" />}>
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
        </FormField>

        <FormField id="preco" label="Preço (R$)" icon={<BarChart className="h-4 w-4 text-muted-foreground" />}>
          <Input
            id="preco"
            value={preco ? `R$ ${parseFloat(preco).toFixed(2)}` : ""}
            onChange={handlePrecoChange}
            placeholder="R$ 0,00"
            className="flex-1"
            required
          />
        </FormField>

        {isPhysicalProduct && (
          <FormField id="estoque" label="Estoque">
            <Input
              id="estoque"
              type="number"
              min="0"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              placeholder="Quantidade em estoque"
              className="w-full"
            />
          </FormField>
        )}

        <FormField id="status" label="Status">
          <Select
            value={status}
            onValueChange={setStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
              <SelectItem value="Baixo Estoque">Baixo Estoque</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar Produto</Button>
      </div>
    </form>
  );
};

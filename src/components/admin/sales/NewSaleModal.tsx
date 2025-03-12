
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
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { User, CalendarIcon, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export interface Sale {
  id: number;
  cliente: string;
  produto: string;
  data: string;
  valor: number;
  status: string;
}

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSale: (sale: Sale) => void;
}

export const NewSaleModal = ({ isOpen, onClose, onAddSale }: NewSaleModalProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("Completo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cliente || !produto || !valor || !date) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const newSale: Sale = {
      id: Date.now(),
      cliente,
      produto,
      data: format(date as Date, "dd/MM/yyyy"),
      valor: parseFloat(valor),
      status
    };

    onAddSale(newSale);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCliente("");
    setProduto("");
    setValor("");
    setDate(new Date());
    setStatus("Completo");
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  // Format currency input
  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    let value = e.target.value.replace(/\D/g, "");
    
    // Convert to number format with decimals
    if (value) {
      const numberValue = parseInt(value) / 100;
      setValor(numberValue.toString());
    } else {
      setValor("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nova Venda</DialogTitle>
            <DialogDescription>
              Preencha os detalhes para registrar uma nova venda.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cliente" className="text-right">
                Cliente
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="cliente"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Nome do cliente"
                  className="flex-1"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="produto" className="text-right">
                Produto
              </Label>
              <Select
                value={produto}
                onValueChange={setProduto}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Produto Premium">Produto Premium</SelectItem>
                  <SelectItem value="Produto Standard">Produto Standard</SelectItem>
                  <SelectItem value="Produto Basic">Produto Basic</SelectItem>
                  <SelectItem value="Serviço Anual">Serviço Anual</SelectItem>
                  <SelectItem value="Plano Mensal">Plano Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="valor" className="text-right">
                Valor (R$)
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="valor"
                  value={valor ? `R$ ${parseFloat(valor).toFixed(2)}` : ""}
                  onChange={handleValorChange}
                  placeholder="R$ 0,00"
                  className="flex-1"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="data" className="text-right">
                Data
              </Label>
              <div className="col-span-3 border rounded-md p-1">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                  className="rounded-md"
                />
              </div>
            </div>
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
                  <SelectItem value="Completo">Completo</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Venda</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

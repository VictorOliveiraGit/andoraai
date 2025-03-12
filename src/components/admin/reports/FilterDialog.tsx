
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";

interface FilterDialogProps {
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
}

export const FilterDialog = ({
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}: FilterDialogProps) => {
  const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMinValue(value);
    }
  };

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMaxValue(value);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtros do Relatório</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="minValue">Valor Mínimo</Label>
            <Input
              id="minValue"
              type="number"
              value={minValue}
              onChange={handleMinValueChange}
              placeholder="Digite o valor mínimo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxValue">Valor Máximo</Label>
            <Input
              id="maxValue"
              type="number"
              value={maxValue}
              onChange={handleMaxValueChange}
              placeholder="Digite o valor máximo"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

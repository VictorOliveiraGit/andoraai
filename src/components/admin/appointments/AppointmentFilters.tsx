
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AppointmentFiltersProps {
  filterDate: Date | undefined;
  setFilterDate: (date: Date | undefined) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterPayment: string;
  setFilterPayment: (payment: string) => void;
  handleClearFilters: () => void;
  showFilters: boolean;
}

export const AppointmentFilters = ({
  filterDate,
  setFilterDate,
  filterStatus,
  setFilterStatus,
  filterPayment,
  setFilterPayment,
  handleClearFilters,
  showFilters,
}: AppointmentFiltersProps) => {
  if (!showFilters) return null;
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-lg">Filtros</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearFilters}
            className="h-8 gap-1 text-sm"
          >
            <X size={16} />
            <span className="hidden sm:inline">Limpar filtros</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Date Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Data</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-9"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filterDate ? (
                    format(filterDate, "dd 'de' MMM, yyyy", { locale: ptBR })
                  ) : (
                    <span>Escolha uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filterDate}
                  onSelect={setFilterDate}
                  className="rounded-md pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select 
              value={filterStatus}
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="scheduled">Agendado</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="completed">Finalizado</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="no_show">Não compareceu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Pagamento</label>
            <Select 
              value={filterPayment}
              onValueChange={setFilterPayment}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Todos os pagamentos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os pagamentos</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="not_required">Não requer pagamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

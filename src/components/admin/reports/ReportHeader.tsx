
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { exportToExcel } from "@/utils/excel-export";
import { useState } from "react";
import { toast } from "sonner";

interface ReportHeaderProps {
  reportType: string;
  setReportType: (type: string) => void;
  reportPeriod: string;
  setReportPeriod: (period: string) => void;
  data: any[];
  onFilterChange?: (filters: any) => void;
}

export const ReportHeader = ({
  reportType,
  setReportType,
  reportPeriod,
  setReportPeriod,
  data,
  onFilterChange
}: ReportHeaderProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState("all");
  const [region, setRegion] = useState("all");
  const [category, setCategory] = useState("all");

  const handleExport = () => {
    const fileName = `relatorio_${reportType}_${reportPeriod}`;
    exportToExcel(data, fileName);
  };

  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        dateRange,
        region,
        category
      });
    }
    toast.success("Filtros aplicados com sucesso!");
    setShowFilters(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Relatórios e Análises</h1>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-white border rounded-md px-3 py-1.5 text-sm flex-grow sm:flex-grow-0 min-w-24"
          >
            <option value="vendas">Vendas</option>
            <option value="clientes">Clientes</option>
            <option value="produtos">Produtos</option>
            <option value="financeiro">Financeiro</option>
          </select>
          <select 
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="bg-white border rounded-md px-3 py-1.5 text-sm flex-grow sm:flex-grow-0 min-w-24"
          >
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
            <option value="anual">Anual</option>
          </select>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="gap-2"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-md border shadow-sm space-y-4">
          <h3 className="font-medium text-sm">Filtros Avançados</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Período</label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-white border rounded-md px-3 py-1.5 text-sm"
              >
                <option value="all">Todos os períodos</option>
                <option value="today">Hoje</option>
                <option value="yesterday">Ontem</option>
                <option value="last7">Últimos 7 dias</option>
                <option value="last30">Últimos 30 dias</option>
                <option value="last90">Últimos 90 dias</option>
                <option value="thisYear">Este ano</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500 mb-1 block">Região</label>
              <select 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-white border rounded-md px-3 py-1.5 text-sm"
              >
                <option value="all">Todas as regiões</option>
                <option value="norte">Norte</option>
                <option value="nordeste">Nordeste</option>
                <option value="centro-oeste">Centro-Oeste</option>
                <option value="sudeste">Sudeste</option>
                <option value="sul">Sul</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500 mb-1 block">Categoria</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border rounded-md px-3 py-1.5 text-sm"
              >
                <option value="all">Todas as categorias</option>
                <option value="servicos">Serviços</option>
                <option value="produtos">Produtos</option>
                <option value="assinaturas">Assinaturas</option>
                <option value="consultas">Consultas</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(false)}
            >
              Cancelar
            </Button>
            <Button 
              size="sm"
              onClick={applyFilters}
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

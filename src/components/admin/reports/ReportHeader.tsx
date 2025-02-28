
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

interface ReportHeaderProps {
  reportType: string;
  setReportType: (type: string) => void;
  reportPeriod: string;
  setReportPeriod: (period: string) => void;
}

export const ReportHeader = ({
  reportType,
  setReportType,
  reportPeriod,
  setReportPeriod
}: ReportHeaderProps) => {
  return (
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
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

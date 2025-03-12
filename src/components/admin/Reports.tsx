
import { useState, useEffect } from "react";
import { ReportHeader } from "./reports/ReportHeader";
import { MonthlyChart } from "./reports/MonthlyChart";
import { ProductChart } from "./reports/ProductChart";
import { ReportSummary } from "./reports/ReportSummary";
import { DetailedHistory } from "./reports/DetailedHistory";
import { monthlyData, productData, COLORS } from "./reports/reportData";
import { toast } from "sonner";

export const Reports = () => {
  const [reportType, setReportType] = useState("vendas");
  const [reportPeriod, setReportPeriod] = useState("anual");
  const [filteredData, setFilteredData] = useState(monthlyData);
  const [exportData, setExportData] = useState<any[]>([]);
  
  // Update filtered data based on period
  useEffect(() => {
    let filtered = [...monthlyData];
    
    // Filter data based on period
    if (reportPeriod === "mensal") {
      filtered = monthlyData.slice(0, 1);
    } else if (reportPeriod === "semanal") {
      filtered = monthlyData.slice(0, 4);
    } else if (reportPeriod === "diario") {
      filtered = monthlyData.slice(0, 7);
    }
    
    setFilteredData(filtered);

    // Prepare export data
    const dataForExport = filtered.map(item => ({
      Período: item.name,
      Valor: `R$ ${item.valor.toFixed(2)}`,
      Crescimento: `${Math.floor(Math.random() * 20) - 5}%`
    }));
    setExportData(dataForExport);

  }, [reportPeriod, reportType]);
  
  return (
    <div className="space-y-6">
      <ReportHeader 
        reportType={reportType}
        setReportType={setReportType}
        reportPeriod={reportPeriod}
        setReportPeriod={setReportPeriod}
        data={exportData}
      />

      <MonthlyChart data={filteredData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductChart data={productData} colors={COLORS} />
        <ReportSummary />
      </div>

      <DetailedHistory />
    </div>
  );
};

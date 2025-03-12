
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
  const [activeFilters, setActiveFilters] = useState({
    dateRange: "all",
    region: "all",
    category: "all"
  });
  
  // Update filtered data based on period and filters
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
    
    // Apply additional filters if they're not set to "all"
    if (activeFilters.dateRange !== "all") {
      // Logic to further filter based on date range
      console.log("Applying date range filter:", activeFilters.dateRange);
      // Example: reduce values by 20% for specific date ranges
      if (activeFilters.dateRange === "last7") {
        filtered = filtered.map(item => ({
          ...item,
          valor: item.valor * 0.8
        }));
      } else if (activeFilters.dateRange === "last30") {
        filtered = filtered.map(item => ({
          ...item,
          valor: item.valor * 0.9
        }));
      }
    }
    
    // Apply region filter
    if (activeFilters.region !== "all") {
      console.log("Applying region filter:", activeFilters.region);
      // Example: adjust values based on region
      const regionMultipliers = {
        norte: 0.7,
        nordeste: 0.85,
        "centro-oeste": 0.9,
        sudeste: 1.2,
        sul: 1.1
      };
      
      const multiplier = regionMultipliers[activeFilters.region as keyof typeof regionMultipliers] || 1;
      filtered = filtered.map(item => ({
        ...item,
        valor: item.valor * multiplier
      }));
    }
    
    // Apply category filter
    if (activeFilters.category !== "all") {
      console.log("Applying category filter:", activeFilters.category);
      // Example: adjust values based on category
      const categoryMultipliers = {
        servicos: 1.1,
        produtos: 0.95,
        assinaturas: 1.25,
        consultas: 0.85
      };
      
      const multiplier = categoryMultipliers[activeFilters.category as keyof typeof categoryMultipliers] || 1;
      filtered = filtered.map(item => ({
        ...item,
        valor: item.valor * multiplier
      }));
    }
    
    setFilteredData(filtered);

    // Prepare export data
    const dataForExport = filtered.map(item => ({
      Período: item.name,
      Valor: `R$ ${item.valor.toFixed(2)}`,
      Crescimento: `${Math.floor(Math.random() * 20) - 5}%`
    }));
    setExportData(dataForExport);

  }, [reportPeriod, reportType, activeFilters]);
  
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    console.log("Filters changed:", filters);
  };
  
  return (
    <div className="space-y-6">
      <ReportHeader 
        reportType={reportType}
        setReportType={setReportType}
        reportPeriod={reportPeriod}
        setReportPeriod={setReportPeriod}
        data={exportData}
        onFilterChange={handleFilterChange}
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

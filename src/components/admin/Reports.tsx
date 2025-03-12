
import { useState, useMemo } from "react";
import { ReportHeader } from "./reports/ReportHeader";
import { MonthlyChart } from "./reports/MonthlyChart";
import { ProductChart } from "./reports/ProductChart";
import { ReportSummary } from "./reports/ReportSummary";
import { DetailedHistory } from "./reports/DetailedHistory";
import { monthlyData, productData, COLORS } from "./reports/reportData";
import { FilterDialog } from "./reports/FilterDialog";

export const Reports = () => {
  const [reportType, setReportType] = useState("vendas");
  const [reportPeriod, setReportPeriod] = useState("anual");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100000);
  
  // Filter data based on selected type, period and value range
  const filteredData = useMemo(() => {
    // Filter monthly data based on period
    let filtered = [...monthlyData];
    
    switch(reportPeriod) {
      case "diario":
        filtered = filtered.slice(-7); // Last 7 days
        break;
      case "semanal":
        filtered = filtered.slice(-4); // Last 4 weeks
        break;
      case "mensal":
        filtered = filtered.slice(-12); // Last 12 months
        break;
      default:
        break;
    }

    // Apply value range filter
    filtered = filtered.filter(item => 
      item.valor >= minValue && 
      (maxValue === 0 || item.valor <= maxValue)
    );

    return filtered;
  }, [reportType, reportPeriod, minValue, maxValue]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <ReportHeader 
          reportType={reportType}
          setReportType={setReportType}
          reportPeriod={reportPeriod}
          setReportPeriod={setReportPeriod}
          data={filteredData}
        />
        <FilterDialog
          minValue={minValue}
          maxValue={maxValue}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
        />
      </div>

      <MonthlyChart data={filteredData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductChart data={productData} colors={COLORS} />
        <ReportSummary />
      </div>

      <DetailedHistory />
    </div>
  );
};

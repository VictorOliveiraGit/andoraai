
import { useState, useMemo } from "react";
import { ReportHeader } from "./reports/ReportHeader";
import { MonthlyChart } from "./reports/MonthlyChart";
import { ProductChart } from "./reports/ProductChart";
import { ReportSummary } from "./reports/ReportSummary";
import { DetailedHistory } from "./reports/DetailedHistory";
import { monthlyData, productData, COLORS } from "./reports/reportData";

export const Reports = () => {
  const [reportType, setReportType] = useState("vendas");
  const [reportPeriod, setReportPeriod] = useState("anual");
  
  // Filter data based on selected type and period
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
      // For annual, use all data
      default:
        break;
    }

    return filtered;
  }, [reportType, reportPeriod]);

  return (
    <div className="space-y-6">
      <ReportHeader 
        reportType={reportType}
        setReportType={setReportType}
        reportPeriod={reportPeriod}
        setReportPeriod={setReportPeriod}
        data={filteredData}
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

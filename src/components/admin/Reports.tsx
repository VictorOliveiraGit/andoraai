
import { useState } from "react";
import { ReportHeader } from "./reports/ReportHeader";
import { MonthlyChart } from "./reports/MonthlyChart";
import { ProductChart } from "./reports/ProductChart";
import { ReportSummary } from "./reports/ReportSummary";
import { DetailedHistory } from "./reports/DetailedHistory";
import { monthlyData, productData, COLORS } from "./reports/reportData";

export const Reports = () => {
  const [reportType, setReportType] = useState("vendas");
  const [reportPeriod, setReportPeriod] = useState("anual");
  
  return (
    <div className="space-y-6">
      <ReportHeader 
        reportType={reportType}
        setReportType={setReportType}
        reportPeriod={reportPeriod}
        setReportPeriod={setReportPeriod}
      />

      <MonthlyChart data={monthlyData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductChart data={productData} colors={COLORS} />
        <ReportSummary />
      </div>

      <DetailedHistory />
    </div>
  );
};

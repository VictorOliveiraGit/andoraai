
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, ArrowUpRight, TrendingDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Reports } from "@/components/admin/Reports";
import AICostCard from "@/components/admin/analytics/AICostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompletedAppointments from "@/components/admin/analytics/CompletedAppointments";
import ConversionRates from "@/components/admin/analytics/ConversionRates";
import { useLocation } from "react-router-dom";

const AnalyticsContent = () => {
  // Taxa de conversão (em um app real, isso viria de uma API)
  const DOLLAR_TO_BRL = 5.03;
  const location = useLocation();
  
  // Check if we're in AdminAndora page
  const isAndoraAdmin = location.pathname.includes('admin-andora');
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Relatórios e Análises</h2>
      <p className="text-gray-500">Visualize dados importantes sobre vendas, clientes e custos operacionais.</p>
      
      {isAndoraAdmin ? (
        // Only show Sales and AI Costs tabs for Andora Admin
        <Tabs defaultValue="sales" className="w-full">
          <TabsList>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="ai-costs">Custos de IA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-6 pt-4">
            <Reports />
          </TabsContent>
          
          <TabsContent value="ai-costs" className="space-y-6 pt-4">
            <AICostCard />
          </TabsContent>
        </Tabs>
      ) : (
        // Show only Sales, Appointments, and Conversion tabs for regular Admin (removed AI Costs)
        <Tabs defaultValue="sales" className="w-full">
          <TabsList>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="appointments">Atendimentos</TabsTrigger>
            <TabsTrigger value="conversion">Taxa de Conversão</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-6 pt-4">
            <Reports />
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-6 pt-4">
            <CompletedAppointments />
          </TabsContent>
          
          <TabsContent value="conversion" className="space-y-6 pt-4">
            <ConversionRates />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AnalyticsContent;

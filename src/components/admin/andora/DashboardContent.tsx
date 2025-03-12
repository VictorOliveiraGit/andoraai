
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Filter, Users } from "lucide-react";
import { format } from "date-fns";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Daily sales data by year and month
const dailySalesData = {
  "2024": {
    "1": [
      { day: "Segunda", sales: 1500 },
      { day: "Terça", sales: 2200 },
      { day: "Quarta", sales: 1800 },
      { day: "Quinta", sales: 2500 },
      { day: "Sexta", sales: 3000 },
      { day: "Sábado", sales: 2800 },
      { day: "Domingo", sales: 1200 },
    ],
    "2": [
      { day: "Segunda", sales: 1700 },
      { day: "Terça", sales: 2400 },
      { day: "Quarta", sales: 2100 },
      { day: "Quinta", sales: 2700 },
      { day: "Sexta", sales: 3200 },
      { day: "Sábado", sales: 2600 },
      { day: "Domingo", sales: 1400 },
    ],
    "3": [
      { day: "Segunda", sales: 1900 },
      { day: "Terça", sales: 2600 },
      { day: "Quarta", sales: 2300 },
      { day: "Quinta", sales: 2900 },
      { day: "Sexta", sales: 3400 },
      { day: "Sábado", sales: 2700 },
      { day: "Domingo", sales: 1500 },
    ],
  },
  "2023": {
    "12": [
      { day: "Segunda", sales: 1400 },
      { day: "Terça", sales: 2000 },
      { day: "Quarta", sales: 1600 },
      { day: "Quinta", sales: 2300 },
      { day: "Sexta", sales: 2800 },
      { day: "Sábado", sales: 2500 },
      { day: "Domingo", sales: 1100 },
    ],
    "11": [
      { day: "Segunda", sales: 1300 },
      { day: "Terça", sales: 1900 },
      { day: "Quarta", sales: 1500 },
      { day: "Quinta", sales: 2200 },
      { day: "Sexta", sales: 2700 },
      { day: "Sábado", sales: 2400 },
      { day: "Domingo", sales: 1000 },
    ]
  }
};

const DashboardContent = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("1");

  const currentData = dailySalesData[selectedYear]?.[selectedMonth] || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R$ 159.327,00</p>
            <p className="text-sm opacity-80 mt-1">+18% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary/90 to-secondary/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Novos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">845</p>
            <p className="text-sm opacity-80 mt-1">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Assinaturas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2.156</p>
            <p className="text-sm text-muted-foreground mt-1">+5% em relação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Sales Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vendas Diárias</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent text-sm font-medium border-none focus:outline-none"
              >
                {Object.keys(dailySalesData).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-sm font-medium border-none focus:outline-none"
              >
                {Object.keys(dailySalesData[selectedYear] || {}).map((month) => (
                  <option key={month} value={month}>
                    {format(new Date(2024, parseInt(month) - 1), 'MMMM')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={currentData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`R$ ${value}`, 'Vendas']}
                labelFormatter={(label) => `Dia: ${label}`}
              />
              <Bar 
                dataKey="sales" 
                fill="#C6BA77" 
                radius={[4, 4, 0, 0]}
                name="Vendas"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users size={16} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Novo usuário registrado</h4>
                    <p className="text-sm text-gray-500">João Silva criou uma conta</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {item}h atrás
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Metas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Vendas</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Novos Usuários</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Receita de Assinaturas</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;

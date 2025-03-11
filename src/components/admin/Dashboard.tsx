import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  TrendingUp, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const data = [
  { name: "Jan", vendas: 4000, clientes: 240 },
  { name: "Fev", vendas: 3000, clientes: 198 },
  { name: "Mar", vendas: 5000, clientes: 280 },
  { name: "Abr", vendas: 8000, clientes: 308 },
  { name: "Mai", vendas: 6000, clientes: 360 },
  { name: "Jun", vendas: 9500, clientes: 420 },
];

const salesData = [
  { name: "Seg", valor: 1200 },
  { name: "Ter", valor: 1800 },
  { name: "Qua", valor: 1500 },
  { name: "Qui", valor: 2400 },
  { name: "Sex", valor: 2800 },
  { name: "Sab", valor: 1900 },
  { name: "Dom", valor: 900 },
];

const customerData = [
  { name: "Seg", valor: 10 },
  { name: "Ter", valor: 15 },
  { name: "Qua", valor: 18 },
  { name: "Qui", valor: 24 },
  { name: "Sex", valor: 28 },
  { name: "Sab", valor: 12 },
  { name: "Dom", valor: 5 },
];

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
  }
};

export const Dashboard = () => {
  const [period, setPeriod] = useState("mensal");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("1");

  const currentData = dailySalesData[selectedYear]?.[selectedMonth] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard de Vendas</h1>
        <div className="flex space-x-2">
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-white border rounded-md px-3 py-1.5 text-sm"
          >
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
            <option value="anual">Anual</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-primary/20 p-2 rounded-full">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
              <h3 className="text-2xl font-bold">R$ 24.875,50</h3>
              <div className="flex items-center mt-1 text-xs">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+12,2%</span>
                <span className="text-muted-foreground ml-1">desde o último período</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Vendas Totais</p>
              <h3 className="text-2xl font-bold">1.489</h3>
              <div className="flex items-center mt-1 text-xs">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+8,4%</span>
                <span className="text-muted-foreground ml-1">desde o último período</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Novos Clientes</p>
              <h3 className="text-2xl font-bold">358</h3>
              <div className="flex items-center mt-1 text-xs">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+5,2%</span>
                <span className="text-muted-foreground ml-1">desde o último período</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-red-100 p-2 rounded-full">
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold">3,2%</h3>
              <div className="flex items-center mt-1 text-xs">
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                <span className="text-red-600 font-medium">-0,8%</span>
                <span className="text-muted-foreground ml-1">desde o último período</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas vs Clientes</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="vendas" fill="#C6BA77" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="clientes" fill="#150640" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendas por Período</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C6BA77" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#C6BA77" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="valor" stroke="#C6BA77" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vendas Diárias</CardTitle>
          <div className="flex gap-2">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white border rounded-md px-3 py-1.5 text-sm"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white border rounded-md px-3 py-1.5 text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month.toString()}>
                  {format(new Date(2024, month - 1), 'MMMM')}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`R$ ${value}`, 'Vendas']}
              />
              <Bar 
                dataKey="sales" 
                fill="#C6BA77" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Últimas Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">Cliente {index + 1}</p>
                      <p className="text-xs text-gray-500">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {(Math.random() * 1000).toFixed(2)}</p>
                    <p className="text-xs text-green-600">Completo</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Novos Clientes</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#150640" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

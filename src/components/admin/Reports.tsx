
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
  PieChart,
  Pie,
  Cell,
  Legend 
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

const monthlyData = [
  { name: "Jan", valor: 12000 },
  { name: "Fev", valor: 9000 },
  { name: "Mar", valor: 15000 },
  { name: "Abr", valor: 18000 },
  { name: "Mai", valor: 14000 },
  { name: "Jun", valor: 21000 },
  { name: "Jul", valor: 25000 },
  { name: "Ago", valor: 22000 },
  { name: "Set", valor: 28000 },
  { name: "Out", valor: 24000 },
  { name: "Nov", valor: 32000 },
  { name: "Dez", valor: 38000 },
];

const productData = [
  { name: "Produto A", valor: 35 },
  { name: "Produto B", valor: 25 },
  { name: "Produto C", valor: 20 },
  { name: "Produto D", valor: 15 },
  { name: "Outros", valor: 5 },
];

const COLORS = ["#C6BA77", "#150640", "#8884d8", "#82ca9d", "#ffc658"];

export const Reports = () => {
  const [reportType, setReportType] = useState("vendas");
  const [reportPeriod, setReportPeriod] = useState("anual");
  
  return (
    <div className="space-y-6">
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

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Relatório de Vendas por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, "Valor"]} />
                <Bar dataKey="valor" fill="#C6BA77" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value}%`, "Percentual"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo do Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-500">Total de Vendas</h4>
                <p className="text-2xl font-bold">R$ 258.432,00</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-500">Média Mensal</h4>
                <p className="text-2xl font-bold">R$ 21.536,00</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-500">Crescimento Anual</h4>
                <p className="text-2xl font-bold text-green-600">+18,5%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-500">Total de Transações</h4>
                <p className="text-2xl font-bold">3.642</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico Detalhado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3">Produto</th>
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Valor</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{new Date().toLocaleDateString()}</td>
                    <td className="px-6 py-4">Produto {String.fromCharCode(65 + index)}</td>
                    <td className="px-6 py-4">Cliente {index + 1}</td>
                    <td className="px-6 py-4">R$ {(Math.random() * 1000).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        index % 3 === 0 ? 'bg-green-100 text-green-800' : 
                        index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {index % 3 === 0 ? 'Completo' : index % 3 === 1 ? 'Pendente' : 'Cancelado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

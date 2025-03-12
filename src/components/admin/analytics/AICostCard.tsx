
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, ArrowUpRight, TrendingDown, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const AICostCard = () => {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('monthly');
  
  // Taxa de conversão (em um app real, isso viria de uma API)
  const DOLLAR_TO_BRL = 5.03;
  
  // Dados fictícios sobre gastos com IA
  const metrics = {
    currentMonth: {
      usd: 156.42,
      requests: 12543,
      percentageChange: 23.5,
    },
    previousMonth: {
      usd: 126.65,
      requests: 10235,
    },
    models: [
      { name: "GPT-4o", cost: 95.78, percentage: 61 },
      { name: "GPT-4o-mini", cost: 38.32, percentage: 24 },
      { name: "Claude 3.5 Sonnet", cost: 15.67, percentage: 10 },
      { name: "Outros Modelos", cost: 6.65, percentage: 5 },
    ],
    historicalData: [
      { month: "Jan", cost: 82.14, requests: 5230 },
      { month: "Fev", cost: 96.32, requests: 6458 },
      { month: "Mar", cost: 108.45, requests: 7892 },
      { month: "Abr", cost: 112.68, requests: 8745 },
      { month: "Mai", cost: 120.32, requests: 9654 },
      { month: "Jun", cost: 126.65, requests: 10235 },
      { month: "Jul", cost: 156.42, requests: 12543 },
    ],
    dailyUsage: [
      { day: "Seg", cost: 25.42, requests: 1854 },
      { day: "Ter", cost: 32.16, requests: 2458 },
      { day: "Qua", cost: 28.65, requests: 2123 },
      { day: "Qui", cost: 30.34, requests: 2345 },
      { day: "Sex", cost: 27.53, requests: 2012 },
      { day: "Sáb", cost: 8.65, requests: 645 },
      { day: "Dom", cost: 3.67, requests: 256 },
    ]
  };

  // Cálculos
  const brlCost = metrics.currentMonth.usd * DOLLAR_TO_BRL;
  const previousBrlCost = metrics.previousMonth.usd * DOLLAR_TO_BRL;
  const costPerRequest = metrics.currentMonth.usd / metrics.currentMonth.requests;
  const costIncreaseUSD = metrics.currentMonth.usd - metrics.previousMonth.usd;
  const costIncreaseBRL = costIncreaseUSD * DOLLAR_TO_BRL;
  const isIncrease = metrics.currentMonth.percentageChange > 0;
  
  const chartData = viewMode === 'monthly' ? metrics.historicalData : metrics.dailyUsage;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{payload[0].payload.month || payload[0].payload.day}</p>
          <p><span className="text-primary">Custo:</span> ${payload[0].value.toFixed(2)}</p>
          <p><span className="text-blue-500">Requisições:</span> {payload[1].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Card Principal com Visão Geral */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            Custos com IA
          </CardTitle>
          <CardDescription>
            Análise detalhada de custos com serviços de Inteligência Artificial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-500">Custo Total (USD)</p>
                <h3 className="text-2xl font-bold text-gray-900">${metrics.currentMonth.usd.toFixed(2)}</h3>
                <p className="text-sm text-gray-500 mt-1">≈ R$ {brlCost.toFixed(2)}</p>
              </div>
              <div className={`flex items-center gap-1 ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                {isIncrease ? <ArrowUpRight className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-sm font-medium">
                  {metrics.currentMonth.percentageChange}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-500">Requisições</span>
                </div>
                <p className="text-xl font-bold mt-2">
                  {metrics.currentMonth.requests.toLocaleString()}
                </p>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Custo médio por requisição: ${costPerRequest.toFixed(4)}
                  </p>
                  <p className="text-sm text-gray-500">
                    ≈ R$ {(costPerRequest * DOLLAR_TO_BRL).toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-gray-500">Comparação Mensal</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Mês Atual:</span>
                    <span className="text-sm font-medium">${metrics.currentMonth.usd.toFixed(2)} (R$ {brlCost.toFixed(2)})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Mês Anterior:</span>
                    <span className="text-sm font-medium">${metrics.previousMonth.usd.toFixed(2)} (R$ {previousBrlCost.toFixed(2)})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Diferença:</span>
                    <span className={`text-sm font-medium ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                      +${costIncreaseUSD.toFixed(2)} (R$ {costIncreaseBRL.toFixed(2)})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Custos por Modelo</h4>
              <div className="space-y-3">
                {metrics.models.map((model, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{model.name}</span>
                      <span className="text-sm font-medium">
                        ${model.cost.toFixed(2)} ({model.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          index === 0 ? 'bg-primary' : 
                          index === 1 ? 'bg-blue-500' : 
                          index === 2 ? 'bg-purple-500' : 
                          'bg-gray-400'
                        }`} 
                        style={{ width: `${model.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card com gráfico histórico */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Tendências de Custo</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription>
              Visualização histórica de custos e requisições
            </CardDescription>
            <div className="flex border rounded-md overflow-hidden">
              <button 
                className={`px-3 py-1 text-sm font-medium ${viewMode === 'monthly' ? 'bg-primary text-white' : 'bg-white text-gray-500'}`}
                onClick={() => setViewMode('monthly')}
              >
                Mensal
              </button>
              <button 
                className={`px-3 py-1 text-sm font-medium ${viewMode === 'daily' ? 'bg-primary text-white' : 'bg-white text-gray-500'}`}
                onClick={() => setViewMode('daily')}
              >
                Diário
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={viewMode === 'monthly' ? 'month' : 'day'} />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="cost" 
                  name="Custo (USD)" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="requests" 
                  name="Requisições" 
                  stroke="#82ca9d" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Total Acumulado (USD)</p>
              <p className="text-xl font-bold">
                ${metrics.historicalData.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                ≈ R$ {(metrics.historicalData.reduce((sum, item) => sum + item.cost, 0) * DOLLAR_TO_BRL).toFixed(2)}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Média Mensal (USD)</p>
              <p className="text-xl font-bold">
                ${(metrics.historicalData.reduce((sum, item) => sum + item.cost, 0) / metrics.historicalData.length).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                ≈ R$ {((metrics.historicalData.reduce((sum, item) => sum + item.cost, 0) / metrics.historicalData.length) * DOLLAR_TO_BRL).toFixed(2)}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Total Requisições</p>
              <p className="text-xl font-bold">
                {metrics.historicalData.reduce((sum, item) => sum + item.requests, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICostCard;

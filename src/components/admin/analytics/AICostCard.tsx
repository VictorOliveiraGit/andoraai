
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, ArrowUpRight } from "lucide-react";

interface AICostMetrics {
  currentMonth: {
    usd: number;
    requests: number;
    percentageChange: number;
  };
}

const DOLLAR_TO_BRL = 5.03; // Example fixed rate, in a real app this would come from an API

const AICostCard = () => {
  // Example data - in a real application, this would come from your API
  const metrics: AICostMetrics = {
    currentMonth: {
      usd: 156.42,
      requests: 12543,
      percentageChange: 23.5,
    }
  };

  const brlCost = metrics.currentMonth.usd * DOLLAR_TO_BRL;

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            Custos com AI
          </CardTitle>
          <CardDescription>
            Análise de custos com serviços de Inteligência Artificial
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
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="h-4 w-4" />
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
                <p className="text-sm text-gray-500 mt-1">
                  Custo médio por requisição: ${(metrics.currentMonth.usd / metrics.currentMonth.requests).toFixed(4)}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="text-sm font-medium text-gray-500">Detalhamento</h4>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm">
                    <span className="font-medium">• Processamento de Texto:</span> 65%
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">• Análise de Imagens:</span> 25%
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">• Outros Serviços:</span> 10%
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICostCard;

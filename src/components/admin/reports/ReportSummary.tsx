
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ReportSummary = () => {
  return (
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
  );
};

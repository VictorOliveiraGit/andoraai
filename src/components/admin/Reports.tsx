
import { Card } from "@/components/ui/card";
import { salesData } from "@/config/admin";

export const Reports = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Relatórios de Vendas</h2>
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Vendas Mensais</h3>
        <div className="space-y-4">
          {salesData.map((item) => (
            <div key={item.month} className="flex items-center justify-between p-2 border-b">
              <span>{item.month}</span>
              <span className="font-medium">R$ {item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <p className="font-bold">
            Total: R$ {salesData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
          </p>
        </div>
      </Card>
    </div>
  );
};

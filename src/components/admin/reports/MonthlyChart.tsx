
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

interface MonthData {
  name: string;
  valor: number;
}

interface MonthlyChartProps {
  data: MonthData[];
}

export const MonthlyChart = ({ data }: MonthlyChartProps) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Relatório de Vendas por Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
  );
};

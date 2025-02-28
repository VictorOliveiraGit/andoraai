
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface ProductData {
  name: string;
  valor: number;
}

interface ProductChartProps {
  data: ProductData[];
  colors: string[];
}

export const ProductChart = ({ data, colors }: ProductChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas por Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="valor"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => [`${value}%`, "Percentual"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

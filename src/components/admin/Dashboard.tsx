
import { Card } from "@/components/ui/card";
import { stats } from "@/config/admin";

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <h3 className="text-sm text-gray-500 mb-2">{stat.label}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
};

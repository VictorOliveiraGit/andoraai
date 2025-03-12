
import { Card, CardContent } from "@/components/ui/card";

const AnalyticsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Relatórios</h2>
    <p className="text-gray-500">Análise de dados e relatórios detalhados.</p>
    
    <Card>
      <CardContent className="p-6 flex items-center justify-center">
        <p className="text-muted-foreground">Relatórios detalhados serão exibidos aqui</p>
      </CardContent>
    </Card>
  </div>
);

export default AnalyticsContent;

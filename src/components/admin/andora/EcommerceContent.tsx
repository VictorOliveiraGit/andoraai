
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EcommerceContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">E-commerce</h2>
    <p className="text-gray-500">Gerenciamento de vendas e pedidos online.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral de Vendas</CardTitle>
      </CardHeader>
      <CardContent className="h-80 flex items-center justify-center">
        <p className="text-muted-foreground">Gráfico de vendas será exibido aqui</p>
      </CardContent>
    </Card>
  </div>
);

export default EcommerceContent;

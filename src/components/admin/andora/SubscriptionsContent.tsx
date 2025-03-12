
import { Card, CardContent } from "@/components/ui/card";

const SubscriptionsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Assinaturas</h2>
    <p className="text-gray-500">Gerenciamento de assinaturas e planos.</p>
    
    <Card>
      <CardContent className="p-6 flex items-center justify-center">
        <p className="text-muted-foreground">Conteúdo de assinaturas será exibido aqui</p>
      </CardContent>
    </Card>
  </div>
);

export default SubscriptionsContent;

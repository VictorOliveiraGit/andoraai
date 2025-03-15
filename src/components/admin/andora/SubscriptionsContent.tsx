import { Card, CardContent } from "@/components/ui/card";

const SubscriptionsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Assinaturas</h2>
    <p className="text-gray-500">Gerencie suas assinaturas aqui.</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Card key={item}>
          <CardContent className="p-4">
            <h3 className="font-medium">Assinatura {item}</h3>
            <p className="text-sm text-gray-500 mb-2">Detalhes da assinatura</p>
            <p className="font-bold">R$ {(item * 29.9).toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SubscriptionsContent;

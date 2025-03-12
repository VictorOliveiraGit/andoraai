
import { Card, CardContent } from "@/components/ui/card";

const SecurityContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Segurança</h2>
    <p className="text-gray-500">Configurações de segurança e permissões.</p>
    
    <Card>
      <CardContent className="p-6 flex items-center justify-center">
        <p className="text-muted-foreground">Conteúdo de segurança será exibido aqui</p>
      </CardContent>
    </Card>
  </div>
);

export default SecurityContent;

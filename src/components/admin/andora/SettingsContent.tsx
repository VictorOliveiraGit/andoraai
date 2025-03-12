
import { Card, CardContent } from "@/components/ui/card";

const SettingsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Configurações</h2>
    <p className="text-gray-500">Configurações gerais da plataforma.</p>
    
    <Card>
      <CardContent className="p-6 flex items-center justify-center">
        <p className="text-muted-foreground">Configurações da aplicação serão exibidas aqui</p>
      </CardContent>
    </Card>
  </div>
);

export default SettingsContent;

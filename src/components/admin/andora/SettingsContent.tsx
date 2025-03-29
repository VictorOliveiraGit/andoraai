
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProfileAvatar } from "@/components/admin/ProfileAvatar";
import { ProfileForm } from "@/components/admin/ProfileForm";
import { useAdmin } from "@/contexts/AdminContext";
import { 
  Shield, 
  Globe, 
  Bell, 
  Mail, 
  Smartphone, 
  Moon, 
  Key, 
  Bot, 
  Headset, 
  ServerIcon, 
  Users, 
  Database, 
  LineChart, 
  Calendar, 
  FileLock2, 
  Network, 
  UserCog, 
  BarChart 
} from "lucide-react";

const SettingsContent = () => {
  const { 
    avatar, 
    setAvatar, 
    name, 
    setName, 
    email, 
    setEmail, 
    phone, 
    setPhone 
  } = useAdmin();
  
  // Initialize dark mode from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("pt-BR");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [aiAssistant, setAiAssistant] = useState(true);
  const [supportAccess, setSupportAccess] = useState(false);
  const [dataRetention, setDataRetention] = useState(true);
  const [analyticsTracking, setAnalyticsTracking] = useState(true);
  const [auditLogs, setAuditLogs] = useState(true);
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [apiAccess, setApiAccess] = useState(false);
  const [multitenancy, setMultitenancy] = useState(false);
  
  // Update dark mode effect - save to localStorage and apply to HTML element
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply to HTML element and body
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark', 'bg-gray-900', 'text-white');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark', 'bg-gray-900', 'text-white');
    }

    return () => {
      // No cleanup needed for localStorage
    };
  }, [darkMode]);

  const handleToggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    toast.success(checked ? "Modo escuro ativado!" : "Modo claro ativado!");
  };
  
  const handleSaveGeneralSettings = () => {
    toast.success("Configurações gerais salvas com sucesso!");
  };
  
  const handleSaveNotificationSettings = () => {
    toast.success("Configurações de notificações salvas com sucesso!");
  };
  
  const handleSaveSecuritySettings = () => {
    toast.success("Configurações de segurança salvas com sucesso!");
  };

  const handleSaveSystemSettings = () => {
    toast.success("Configurações do sistema salvas com sucesso!");
  };

  const handleSaveAdvancedSettings = () => {
    toast.success("Configurações avançadas salvas com sucesso!");
  };
  
  return (
    <div className="space-y-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold">Configurações</h2>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-1 mb-4 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="profile" className="dark:text-gray-200 dark:data-[state=active]:bg-gray-700">Perfil</TabsTrigger>
          <TabsTrigger value="general" className="dark:text-gray-200 dark:data-[state=active]:bg-gray-700">Geral</TabsTrigger>
          <TabsTrigger value="notifications" className="dark:text-gray-200 dark:data-[state=active]:bg-gray-700">Notificações</TabsTrigger>
          <TabsTrigger value="security" className="dark:text-gray-200 dark:data-[state=active]:bg-gray-700">Segurança</TabsTrigger>
          <TabsTrigger value="system" className="dark:text-gray-200 dark:data-[state=active]:bg-gray-700">Sistema</TabsTrigger>
          <TabsTrigger value="advanced" className="dark:text-gray-200 dark:data-[state=active]:bg-gray-700">Avançado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="p-6 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            <div className="space-y-6">
              <ProfileAvatar 
                avatar={avatar}
                setAvatar={setAvatar}
              />
              <ProfileForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
              />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="general">
          <Card className="p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 dark:text-white">Configurações Gerais</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Moon size={18} className="text-muted-foreground dark:text-gray-300" />
                        <Label className="dark:text-white">Modo Escuro</Label>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Ative para usar o tema escuro no painel admin
                      </p>
                    </div>
                    <Switch 
                      checked={darkMode}
                      onCheckedChange={handleToggleDarkMode}
                      aria-label="Ativar modo escuro"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe size={18} className="text-muted-foreground dark:text-gray-300" />
                      <Label htmlFor="language" className="dark:text-white">Idioma</Label>
                    </div>
                    <select 
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Smartphone size={18} className="text-muted-foreground dark:text-gray-300" />
                      <Label htmlFor="timezone" className="dark:text-white">Fuso Horário</Label>
                    </div>
                    <select 
                      id="timezone"
                      className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                      <option value="America/New_York">New York (GMT-4)</option>
                      <option value="Europe/London">London (GMT+1)</option>
                      <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-muted-foreground dark:text-gray-300" />
                        <Label className="dark:text-white">Formato de Data</Label>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Escolha o formato de data preferido
                      </p>
                    </div>
                    <select 
                      className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="dd/mm/yyyy">DD/MM/AAAA</option>
                      <option value="mm/dd/yyyy">MM/DD/AAAA</option>
                      <option value="yyyy-mm-dd">AAAA-MM-DD</option>
                    </select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSaveGeneralSettings}
                  className="w-full mt-6 dark:bg-primary dark:text-white"
                >
                  Salvar Configurações Gerais
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Configurações de Notificações</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Mail size={18} className="text-muted-foreground" />
                        <Label>Notificações por Email</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receba atualizações importantes por email
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      aria-label="Ativar notificações por email"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Smartphone size={18} className="text-muted-foreground" />
                        <Label>Notificações por SMS</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receba alertas urgentes por SMS
                      </p>
                    </div>
                    <Switch 
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                      aria-label="Ativar notificações por SMS"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Bell size={18} className="text-muted-foreground" />
                        <Label>Notificações no Sistema</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receba notificações dentro do painel
                      </p>
                    </div>
                    <Switch 
                      defaultChecked={true}
                      aria-label="Ativar notificações no sistema"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSaveNotificationSettings}
                  className="w-full mt-6"
                >
                  Salvar Configurações de Notificações
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Configurações de Segurança</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Key size={18} className="text-muted-foreground" />
                      <Label htmlFor="current-password">Senha Atual</Label>
                    </div>
                    <Input 
                      id="current-password"
                      type="password"
                      placeholder="Digite sua senha atual"
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input 
                      id="new-password"
                      type="password"
                      placeholder="Digite uma nova senha"
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input 
                      id="confirm-password"
                      type="password"
                      placeholder="Confirme sua nova senha"
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Shield size={18} className="text-muted-foreground" />
                        <Label>Autenticação de Dois Fatores</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Reforça a segurança com verificação adicional
                      </p>
                    </div>
                    <Switch 
                      checked={twoFactorAuth}
                      onCheckedChange={setTwoFactorAuth}
                      aria-label="Ativar autenticação de dois fatores"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <FileLock2 size={18} className="text-muted-foreground" />
                        <Label>Login Único (SSO)</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Permite login através de provedores externos
                      </p>
                    </div>
                    <Switch 
                      checked={ssoEnabled}
                      onCheckedChange={setSsoEnabled}
                      aria-label="Ativar SSO"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSaveSecuritySettings}
                  className="w-full mt-6"
                >
                  Atualizar Configurações de Segurança
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Configurações do Sistema</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <ServerIcon size={18} className="text-muted-foreground" />
                        <Label>Backup Automático</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Realiza backup automático dos dados diariamente
                      </p>
                    </div>
                    <Switch 
                      checked={autoBackup}
                      onCheckedChange={setAutoBackup}
                      aria-label="Ativar backup automático"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Bot size={18} className="text-muted-foreground" />
                        <Label>Assistente IA</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ativa o assistente de inteligência artificial
                      </p>
                    </div>
                    <Switch 
                      checked={aiAssistant}
                      onCheckedChange={setAiAssistant}
                      aria-label="Ativar assistente IA"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Headset size={18} className="text-muted-foreground" />
                        <Label>Acesso ao Suporte</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Permite acesso ao suporte técnico remoto
                      </p>
                    </div>
                    <Switch 
                      checked={supportAccess}
                      onCheckedChange={setSupportAccess}
                      aria-label="Permitir acesso ao suporte"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Database size={18} className="text-muted-foreground" />
                        <Label>Retenção de Dados</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Armazena histórico completo de dados
                      </p>
                    </div>
                    <Switch 
                      checked={dataRetention}
                      onCheckedChange={setDataRetention}
                      aria-label="Ativar retenção de dados"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-muted-foreground" />
                      <Label htmlFor="user-limit">Limite de Usuários</Label>
                    </div>
                    <select 
                      id="user-limit"
                      className="w-full p-2 border rounded-md bg-white"
                    >
                      <option value="5">5 usuários</option>
                      <option value="10">10 usuários</option>
                      <option value="20">20 usuários</option>
                      <option value="unlimited">Ilimitado</option>
                    </select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSaveSystemSettings}
                  className="w-full mt-6"
                >
                  Salvar Configurações do Sistema
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Configurações Avançadas</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <LineChart size={18} className="text-muted-foreground" />
                        <Label>Rastreamento de Analytics</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Coleta dados de uso para analytics
                      </p>
                    </div>
                    <Switch 
                      checked={analyticsTracking}
                      onCheckedChange={setAnalyticsTracking}
                      aria-label="Ativar analytics"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <BarChart size={18} className="text-muted-foreground" />
                        <Label>Logs de Auditoria</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Registra todas as ações de usuários
                      </p>
                    </div>
                    <Switch 
                      checked={auditLogs}
                      onCheckedChange={setAuditLogs}
                      aria-label="Ativar logs de auditoria"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Network size={18} className="text-muted-foreground" />
                        <Label>Acesso à API</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Permite integração com sistemas externos
                      </p>
                    </div>
                    <Switch 
                      checked={apiAccess}
                      onCheckedChange={setApiAccess}
                      aria-label="Permitir acesso à API"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <UserCog size={18} className="text-muted-foreground" />
                        <Label>Multi-tenancy</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Suporte para múltiplas organizações
                      </p>
                    </div>
                    <Switch 
                      checked={multitenancy}
                      onCheckedChange={setMultitenancy}
                      aria-label="Ativar multi-tenancy"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ServerIcon size={18} className="text-muted-foreground" />
                      <Label htmlFor="cache-config">Configuração de Cache</Label>
                    </div>
                    <select 
                      id="cache-config"
                      className="w-full p-2 border rounded-md bg-white"
                    >
                      <option value="none">Sem cache</option>
                      <option value="minimal">Mínimo (1 hora)</option>
                      <option value="standard">Padrão (6 horas)</option>
                      <option value="aggressive">Agressivo (24 horas)</option>
                    </select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSaveAdvancedSettings}
                  className="w-full mt-6"
                >
                  Salvar Configurações Avançadas
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsContent;

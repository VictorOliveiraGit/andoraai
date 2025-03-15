
import { useState } from "react";
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
import { Shield, Globe, Bell, Mail, Smartphone, Moon, Sun, Key } from "lucide-react";

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
  
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("pt-BR");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  const handleSaveGeneralSettings = () => {
    toast.success("Configurações gerais salvas com sucesso!");
  };
  
  const handleSaveNotificationSettings = () => {
    toast.success("Configurações de notificações salvas com sucesso!");
  };
  
  const handleSaveSecuritySettings = () => {
    toast.success("Configurações de segurança salvas com sucesso!");
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configurações</h2>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="p-6">
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
        
        {/* General Tab */}
        <TabsContent value="general">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Configurações Gerais</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Moon size={18} className="text-muted-foreground" />
                        <Label>Modo Escuro</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ative para usar o tema escuro no painel admin
                      </p>
                    </div>
                    <Switch 
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                      aria-label="Ativar modo escuro"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe size={18} className="text-muted-foreground" />
                      <Label htmlFor="language">Idioma</Label>
                    </div>
                    <select 
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Smartphone size={18} className="text-muted-foreground" />
                      <Label htmlFor="timezone">Fuso Horário</Label>
                    </div>
                    <select 
                      id="timezone"
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                      <option value="America/New_York">New York (GMT-4)</option>
                      <option value="Europe/London">London (GMT+1)</option>
                      <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                    </select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSaveGeneralSettings}
                  className="w-full mt-6"
                >
                  Salvar Configurações Gerais
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="p-6">
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
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="p-6">
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
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input 
                      id="new-password"
                      type="password"
                      placeholder="Digite uma nova senha"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input 
                      id="confirm-password"
                      type="password"
                      placeholder="Confirme sua nova senha"
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
      </Tabs>
    </div>
  );
};

export default SettingsContent;

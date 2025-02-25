import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Bell,
  LogOut,
  User,
  Mail,
  Phone,
  Upload,
  UserCheck,
  UserX,
  Link as LinkIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [avatar, setAvatar] = useState("/placeholder.svg");
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [phone, setPhone] = useState("(00) 00000-0000");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Usuários", icon: Users },
    { id: "reports", label: "Relatórios", icon: FileText },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  const users = [
    { id: 1, name: "João Silva", email: "joao@example.com", active: true },
    { id: 2, name: "Maria Santos", email: "maria@example.com", active: false },
    { id: 3, name: "Pedro Costa", email: "pedro@example.com", active: true },
  ];

  const salesData = [
    { month: "Janeiro", value: 12500 },
    { month: "Fevereiro", value: 15000 },
    { month: "Março", value: 18000 },
    { month: "Abril", value: 16500 },
  ];

  const notifications = [
    { id: 1, message: "Nova mensagem de contato", time: "5 min atrás" },
    { id: 2, message: "Relatório mensal disponível", time: "1 hora atrás" },
    { id: 3, message: "Atualização do sistema", time: "2 horas atrás" },
  ];

  const stats = [
    { label: "Total de Usuários", value: "1,234" },
    { label: "Visitas Hoje", value: "456" },
    { label: "Mensagens", value: "89" },
    { label: "Relatórios", value: "12" },
  ];

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        toast.success("Avatar atualizado com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleActivateUser = (userId: number) => {
    toast.success("Link de ativação enviado com sucesso!");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${user.active ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleActivateUser(user.id)}
                      className="flex items-center gap-2"
                    >
                      {user.active ? <UserCheck className="text-green-500" /> : <UserX className="text-red-500" />}
                      <LinkIcon size={16} />
                      Enviar Link
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case "reports":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Relatórios de Vendas</h2>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Vendas Mensais</h3>
              <div className="space-y-4">
                {salesData.map((item) => (
                  <div key={item.month} className="flex items-center justify-between p-2 border-b">
                    <span>{item.month}</span>
                    <span className="font-medium">R$ {item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="font-bold">
                  Total: R$ {salesData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
                </p>
              </div>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Configurações da Conta</h2>
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full" />
                  <div>
                    <Button variant="outline" className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="mr-2" size={20} />
                      Alterar Avatar
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <div className="flex items-center gap-2">
                      <User size={20} className="text-gray-500" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <div className="flex items-center gap-2">
                      <Mail size={20} className="text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone</label>
                    <div className="flex items-center gap-2">
                      <Phone size={20} className="text-gray-500" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => toast.success("Configurações salvas com sucesso!")}
                    className="w-full mt-4"
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <img src={avatar} alt="Logo" className="w-8 h-8 rounded-full" />
            <span className="text-xl font-bold">{name}</span>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="mr-2" size={20} />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" size={20} />
            Sair
          </Button>
        </div>
      </div>

      <div className="ml-64 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

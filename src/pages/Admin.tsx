
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Usuários", icon: Users },
    { id: "reports", label: "Relatórios", icon: FileText },
    { id: "settings", label: "Configurações", icon: Settings },
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <img 
              src="/placeholder.svg"
              alt="Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">Admin</span>
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
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
            <LogOut className="mr-2" size={20} />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Bem-vindo, Admin</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="flex items-center gap-2">
              <img
                src="/placeholder.svg"
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-sm text-gray-500 mb-2">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Atividades Recentes</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
                >
                  <Bell className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-sm">{notification.message}</p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full">
                <Users className="mr-2" size={20} />
                Novo Usuário
              </Button>
              <Button className="w-full">
                <FileText className="mr-2" size={20} />
                Novo Relatório
              </Button>
              <Button className="w-full">
                <Bell className="mr-2" size={20} />
                Notificações
              </Button>
              <Button className="w-full">
                <Settings className="mr-2" size={20} />
                Configurações
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

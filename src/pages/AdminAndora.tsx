/**
 * Admin Andora Dashboard Page
 * 
 * This component serves as the main container for the Andora admin dashboard,
 * providing a premium admin experience with enhanced visual design.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import AICostCard from "@/components/admin/analytics/AICostCard";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  BarChart4, 
  ShieldCheck,
  CreditCard,
  Package,
  ShoppingCart,
  Menu,
  Bell,
  Calendar,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { format } from "date-fns";

// Admin Andora navigation items
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart },
  { id: "products", label: "Produtos", icon: Package },
  { id: "users", label: "Usuários", icon: Users },
  { id: "subscriptions", label: "Assinaturas", icon: CreditCard },
  { id: "security", label: "Segurança", icon: ShieldCheck },
  { id: "analytics", label: "Analytics", icon: BarChart4 },
  { id: "settings", label: "Configurações", icon: Settings },
];

// Daily sales data by year and month
const dailySalesData = {
  "2024": {
    "1": [
      { day: "Segunda", sales: 1500 },
      { day: "Terça", sales: 2200 },
      { day: "Quarta", sales: 1800 },
      { day: "Quinta", sales: 2500 },
      { day: "Sexta", sales: 3000 },
      { day: "Sábado", sales: 2800 },
      { day: "Domingo", sales: 1200 },
    ],
    "2": [
      { day: "Segunda", sales: 1700 },
      { day: "Terça", sales: 2400 },
      { day: "Quarta", sales: 2100 },
      { day: "Quinta", sales: 2700 },
      { day: "Sexta", sales: 3200 },
      { day: "Sábado", sales: 2600 },
      { day: "Domingo", sales: 1400 },
    ],
    "3": [
      { day: "Segunda", sales: 1900 },
      { day: "Terça", sales: 2600 },
      { day: "Quarta", sales: 2300 },
      { day: "Quinta", sales: 2900 },
      { day: "Sexta", sales: 3400 },
      { day: "Sábado", sales: 2700 },
      { day: "Domingo", sales: 1500 },
    ],
  },
  "2023": {
    "12": [
      { day: "Segunda", sales: 1400 },
      { day: "Terça", sales: 2000 },
      { day: "Quarta", sales: 1600 },
      { day: "Quinta", sales: 2300 },
      { day: "Sexta", sales: 2800 },
      { day: "Sábado", sales: 2500 },
      { day: "Domingo", sales: 1100 },
    ],
    "11": [
      { day: "Segunda", sales: 1300 },
      { day: "Terça", sales: 1900 },
      { day: "Quarta", sales: 1500 },
      { day: "Quinta", sales: 2200 },
      { day: "Sexta", sales: 2700 },
      { day: "Sábado", sales: 2400 },
      { day: "Domingo", sales: 1000 },
    ],
  }
};

/**
 * AdminAndora Component
 * 
 * Premium admin dashboard for Andora with enhanced visual design
 * and fully responsive layout for any screen size.
 */
const AdminAndora = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };
  
  // Toggle sidebar on mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Render sidebar/navigation
  const renderSidebar = () => {
    // Don't render sidebar on mobile - use bottom nav instead
    if (isMobile) return null;
    
    return (
      <div className={cn(
        "h-screen bg-gradient-to-b from-primary/95 to-primary transition-all duration-300 overflow-y-auto",
        "fixed top-0 left-0 z-30 w-64 shadow-lg",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
      )}>
        {/* Logo Section */}
        <div className="p-6 flex justify-between items-center">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold text-white">Andora Admin</h1>
          ) : (
            <h1 className="text-xl font-bold text-white">A</h1>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-white hover:bg-white/10"
          >
            <Menu size={20} />
          </Button>
        </div>
        
        {/* Nav Links */}
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "flex items-center w-full px-3 py-2.5 rounded-lg transition-all",
                      "hover:bg-white/10",
                      isActive 
                        ? "bg-white/20 text-white" 
                        : "text-white/80"
                    )}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {isSidebarOpen && (
                      <span className="ml-3 transition-opacity duration-200">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Logout Button */}
        {isSidebarOpen && (
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full border border-white/10 text-white hover:bg-white/10 justify-start"
            >
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Render mobile bottom navigation
  const renderMobileNav = () => {
    if (!isMobile) return null;
    
    return (
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden overflow-x-auto">
        <div className="flex whitespace-nowrap">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "flex flex-col items-center py-2 px-4",
                  isActive ? "text-primary" : "text-gray-500"
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    "mb-1",
                    isActive ? "text-primary" : "text-gray-500"
                  )}
                />
                <span className={cn(
                  "text-xs",
                  isActive ? "text-primary font-medium" : "text-gray-500"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Render main content based on active section
  const renderContent = () => {
    switch(activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "ecommerce":
        return <EcommerceContent />;
      case "products": 
        return <ProductsContent />;
      case "users":
        return <UsersContent />;
      case "subscriptions":
        return <SubscriptionsContent />;
      case "security":
        return <SecurityContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="admin-andora">
      {/* Render sidebar for tablet/desktop */}
      {renderSidebar()}
      
      {/* Main content */}
      <div className={cn(
        "min-h-screen bg-gray-50 transition-all duration-300",
        isMobile 
          ? "pb-20" // Add padding for mobile bottom nav
          : isSidebarOpen
            ? "md:ml-64" 
            : "md:ml-20"
      )}>
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          {isMobile && (
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="md:hidden"
              >
                <Menu size={24} />
              </Button>
              <h1 className="text-lg font-bold ml-2">Andora Admin</h1>
            </div>
          )}
          
          {!isMobile && (
            <div>
              <h2 className="text-lg font-medium">{navItems.find(item => item.id === activeSection)?.label}</h2>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            
            {!isMobile && (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <LogOut size={16} />
                Sair
              </Button>
            )}
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-4 md:p-6 lg:p-8">
          {renderContent()}
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      {renderMobileNav()}
    </div>
  );
};

// Section Content Components
const DashboardContent = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("1");

  const currentData = dailySalesData[selectedYear]?.[selectedMonth] || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R$ 159.327,00</p>
            <p className="text-sm opacity-80 mt-1">+18% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary/90 to-secondary/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Novos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">845</p>
            <p className="text-sm opacity-80 mt-1">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Assinaturas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2.156</p>
            <p className="text-sm text-muted-foreground mt-1">+5% em relação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Sales Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vendas Diárias</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent text-sm font-medium border-none focus:outline-none"
              >
                {Object.keys(dailySalesData).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-sm font-medium border-none focus:outline-none"
              >
                {Object.keys(dailySalesData[selectedYear] || {}).map((month) => (
                  <option key={month} value={month}>
                    {format(new Date(2024, parseInt(month) - 1), 'MMMM')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={currentData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`R$ ${value}`, 'Vendas']}
                labelFormatter={(label) => `Dia: ${label}`}
              />
              <Bar 
                dataKey="sales" 
                fill="#C6BA77" 
                radius={[4, 4, 0, 0]}
                name="Vendas"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users size={16} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Novo usuário registrado</h4>
                    <p className="text-sm text-gray-500">João Silva criou uma conta</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {item}h atrás
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Metas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Vendas</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Novos Usuários</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Receita de Assinaturas</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Placeholder content for other sections
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

const ProductsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Produtos</h2>
    <p className="text-gray-500">Gerencie o catálogo de produtos da sua loja.</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Card key={item}>
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <Package className="h-10 w-10 text-gray-400" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium">Produto {item}</h3>
            <p className="text-sm text-gray-500 mb-2">Categoria</p>
            <p className="font-bold">R$ {(item * 99.9).toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const UsersContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Usuários</h2>
    <p className="text-gray-500">Gerencie usuários e permissões do sistema.</p>
    
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Função</th>
                <th className="text-left p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="p-4">Usuário {item}</td>
                  <td className="p-4">usuario{item}@email.com</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Ativo
                    </span>
                  </td>
                  <td className="p-4">Admin</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Placeholder components for other sections
const SubscriptionsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Assinaturas</h2>
    <p className="text-gray-500">Gerencie planos e assinaturas de usuários.</p>
  </div>
);

const SecurityContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Segurança</h2>
    <p className="text-gray-500">Configure opções de segurança e permissões.</p>
  </div>
);

// Atualização do componente Analytics
const AnalyticsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Analytics</h2>
    <p className="text-gray-500">Visualize estatísticas e métricas do sistema.</p>
    
    {/* AICostCard Component */}
    <AICostCard />
    
    {/* Outros cartões de análise podem ser adicionados aqui */}
  </div>
);

const SettingsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Configurações</h2>
    <p className="text-gray-500">Configure as preferências do sistema.</p>
  </div>
);

export default AdminAndora;

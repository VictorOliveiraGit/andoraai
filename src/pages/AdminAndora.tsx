
/**
 * Admin Andora Dashboard Page
 * 
 * This component serves as the main container for the Andora admin dashboard,
 * with a layout similar to AdminUsuario but keeping Andora specific content.
 */

import { Sidebar } from "@/components/admin/Sidebar";
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
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MobileNavbar } from "@/components/admin/MobileNavbar";

/**
 * AdminAndoraContent Component
 * 
 * Handles the main content area of the admin andora dashboard based on 
 * the active section selected in the sidebar.
 * 
 * @returns {JSX.Element} The rendered AdminAndoraContent component
 */
const AdminAndoraContent = () => {
  const { 
    activeSection, 
    isSidebarOpen, 
    setIsSidebarOpen 
  } = useAdmin();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  /**
   * Renders the appropriate component based on the active section
   * @returns {JSX.Element} The component for the active section
   */
  const renderContent = () => {
    switch(activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "sales":
      case "ecommerce":
        return <EcommerceContent />;
      case "products": 
        return <ProductsContent />;
      case "users":
        return <UsersContent />;
      case "subscription":
      case "subscriptions":
        return <SubscriptionsContent />;
      case "security":
        return <SecurityContent />;
      case "reports":
      case "analytics":
        return <AnalyticsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  /**
   * Handles user logout
   * Displays a success message and redirects to homepage
   */
  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  /**
   * Toggle sidebar on mobile view
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 h-full w-full ${
          isSidebarOpen && !isMobile ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {/* Mobile Header with menu toggle and logout */}
        <div className="sticky top-0 z-30 bg-white p-4 md:hidden flex justify-between items-center shadow-sm">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu size={24} />
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
            onClick={handleLogout}
            size="sm"
          >
            <LogOut size={16} />
            Sair
          </Button>
        </div>

        {/* Content Container with scrollable area */}
        <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <div className="p-4 md:p-6 lg:p-8">
            {/* Desktop Logout Button (hidden on mobile) */}
            <div className="hidden md:flex justify-end mb-6">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Sair
              </Button>
            </div>
            
            {/* Rendered Content Based on Active Section */}
            <div className="pb-20 md:pb-8">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navbar */}
        {isMobile && <MobileNavbar />}
      </div>
    </div>
  );
};

/**
 * AdminAndora Component
 * 
 * Wraps the AdminAndoraContent component with AdminProvider to provide
 * context for admin-related state management.
 * 
 * @returns {JSX.Element} The rendered AdminAndora component
 */
const AdminAndora = () => {
  return (
    <AdminProvider>
      <div className="admin-andora">
        <AdminAndoraContent />
      </div>
    </AdminProvider>
  );
};

// Section Content Components
const DashboardContent = () => (
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

const AnalyticsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Analytics</h2>
    <p className="text-gray-500">Visualize estatísticas e métricas do sistema.</p>
  </div>
);

const SettingsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Configurações</h2>
    <p className="text-gray-500">Configure as preferências do sistema.</p>
  </div>
);

export default AdminAndora;

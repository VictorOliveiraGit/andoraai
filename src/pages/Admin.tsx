
/**
 * Admin Usuario Page
 * 
 * This component serves as the main container for the admin user dashboard,
 * integrating all admin-related components and managing the layout.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { cn } from "@/lib/utils";
import { Dashboard } from "@/components/admin/Dashboard";
import { UserManagement } from "@/components/admin/UserManagement";
import { Reports } from "@/components/admin/Reports";
import { Settings as SettingsComponent } from "@/components/admin/Settings";
import { Subscription } from "@/components/admin/Subscription";
import { Sales } from "@/components/admin/Sales";
import { Products } from "@/components/admin/Products";
import { Customers } from "@/components/admin/Customers";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";

// Admin Usuario navigation items
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Usuários", icon: Users },
  { id: "reports", label: "Relatórios", icon: BarChart4 },
  { id: "subscription", label: "Assinaturas", icon: CreditCard },
  { id: "sales", label: "Vendas", icon: ShoppingCart },
  { id: "products", label: "Produtos", icon: Package },
  { id: "customers", label: "Clientes", icon: Users },
  { id: "settings", label: "Configurações", icon: Settings },
];

/**
 * AdminContent Component
 * 
 * Handles the main content area of the admin dashboard based on 
 * the active section selected in the sidebar.
 */
const AdminContent = () => {
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

  // Render content based on active section
  const renderContent = () => {
    switch(activeSection) {
      case "users":
        return <UserManagement />;
      case "reports":
        return <Reports />;
      case "subscription":
        return <Subscription />;
      case "sales":
        return <Sales />;
      case "products":
        return <Products />;
      case "customers":
        return <Customers />;
      case "settings":
        return <SettingsComponent />;
      default:
        return <Dashboard />;
    }
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
            <h1 className="text-xl font-bold text-white">Admin Usuario</h1>
          ) : (
            <h1 className="text-xl font-bold text-white">A</h1>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-white hover:bg-white/10 md:hidden"
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
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="flex flex-col items-center py-2 flex-1"
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

  return (
    <div className="admin-page">
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
              <h1 className="text-lg font-bold ml-2">Admin Usuario</h1>
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

/**
 * AdminUsuario Component
 * 
 * Main component for the AdminUsuario page.
 */
const AdminUsuario = () => {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
};

export default AdminUsuario;

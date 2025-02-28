
/**
 * Admin Dashboard Page
 * 
 * This component serves as the main container for the admin dashboard,
 * integrating all admin-related components and managing the layout.
 */

import { Sidebar } from "@/components/admin/Sidebar";
import { Dashboard } from "@/components/admin/Dashboard";
import { UserManagement } from "@/components/admin/UserManagement";
import { Reports } from "@/components/admin/Reports";
import { Settings } from "@/components/admin/Settings";
import { Subscription } from "@/components/admin/Subscription";
import { Sales } from "@/components/admin/Sales";
import { Products } from "@/components/admin/Products";
import { Customers } from "@/components/admin/Customers";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 * AdminContent Component
 * 
 * Handles the main content area of the admin dashboard based on 
 * the active section selected in the sidebar.
 * 
 * @returns {JSX.Element} The rendered AdminContent component
 */
const AdminContent = () => {
  const { 
    activeSection, 
    isSidebarOpen, 
    setIsSidebarOpen 
  } = useAdmin();
  const navigate = useNavigate();

  /**
   * Renders the appropriate component based on the active section
   * @returns {JSX.Element} The component for the active section
   */
  const renderContent = () => {
    switch (activeSection) {
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
        return <Settings />;
      default:
        return <Dashboard />;
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

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {/* Content Container with scrollable area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">
            {/* Logout Button */}
            <div className="flex justify-end mb-6">
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
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * AdminDashboard Component
 * 
 * Wraps the AdminContent component with AdminProvider to provide
 * context for admin-related state management.
 * 
 * @returns {JSX.Element} The rendered AdminDashboard component
 */
const AdminDashboard = () => {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
};

export default AdminDashboard;

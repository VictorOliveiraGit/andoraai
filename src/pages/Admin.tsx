
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
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavbar } from "@/components/admin/MobileNavbar";

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
  const isMobile = useIsMobile();

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

  /**
   * Toggle sidebar on mobile view
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100 overflow-hidden">
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

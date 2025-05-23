
/**
 * Admin Andora Dashboard Page
 * 
 * This component serves as the main container for the Andora admin dashboard,
 * providing a premium admin experience with enhanced visual design.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { menuItems } from "@/config/admin";
import { AdminProvider } from "@/contexts/AdminContext";

// Import content components
import DashboardContent from "@/components/admin/andora/DashboardContent";
import EcommerceContent from "@/components/admin/andora/EcommerceContent";
import SecurityContent from "@/components/admin/andora/SecurityContent";
import AnalyticsContent from "@/components/admin/andora/AnalyticsContent";
import SettingsContent from "@/components/admin/andora/SettingsContent";

// Import navigation components
import AndoraSidebar from "@/components/admin/andora/AndoraSidebar";
import AndoraMobileNav from "@/components/admin/andora/AndoraMobileNav";

/**
 * AdminAndora Component
 * 
 * Premium admin dashboard for Andora with enhanced visual design
 * and fully responsive layout for any screen size.
 */
const AdminAndora = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    toast({
      title: "Sucesso",
      description: "Logout realizado com sucesso!",
      closable: true,
    });
    navigate("/");
  };
  
  // Toggle sidebar on mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Select section and close drawer
  const selectSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsDrawerOpen(false);
  };

  // Render main content based on active section
  const renderContent = () => {
    switch(activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "sales":
        return <EcommerceContent />;
      case "reports":
        return <AnalyticsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  // Filter menu items for Andora (exclude 'agenda', 'users', and 'subscription')
  const andoraMenuItems = menuItems.filter(item => 
    item.id !== 'agenda' && 
    item.id !== 'users' && 
    item.id !== 'subscription'
  );

  return (
    <AdminProvider>
      <div className="admin-andora transition-colors duration-200 min-h-screen bg-white text-gray-900">
        {/* Render sidebar for tablet/desktop */}
        <AndoraSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          handleLogout={handleLogout}
          isMobile={isMobile}
          menuItems={andoraMenuItems}
        />
        
        {/* Main content */}
        <div className={cn(
          "min-h-screen transition-all duration-300 bg-gray-50 text-gray-900",
          isMobile 
            ? "pb-16" // Add padding for mobile bottom nav
            : isSidebarOpen
              ? "md:ml-64" 
              : "md:ml-20"
        )}>
          {/* Top Bar */}
          <div className="sticky top-0 z-20 border-b md:px-8 px-6 py-6 flex justify-between items-center bg-white border-gray-200">
            {isMobile && (
              <div className="flex items-center">
                <h2 className="text-lg font-bold">Andora Admin - {andoraMenuItems.find(item => item.id === activeSection)?.label}</h2>
              </div>
            )}
            {!isMobile && (
              <div>
                <h2 className="text-lg font-bold">{andoraMenuItems.find(item => item.id === activeSection)?.label}</h2>
              </div>
            )}
          </div>
          
          {/* Content Area */}
          <div className="p-4 md:p-6 lg:p-8 bg-gray-50">
            {renderContent()}
          </div>
        </div>
        
        {/* Mobile Bottom Drawer Navigation */}
        <AndoraMobileNav
          activeSection={activeSection}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          selectSection={selectSection}
          handleLogout={handleLogout}
          isMobile={isMobile}
          menuItems={andoraMenuItems}
        />
      </div>
    </AdminProvider>
  );
};

export default AdminAndora;

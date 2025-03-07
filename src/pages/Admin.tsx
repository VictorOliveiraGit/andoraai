
/**
 * Admin Usuario Page
 * 
 * This component serves as the main container for the admin user dashboard,
 * integrating all admin-related components and managing the layout.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { navItems } from "@/constants/adminNavItems";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminContent } from "@/components/admin/AdminContent";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { cn } from "@/lib/utils";

/**
 * AdminContent Component
 * 
 * Handles the main content area of the admin dashboard based on 
 * the active section selected in the sidebar.
 */
const AdminLayout = () => {
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

  return (
    <div className="admin-page">
      {/* Render sidebar for tablet/desktop */}
      <AdminSidebar 
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
        isMobile={isMobile}
      />
      
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
        <AdminHeader 
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          activeSection={activeSection}
          navItems={navItems}
          handleLogout={handleLogout}
        />
        
        {/* Content Area */}
        <AdminContent 
          activeSection={activeSection}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
      
      {/* Mobile Bottom Navigation */}
      <AdminMobileNav 
        isMobile={isMobile}
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
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
      <AdminLayout />
    </AdminProvider>
  );
};

export default AdminUsuario;

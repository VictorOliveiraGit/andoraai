
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Customers } from "@/components/admin/Customers";
import { Sidebar } from "@/components/admin/Sidebar";
import { Dashboard } from "@/components/admin/Dashboard";
import { Users } from "@/components/admin/UserManagement";
import { Reports } from "@/components/admin/Reports";
import { Settings } from "@/components/admin/Settings";
import { Agenda } from "@/components/admin/Agenda";
import { Sales } from "@/components/admin/Sales";
import { Products } from "@/components/admin/Products";
import { Subscription } from "@/components/admin/Subscription";
import { AdminProvider } from "@/contexts/AdminContext";
import { MobileNavbar } from "@/components/admin/MobileNavbar";
import { menuItems } from "@/config/admin";

const AdminAndora = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // On small screens, close sidebar when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [activeSection]);

  // Helper to render the active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "agenda":
        return <Agenda />;
      case "sales":
        return <Sales />;
      case "products":
        return <Products />;
      case "customers":
        return <Customers />;
      case "users":
        return <Users />;
      case "reports":
        return <Reports />;
      case "subscription":
        return <Subscription />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminProvider>
      <div className="flex h-screen overflow-hidden bg-gray-100/40">
        {/* Sidebar for larger screens */}
        <Sidebar
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content area */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          {/* Mobile header */}
          <MobileNavbar 
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            activeSection={activeSection}
          />

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/30">
            <div className="mx-auto max-w-7xl">
              {renderActiveSection()}
            </div>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminAndora;

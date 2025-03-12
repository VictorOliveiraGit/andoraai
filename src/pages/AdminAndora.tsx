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
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [activeSection]);

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
        <Sidebar
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <MobileNavbar 
            isSidebarOpen={isOpen}
            setIsSidebarOpen={setIsOpen}
            activeSection={activeSection}
          />

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

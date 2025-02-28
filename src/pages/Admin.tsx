
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

const AdminContent = () => {
  const { 
    activeSection, 
    isSidebarOpen, 
    setIsSidebarOpen 
  } = useAdmin();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className={`flex-1 w-full overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
        <div className="p-4 md:p-8 pb-24 md:pb-8">
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
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
};

export default AdminDashboard;


import { cn } from "@/lib/utils";
import { Dashboard } from "@/components/admin/Dashboard";
import { UserManagement } from "@/components/admin/UserManagement";
import { Reports } from "@/components/admin/Reports";
import { Settings as SettingsComponent } from "@/components/admin/Settings";
import { Subscription } from "@/components/admin/Subscription";
import { Sales } from "@/components/admin/Sales";
import { Products } from "@/components/admin/Products";
import { Customers } from "@/components/admin/Customers";

interface AdminContentProps {
  activeSection: string;
  isMobile: boolean;
  isSidebarOpen: boolean;
}

export const AdminContent = ({ 
  activeSection, 
  isMobile, 
  isSidebarOpen 
}: AdminContentProps) => {
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

  return (
    <div className={cn(
      "min-h-screen bg-gray-50 transition-all duration-300",
      isMobile 
        ? "pb-20" // Add padding for mobile bottom nav
        : isSidebarOpen
          ? "md:ml-64" 
          : "md:ml-20"
    )}>
      <div className="p-4 md:p-6 lg:p-8">
        {renderContent()}
      </div>
    </div>
  );
};

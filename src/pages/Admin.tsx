
import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Dashboard } from "@/components/admin/Dashboard";
import { UserManagement } from "@/components/admin/UserManagement";
import { Reports } from "@/components/admin/Reports";
import { Settings } from "@/components/admin/Settings";
import { Subscription } from "@/components/admin/Subscription";
import { Sales } from "@/components/admin/Sales";
import { Products } from "@/components/admin/Products";
import { Customers } from "@/components/admin/Customers";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [avatar, setAvatar] = useState("/placeholder.svg");
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [phone, setPhone] = useState("(00) 00000-0000");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        return (
          <Settings
            avatar={avatar}
            setAvatar={setAvatar}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        avatar={avatar}
        name={name}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 sm:ml-64">
        <div className="p-4 sm:p-8 pb-24 sm:pb-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

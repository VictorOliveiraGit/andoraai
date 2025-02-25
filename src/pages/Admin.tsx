
import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Dashboard } from "@/components/admin/Dashboard";
import { UserManagement } from "@/components/admin/UserManagement";
import { Reports } from "@/components/admin/Reports";
import { Settings } from "@/components/admin/Settings";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [avatar, setAvatar] = useState("/placeholder.svg");
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [phone, setPhone] = useState("(00) 00000-0000");

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />;
      case "reports":
        return <Reports />;
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
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        avatar={avatar}
        name={name}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="ml-64 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

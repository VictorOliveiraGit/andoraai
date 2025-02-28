
import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [avatar, setAvatar] = useState("/placeholder.svg");
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [phone, setPhone] = useState("(00) 00000-0000");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        activeSection,
        setActiveSection,
        avatar,
        setAvatar,
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

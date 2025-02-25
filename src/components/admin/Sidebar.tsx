
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { menuItems } from "@/config/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SidebarProps {
  avatar: string;
  name: string;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Sidebar = ({ avatar, name, activeSection, setActiveSection }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <img src={avatar} alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="text-xl font-bold">{name}</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="mr-2" size={20} />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="mr-2" size={20} />
          Sair
        </Button>
      </div>
    </div>
  );
};

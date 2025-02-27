
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { menuItems } from "@/config/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SidebarProps {
  avatar: string;
  name: string;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({ 
  avatar, 
  name, 
  activeSection, 
  setActiveSection,
  isOpen,
  setIsOpen
}: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu Toggle Button - Visible only on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 sm:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white shadow-lg z-40
        w-64 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0
      `}>
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
                onClick={() => {
                  setActiveSection(item.id);
                  if (window.innerWidth < 640) { // 640px is the 'sm' breakpoint
                    setIsOpen(false);
                  }
                }}
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
    </>
  );
};

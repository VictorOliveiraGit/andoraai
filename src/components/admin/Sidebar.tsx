
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { menuItems } from "@/config/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
        variant="secondary"
        size="icon"
        className="fixed bottom-4 right-4 z-50 sm:hidden rounded-full shadow-lg h-12 w-12"
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

      {/* Sidebar for Desktop - Left side */}
      <div className={`
        fixed left-0 top-0 h-full bg-white shadow-lg z-40 w-64
        hidden sm:block
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

      {/* Mobile Navigation Drawer - Bottom */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 bg-white z-40 sm:hidden rounded-t-xl shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] transition-transform duration-300",
        isOpen ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2"></div>
        
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4 p-2">
            <img src={avatar} alt="Logo" className="w-8 h-8 rounded-full" />
            <span className="text-xl font-bold">{name}</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className="flex flex-col items-center justify-center h-20 text-xs px-2"
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
              >
                <item.icon className="mb-1" size={24} />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-4 border-t pt-4">
            <Button 
              variant="ghost" 
              className="flex items-center justify-start w-full text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2" size={20} />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

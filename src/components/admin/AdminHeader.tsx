
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Menu } from "lucide-react";

interface AdminHeaderProps {
  isMobile: boolean;
  toggleSidebar: () => void;
  activeSection: string;
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }>;
  handleLogout: () => void;
}

export const AdminHeader = ({
  isMobile,
  toggleSidebar,
  activeSection,
  navItems,
  handleLogout
}: AdminHeaderProps) => {
  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      {isMobile && (
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu size={24} />
          </Button>
          <h1 className="text-lg font-bold ml-2">Admin Usuario</h1>
        </div>
      )}
      
      {!isMobile && (
        <div>
          <h2 className="text-lg font-medium">{navItems.find(item => item.id === activeSection)?.label}</h2>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        
        {!isMobile && (
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <LogOut size={16} />
            Sair
          </Button>
        )}
      </div>
    </div>
  );
};

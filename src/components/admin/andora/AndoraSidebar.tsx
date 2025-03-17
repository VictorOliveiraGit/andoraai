
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { menuItems as defaultMenuItems } from "@/config/admin";

interface AndoraSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
  isMobile: boolean;
  menuItems?: typeof defaultMenuItems;
}

const AndoraSidebar = ({
  activeSection,
  setActiveSection,
  isSidebarOpen,
  toggleSidebar,
  handleLogout,
  isMobile,
  menuItems = defaultMenuItems
}: AndoraSidebarProps) => {
  if (isMobile) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen",
        "bg-gray-900 text-white transition-all duration-300 overflow-y-auto",
        "z-30 shadow-xl border-r border-gray-800",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      {/* Logo & Brand */}
      <div className="p-6 flex justify-between items-center">
        {isSidebarOpen ? (
          <div className="flex items-center space-x-2">
            <img src="/logo-andora.svg" alt="Andora" className="h-8 w-8" />
            <span className="text-lg font-bold">Andora</span>
          </div>
        ) : (
          <img src="/logo-andora.svg" alt="Andora" className="h-8 w-8 mx-auto" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 rounded-lg transition-all",
                    "hover:bg-gray-800",
                    isActive ? "bg-gray-800 text-white" : "text-gray-400"
                  )}
                >
                  <item.icon size={20} className="shrink-0" />
                  {isSidebarOpen && (
                    <span className="ml-3 transition-opacity duration-200">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full flex items-center justify-start text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <LogOut size={20} className="shrink-0" />
          {isSidebarOpen && <span className="ml-3">Sair</span>}
        </Button>
      </div>
    </div>
  );
};

export default AndoraSidebar;

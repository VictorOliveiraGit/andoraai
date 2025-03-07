
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/contexts/AdminContext";

interface AdminSidebarProps {
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }>;
  activeSection: string;
  setActiveSection: (id: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
  isMobile: boolean;
}

export const AdminSidebar = ({
  navItems,
  activeSection,
  setActiveSection,
  isSidebarOpen,
  toggleSidebar,
  handleLogout,
  isMobile
}: AdminSidebarProps) => {
  // Don't render sidebar on mobile - use bottom nav instead
  if (isMobile) return null;
  
  return (
    <div className={cn(
      "h-screen bg-gradient-to-b from-primary/95 to-primary transition-all duration-300 overflow-y-auto",
      "fixed top-0 left-0 z-30 w-64 shadow-lg",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
    )}>
      {/* Logo Section */}
      <div className="p-6 flex justify-between items-center">
        {isSidebarOpen ? (
          <h1 className="text-xl font-bold text-white">Admin Usuario</h1>
        ) : (
          <h1 className="text-xl font-bold text-white">A</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-white hover:bg-white/10 md:hidden"
        >
          <Menu size={20} />
        </Button>
      </div>
      
      {/* Nav Links */}
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 rounded-lg transition-all",
                    "hover:bg-white/10",
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-white/80"
                  )}
                >
                  <item.icon size={20} className="shrink-0" />
                  {isSidebarOpen && (
                    <span className="ml-3 transition-opacity duration-200">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Logout Button */}
      {isSidebarOpen && (
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full border border-white/10 text-white hover:bg-white/10 justify-start"
          >
            <LogOut size={16} className="mr-2" />
            Sair
          </Button>
        </div>
      )}
    </div>
  );
};

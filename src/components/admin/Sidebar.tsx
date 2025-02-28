
import { useEffect, useRef } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { X, Menu } from "lucide-react";
import { menuItems } from "@/config/admin";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { activeSection, setActiveSection, avatar, name } = useAdmin();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isOpen, setIsOpen]);

  // Handle sidebar visibility on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else if (window.innerWidth < 768 && isOpen) {
        setIsOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, setIsOpen]);

  // Toggle sidebar on menu button click
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Create overlay when sidebar is open on mobile
  const renderOverlay = () => {
    if (isMobile && isOpen && !isMobileSheetMode()) {
      return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      );
    }
    return null;
  };

  // Check if we should use the mobile sheet mode (for devices below certain width)
  const isMobileSheetMode = () => {
    return isMobile && window.innerWidth < 640;
  };

  // Render the sidebar content (used in both desktop sidebar and mobile sheet)
  const renderSidebarContent = () => {
    return (
      <>
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <img
              src={avatar}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-3 object-cover"
            />
            <div>
              <h2 className="font-semibold truncate">{name}</h2>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    className={`w-full text-left flex items-center px-3 py-2 rounded-md transition-colors ${
                      activeSection === item.id
                        ? "bg-gray-100 text-secondary"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (isMobile) setIsOpen(false);
                    }}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </>
    );
  };

  // Render normal sidebar for desktop and larger tablets
  const renderDesktopSidebar = () => {
    return (
      <>
        {renderOverlay()}
        
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`bg-white fixed inset-y-0 left-0 w-64 overflow-y-auto z-30 shadow-md md:shadow-none transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative`}
        >
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}

          {renderSidebarContent()}
        </div>
      </>
    );
  };

  // Render the bottom sheet for small mobile devices
  const renderMobileSheet = () => {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="fixed top-4 left-4 z-50 p-3 rounded-full bg-secondary shadow-lg text-white md:hidden"
            variant="secondary"
            size="icon"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] overflow-y-auto p-0">
          {renderSidebarContent()}
        </SheetContent>
      </Sheet>
    );
  };

  return isMobileSheetMode() ? (
    renderMobileSheet()
  ) : (
    <>
      {renderDesktopSidebar()}
      
      {/* Mobile menu button (for tablet size) */}
      {isMobile && !isMobileSheetMode() && !isOpen && (
        <Button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-3 rounded-full bg-secondary shadow-lg text-white md:hidden"
          variant="secondary"
          size="icon"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </Button>
      )}
    </>
  );
};

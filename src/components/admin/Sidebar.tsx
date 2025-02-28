
import { useEffect, useRef } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { X, Menu } from "lucide-react";
import { adminConfig } from "@/config/admin";
import { useMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { activeSection, setActiveSection, avatar, name } = useAdmin();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

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

  // Handle sidebar visibility on mobile
  useEffect(() => {
    if (!isMobile && !isOpen) {
      setIsOpen(true);
    } else if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, setIsOpen, isOpen]);

  // Toggle sidebar on menu button click
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-secondary shadow-lg text-white sm:hidden"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-white fixed inset-y-0 left-0 w-64 overflow-y-auto transition-transform duration-300 ease-in-out transform z-30 shadow-md sm:translate-x-0 sm:static ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}

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
            {adminConfig.mainNav.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    activeSection === item.id
                      ? "bg-gray-100 text-secondary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveSection(item.id);
                    if (isMobile) setIsOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};


import { cn } from "@/lib/utils";

interface AdminMobileNavProps {
  isMobile: boolean;
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }>;
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export const AdminMobileNav = ({ 
  isMobile, 
  navItems, 
  activeSection, 
  setActiveSection 
}: AdminMobileNavProps) => {
  if (!isMobile) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around">
        {navItems.slice(0, 5).map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="flex flex-col items-center py-2 flex-1"
            >
              <item.icon
                size={20}
                className={cn(
                  "mb-1",
                  isActive ? "text-primary" : "text-gray-500"
                )}
              />
              <span className={cn(
                "text-xs",
                isActive ? "text-primary font-medium" : "text-gray-500"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

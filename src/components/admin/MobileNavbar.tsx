
import { 
  LayoutDashboard, 
  Users, 
  ChartBarIcon, 
  Settings, 
  CreditCard, 
  ShoppingCart, 
  Package, 
  UserCircle 
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { menuItems } from "@/config/admin";
import { cn } from "@/lib/utils";

export const MobileNavbar = () => {
  const { activeSection, setActiveSection } = useAdmin();

  const iconMap = {
    dashboard: LayoutDashboard,
    users: Users,
    reports: ChartBarIcon,
    subscription: CreditCard,
    sales: ShoppingCart,
    products: Package,
    customers: UserCircle,
    settings: Settings,
  };
  
  // Filter to show only the main menu items on mobile (max 5)
  const mobileMenuItems = menuItems.slice(0, 5);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden z-40">
      <div className="flex justify-around items-center h-16">
        {mobileMenuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 w-full",
                "transition-colors duration-200",
                isActive 
                  ? "text-secondary" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <IconComponent className={cn(
                "h-5 w-5 mb-1",
                isActive ? "text-secondary" : "text-gray-500"
              )} />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

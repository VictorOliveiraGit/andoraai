
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart4, 
  CreditCard,
  Package,
  ShoppingCart,
} from "lucide-react";

// Admin Usuario navigation items
export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Usuários", icon: Users },
  { id: "reports", label: "Relatórios", icon: BarChart4 },
  { id: "subscription", label: "Assinaturas", icon: CreditCard },
  { id: "sales", label: "Vendas", icon: ShoppingCart },
  { id: "products", label: "Produtos", icon: Package },
  { id: "customers", label: "Clientes", icon: Users },
  { id: "settings", label: "Configurações", icon: Settings },
];

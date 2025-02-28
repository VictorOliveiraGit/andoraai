
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

export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "sales",
    label: "Vendas",
    icon: ShoppingCart,
  },
  {
    id: "products",
    label: "Produtos",
    icon: Package,
  },
  {
    id: "customers",
    label: "Clientes",
    icon: UserCircle,
  },
  {
    id: "users",
    label: "Usuários",
    icon: Users,
  },
  {
    id: "reports",
    label: "Relatórios",
    icon: ChartBarIcon,
  },
  {
    id: "subscription",
    label: "Assinatura",
    icon: CreditCard,
  },
  {
    id: "settings",
    label: "Configurações",
    icon: Settings,
  },
];

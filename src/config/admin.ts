import {
  LayoutDashboard,
  ChartBarIcon,
  Settings,
  CreditCard,
  ShoppingCart,
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

export const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    active: true,
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria.souza@exemplo.com",
    active: true,
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedro.santos@exemplo.com",
    active: false,
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana.oliveira@exemplo.com",
    active: true,
  },
  {
    id: 5,
    name: "Carlos Pereira",
    email: "carlos.pereira@exemplo.com",
    active: false,
  }
];

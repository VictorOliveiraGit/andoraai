
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react";

export const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Usuários", icon: Users },
  { id: "reports", label: "Relatórios", icon: FileText },
  { id: "settings", label: "Configurações", icon: Settings },
];

export const users = [
  { id: 1, name: "João Silva", email: "joao@example.com", active: true },
  { id: 2, name: "Maria Santos", email: "maria@example.com", active: false },
  { id: 3, name: "Pedro Costa", email: "pedro@example.com", active: true },
];

export const salesData = [
  { month: "Janeiro", value: 12500 },
  { month: "Fevereiro", value: 15000 },
  { month: "Março", value: 18000 },
  { month: "Abril", value: 16500 },
];

export const stats = [
  { label: "Total de Usuários", value: "1,234" },
  { label: "Visitas Hoje", value: "456" },
  { label: "Mensagens", value: "89" },
  { label: "Relatórios", value: "12" },
];

/**
 * Admin Andora Dashboard Page
 * 
 * This component serves as the main container for the Andora admin dashboard,
 * providing a premium admin experience with enhanced visual design.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import AICostCard from "@/components/admin/analytics/AICostCard";
import {
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  BarChart4, 
  ShieldCheck,
  CreditCard,
  Package,
  ShoppingCart,
  Menu,
  Bell,
  Calendar,
  Filter,
  ChevronUp,
  User,
  Plus,
  Search,
  Mail,
  Phone,
  Edit,
  Trash,
  ArrowUpRight,
  Clock,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { format } from "date-fns";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { menuItems } from "@/config/admin";
import { FilterDialog } from "@/components/admin/reports/FilterDialog";

// Daily sales data by year and month
const dailySalesData = {
  "2024": {
    "1": [
      { day: "Segunda", sales: 1500 },
      { day: "Terça", sales: 2200 },
      { day: "Quarta", sales: 1800 },
      { day: "Quinta", sales: 2500 },
      { day: "Sexta", sales: 3000 },
      { day: "Sábado", sales: 2800 },
      { day: "Domingo", sales: 1200 },
    ],
    "2": [
      { day: "Segunda", sales: 1700 },
      { day: "Terça", sales: 2400 },
      { day: "Quarta", sales: 2100 },
      { day: "Quinta", sales: 2700 },
      { day: "Sexta", sales: 3200 },
      { day: "Sábado", sales: 2600 },
      { day: "Domingo", sales: 1400 },
    ],
    "3": [
      { day: "Segunda", sales: 1900 },
      { day: "Terça", sales: 2600 },
      { day: "Quarta", sales: 2300 },
      { day: "Quinta", sales: 2900 },
      { day: "Sexta", sales: 3400 },
      { day: "Sábado", sales: 2700 },
      { day: "Domingo", sales: 1500 },
    ],
  },
  "2023": {
    "12": [
      { day: "Segunda", sales: 1400 },
      { day: "Terça", sales: 2000 },
      { day: "Quarta", sales: 1600 },
      { day: "Quinta", sales: 2300 },
      { day: "Sexta", sales: 2800 },
      { day: "Sábado", sales: 2500 },
      { day: "Domingo", sales: 1100 },
    ],
    "11": [
      { day: "Segunda", sales: 1300 },
      { day: "Terça", sales: 1900 },
      { day: "Quarta", sales: 1500 },
      { day: "Quinta", sales: 2200 },
      { day: "Sexta", sales: 2700 },
      { day: "Sábado", sales: 2400 },
      { day: "Domingo", sales: 1000 },
    ]
  }
};

// Customer data for the customer management section
const customersData = [
  { id: 1, nome: "João Silva", email: "joao.silva@example.com", telefone: "(11) 98765-4321", ultimaCompra: "10/06/2023", totalGasto: 4750.00, status: "Ativo", plano: "Premium" },
  { id: 2, nome: "Maria Oliveira", email: "maria@example.com", telefone: "(21) 98765-4321", ultimaCompra: "05/06/2023", totalGasto: 3500.00, status: "Ativo", plano: "Básico" },
  { id: 3, nome: "Pedro Santos", email: "pedro@example.com", telefone: "(31) 98765-4321", ultimaCompra: "01/06/2023", totalGasto: 1250.00, status: "Inativo", plano: "Básico" },
  { id: 4, nome: "Ana Costa", email: "ana@example.com", telefone: "(41) 98765-4321", ultimaCompra: "20/05/2023", totalGasto: 950.00, status: "Ativo", plano: "Premium" },
  { id: 5, nome: "Carlos Ferreira", email: "carlos@example.com", telefone: "(51) 98765-4321", ultimaCompra: "15/05/2023", totalGasto: 2200.00, status: "Ativo", plano: "Pro" },
  { id: 6, nome: "Mariana Lima", email: "mariana@example.com", telefone: "(61) 98765-4321", ultimaCompra: "10/05/2023", totalGasto: 1800.00, status: "Inativo", plano: "Básico" },
];

/**
 * AdminAndora Component
 * 
 * Premium admin dashboard for Andora with enhanced visual design
 * and fully responsive layout for any screen size.
 */
const AdminAndora = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Customer management state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [selectedPlan, setSelectedPlan] = useState("todos");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5000);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Handle logout
  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };
  
  // Toggle sidebar on mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Select section and close drawer
  const selectSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsDrawerOpen(false);
  };

  // Render sidebar/navigation
  const renderSidebar = () => {
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
            <h1 className="text-xl font-bold text-white">Andora Admin</h1>
          ) : (
            <h1></h1>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-white hover:bg-white/10"
          >
            <Menu size={20} />
          </Button>
        </div>
        
        {/* Nav Links */}
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
        {isSidebarOpen ? (
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full text-white justify-start"
            >
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
            </div>
        ) : (
          <div className="items-left absolute bottom-8 left-0 right-0 px-6">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full text-white justify-left"
            >
              <LogOut size={16} />
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Render mobile bottom drawer trigger
  const renderMobileNav = () => {
    if (!isMobile) return null;
    
    return (
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden p-2">
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild className="w-full">
            <Button variant="ghost" className="w-full flex items-center gap-2 justify-center py-2">
              <span className="text-primary font-medium">{menuItems.find(item => item.id === activeSection)?.label}</span>
              <ChevronUp className="h-5 w-5 text-primary" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh] overflow-y-auto">
            <DrawerHeader className="text-left px-4 py-2 border-b">
              <DrawerTitle>Menu de Navegação</DrawerTitle>
            </DrawerHeader>
            <div className="grid grid-cols-2 gap-2 p-4">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "outline"}
                    className={cn(
                      "h-20 flex flex-col items-center justify-center gap-2",
                      isActive ? "bg-primary text-white" : ""
                    )}
                    onClick={() => selectSection(item.id)}
                  >
                    <item.icon size={24} />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
            <DrawerFooter className="border-t pt-2">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <LogOut size={16} />
                Sair
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  };

  // Render main content based on active section
  const renderContent = () => {
    switch(activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "sales":
        return <EcommerceContent />;
      case "products": 
        return <ProductsContent />;
      case "users":
        return <CustomersContent 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          minValue={minValue}
          setMinValue={setMinValue}
          maxValue={maxValue}
          setMaxValue={setMaxValue}
          showDeleteConfirm={showDeleteConfirm}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />; // Updated to use our new customers content
      case "subscription":
        return <SubscriptionsContent />;
      case "security":
        return <SecurityContent />;
      case "reports":
        return <AnalyticsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="admin-andora">
      {/* Render sidebar for tablet/desktop */}
      {renderSidebar()}
      
      {/* Main content */}
      <div className={cn(
        "min-h-screen bg-gray-50 transition-all duration-300",
        isMobile 
          ? "pb-16" // Add padding for mobile bottom nav
          : isSidebarOpen
            ? "md:ml-64" 
            : "md:ml-20"
      )}>
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 md:px-8 px-6 py-6 flex justify-between items-center">
          {isMobile && (
            <div className="flex items-center">
              <h2 className="text-lg font-bold">Andora Admin - {menuItems.find(item => item.id === activeSection)?.label}</h2>
            </div>
          )}
          {!isMobile && (
            <div>
              <h2 className="text-lg font-bold">{menuItems.find(item => item.id === activeSection)?.label}</h2>
            </div>
          )}
          
          {/* Notificação, ver o que irá fazer */}
            {/* <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              
              {!isMobile && (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <LogOut size={16} />
                  Sair
                </Button>
              )}
            </div> */}
        </div>
        
        {/* Content Area */}
        <div className="p-4 md:p-6 lg:p-8">
          {renderContent()}
        </div>
      </div>
      
      {/* Mobile Bottom Drawer Navigation */}
      {renderMobileNav()}
    </div>
  );
};

// Section Content Components
const DashboardContent = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("1");

  const currentData = dailySalesData[selectedYear]?.[selectedMonth] || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R$ 159.327,00</p>
            <p className="text-sm opacity-80 mt-1">+18% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary/90 to-secondary/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Novos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">845</p>
            <p className="text-sm opacity-80 mt-1">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Assinaturas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2.156</p>
            <p className="text-sm text-muted-foreground mt-1">+5% em relação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Sales Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vendas Diárias</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent text-sm font-medium border-none focus:outline-none"
              >
                {Object.keys(dailySalesData).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-sm font-medium border-none focus:outline-none"
              >
                {Object.keys(dailySalesData[selectedYear] || {}).map((month) => (
                  <option key={month} value={month}>
                    {format(new Date(2024, parseInt(month) - 1), 'MMMM')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={currentData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`R$ ${value}`, 'Vendas']}
                labelFormatter={(label) => `Dia: ${label}`}
              />
              <Bar 
                dataKey="sales" 
                fill="#C6BA77" 
                radius={[4, 4, 0, 0]}
                name="Vendas"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users size={16} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Novo usuário registrado</h4>
                    <p className="text-sm text-gray-500">João Silva criou uma conta</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {item}h atrás
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Metas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Vendas</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Novos Usuários</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Receita de Assinaturas</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Placeholder content for other sections
const EcommerceContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">E-commerce</h2>
    <p className="text-gray-500">Gerenciamento de vendas e pedidos online.</p>
    
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral de Vendas</CardTitle>
      </CardHeader>
      <CardContent className="h-80 flex items-center justify-center">
        <p className="text-muted-foreground">Gráfico de vendas será exibido aqui</p>
      </CardContent>
    </Card>
  </div>
);

const ProductsContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Produtos</h2>
    <p className="text-gray-500">Gerencie o catálogo de produtos da sua loja.</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Card key={item}>
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <Package className="h-10 w-10 text-gray-400" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium">Produto {item}</h3>
            <p className="text-sm text-gray-500 mb-2">Categoria</p>
            <p className="font-bold">R$ {(item * 99.9).toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// Updated UsersContent (renamed to CustomersContent) 
interface CustomersContentProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedPlan: string;
  setSelectedPlan: (value: string) => void;
  minValue: number;
  setMinValue: (value: number) => void;
  maxValue: number;
  setMaxValue: (value: number) => void;
  showDeleteConfirm: number | null;
  setShowDeleteConfirm: (value: number | null) => void;
}

const CustomersContent = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedPlan,
  setSelectedPlan,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  showDeleteConfirm,
  setShowDeleteConfirm,
}: CustomersContentProps) => {
  
  // Filtra os dados com base nos critérios
  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = 
      customer.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.telefone.includes(searchTerm) ||
      customer.plano.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === "todos" || 
      customer.status.toLowerCase() === selectedStatus.toLowerCase();
    
    const matchesPlan =
      selectedPlan === "todos" ||
      customer.plano.toLowerCase() === selectedPlan.toLowerCase();
    
    const matchesValue =
      customer.totalGasto >= minValue && 
      customer.totalGasto <= maxValue;
    
    return matchesSearch && matchesStatus && matchesPlan && matchesValue;
  });

  const handleDeleteCustomer = (id: number) => {
    // In a real application, this would call an API to delete the customer
    toast.success(`Cliente #${id} excluído com sucesso!`);
    setShowDeleteConfirm(null);
  };

  const handleEditCustomer = (id: number) => {
    // In a real application, this would navigate to an edit form or open a modal
    toast.info(`Editando cliente #${id}`);
  };

  const plansCount = {
    "Basic": customersData.filter(c => c.plano === "Básico").length,
    "Pro": customersData.filter(c => c.plano === "Pro").length,
    "Premium": customersData.filter(c => c.plano === "Premium").length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2 h-6 w-6" />
          Gerenciamento de Clientes
        </h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-primary/20 p-2 rounded-full">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
              <h3 className="text-2xl font-bold">{customersData.length}</h3>
              <div className="flex items-center mt-1 text-xs">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+2 esta semana</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-green-100 p-2 rounded-full">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Clientes Ativos</p>
              <h3 className="text-2xl font-bold">
                {customersData.filter(c => c.status === "Ativo").length}
              </h3>
              <p className="text-xs text-muted-foreground">
                {Math.round(customersData.filter(c => c.status === "Ativo").length / customersData.length * 100)}% do total
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tempo Médio</p>
              <h3 className="text-2xl font-bold">45 dias</h3>
              <p className="text-xs text-muted-foreground">Entre compras</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Valor Médio</p>
              <h3 className="text-2xl font-bold">R$ 2.408</h3>
              <p className="text-xs text-muted-foreground">Por cliente</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-blue-700">Plano Básico</p>
              <h3 className="text-xl font-bold text-blue-800">{plansCount.Basic} clientes</h3>
            </div>
            <div className="bg-blue-200 p-2 rounded-full">
              <User className="h-6 w-6 text-blue-700" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-purple-700">Plano Pro</p>
              <h3 className="text-xl font-bold text-purple-800">{plansCount.Pro} clientes</h3>
            </div>
            <div className="bg-purple-200 p-2 rounded-full">
              <User className="h-6 w-6 text-purple-700" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-amber-700">Plano Premium</p>
              <h3 className="text-xl font-bold text-amber-800">{plansCount.Premium} clientes</h3>
            </div>
            <div className="bg-amber-200 p-2 rounded-full">
              <User className="h-6 w-6 text-amber-700"

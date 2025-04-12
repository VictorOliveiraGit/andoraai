
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment";
import { AppointmentStatusBadge } from "@/components/admin/agenda/AppointmentStatusBadge";
import { PaymentStatusBadge } from "@/components/admin/agenda/PaymentStatusBadge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  ArrowLeft,
  Search,
  Calendar as CalendarIcon,
  Filter,
  Phone,
  Clock,
  X
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AdminProvider } from "@/contexts/AdminContext";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // In a real app, we'd fetch from an API
  // For this example, we'll use some sample data
  useEffect(() => {
    const sampleAppointments: Appointment[] = [
      {
        id: 1,
        title: "Consulta Dr. Silva",
        date: new Date(),
        status: "scheduled",
        clientName: "João Pedro",
        phoneNumber: "(11) 98765-4321",
        time: "14:30",
        payment: "pending"
      },
      {
        id: 2,
        title: "Exame de Rotina",
        date: new Date(),
        status: "pending",
        clientName: "Maria Santos",
        phoneNumber: "(11) 91234-5678",
        time: "15:45",
        payment: "paid"
      },
      {
        id: 3,
        title: "Consulta de Retorno",
        date: new Date(Date.now() + 86400000), // Tomorrow
        status: "confirmed",
        clientName: "Carlos Silva",
        phoneNumber: "(11) 98888-7777",
        time: "10:00",
        payment: "paid"
      },
      {
        id: 4,
        title: "Terapia",
        date: new Date(Date.now() - 86400000), // Yesterday
        status: "completed",
        clientName: "Amanda Lima",
        phoneNumber: "(11) 97777-6666",
        time: "11:30",
        payment: "not_required"
      }
    ];
    
    setAppointments(sampleAppointments);
    setFilteredAppointments(sampleAppointments);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...appointments];
    
    // Filter by date
    if (filterDate) {
      result = result.filter(app => {
        const appDate = new Date(app.date);
        return (
          appDate.getDate() === filterDate.getDate() &&
          appDate.getMonth() === filterDate.getMonth() &&
          appDate.getFullYear() === filterDate.getFullYear()
        );
      });
    }
    
    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter(app => app.status === filterStatus);
    }
    
    // Filter by payment
    if (filterPayment !== "all") {
      result = result.filter(app => app.payment === filterPayment);
    }
    
    // Search by name or title
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        app => 
          app.title.toLowerCase().includes(query) || 
          app.clientName.toLowerCase().includes(query)
      );
    }
    
    setFilteredAppointments(result);
  }, [appointments, filterDate, filterStatus, filterPayment, searchQuery]);

  // Clear all filters
  const handleClearFilters = () => {
    setFilterDate(undefined);
    setFilterStatus("all");
    setFilterPayment("all");
    setSearchQuery("");
  };

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                className="mr-4 p-2" 
                onClick={() => navigate("/admin")}
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Todos os Agendamentos</h1>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou título..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-primary/10" : ""}
              >
                <Filter size={18} />
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Filtros</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearFilters}
                    className="h-8 gap-1 text-sm"
                  >
                    <X size={16} />
                    Limpar filtros
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Date Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-9"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filterDate ? (
                            format(filterDate, "dd 'de' MMMM, yyyy", { locale: ptBR })
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filterDate}
                          onSelect={setFilterDate}
                          className="rounded-md pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select 
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os status</SelectItem>
                        <SelectItem value="scheduled">Agendado</SelectItem>
                        <SelectItem value="confirmed">Confirmado</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="completed">Finalizado</SelectItem>
                        <SelectItem value="canceled">Cancelado</SelectItem>
                        <SelectItem value="no_show">Não compareceu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pagamento</label>
                    <Select 
                      value={filterPayment}
                      onValueChange={setFilterPayment}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Todos os pagamentos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os pagamentos</SelectItem>
                        <SelectItem value="paid">Pago</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="not_required">Não requer pagamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    {/* Date sidebar */}
                    <div className="bg-primary/5 p-4 sm:w-48 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start gap-2 border-b sm:border-b-0 sm:border-r border-gray-200">
                      <div className="text-center sm:text-left">
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(appointment.date), "EEEE", { locale: ptBR })}
                        </p>
                        <p className="text-xl font-bold">
                          {format(new Date(appointment.date), "dd 'de' MMM", { locale: ptBR })}
                        </p>
                      </div>
                      <div className="flex items-center sm:mt-2">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="font-medium">{appointment.time}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 flex-1">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {appointment.title}
                          </h3>
                          <p className="text-muted-foreground">{appointment.clientName}</p>
                          <div className="flex items-center mt-1">
                            <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {appointment.phoneNumber}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 sm:text-right mt-2 sm:mt-0">
                          <AppointmentStatusBadge status={appointment.status} />
                          {appointment.payment !== "not_required" && (
                            <PaymentStatusBadge payment={appointment.payment} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Nenhum agendamento encontrado com os filtros atuais.</p>
                <Button 
                  variant="link" 
                  onClick={handleClearFilters}
                  className="mt-2"
                >
                  Limpar todos os filtros
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AppointmentsPage;

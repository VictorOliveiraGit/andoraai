
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Appointment, AppointmentStatus } from "@/types/appointment";
import { AdminProvider } from "@/contexts/AdminContext";
import { AppointmentHeader } from "@/components/admin/appointments/AppointmentHeader";
import { AppointmentFilters } from "@/components/admin/appointments/AppointmentFilters";
import { AppointmentCard } from "@/components/admin/appointments/AppointmentCard";
import { agendaApi } from "@/api/apiClient";
import { mapApiAppointmentToAppointment } from "@/utils/appointment-mappers";
import { toast } from "@/hooks/use-toast";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const apiAppointments = await agendaApi.getAppointments();
        
        // Map API appointments to our application format
        const mappedAppointments = apiAppointments.map(mapApiAppointmentToAppointment);
        setAppointments(mappedAppointments);
        setFilteredAppointments(mappedAppointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os agendamentos",
          variant: "destructive",
          closable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAppointments();
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

  // Navigate back to agenda page
  const handleBackToAgenda = () => {
    navigate("/admin");
  };

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <AppointmentHeader 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            handleBackToAgenda={handleBackToAgenda}
          />

          <AppointmentFilters 
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterPayment={filterPayment}
            setFilterPayment={setFilterPayment}
            handleClearFilters={handleClearFilters}
            showFilters={showFilters}
          />

          {/* Appointments List */}
          <div className="space-y-4">
            {isLoading ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Carregando agendamentos...</p>
              </Card>
            ) : filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                />
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
          
          {/* Back to Agenda Button - Mobile Friendly Fixed Button */}
          <div className="fixed bottom-6 right-6 md:hidden">
            <Button 
              onClick={handleBackToAgenda}
              className="rounded-full shadow-lg flex items-center justify-center h-12 w-12"
              aria-label="Voltar para agenda"
            >
              <ArrowLeft size={20} />
            </Button>
          </div>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AppointmentsPage;

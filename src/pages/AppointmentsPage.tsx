
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment";
import { AdminProvider } from "@/contexts/AdminContext";
import { AppointmentHeader } from "@/components/admin/appointments/AppointmentHeader";
import { AppointmentFilters } from "@/components/admin/appointments/AppointmentFilters";
import { AppointmentCard } from "@/components/admin/appointments/AppointmentCard";

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
            {filteredAppointments.length > 0 ? (
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

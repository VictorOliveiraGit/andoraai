
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ListFilter, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Appointment, AppointmentStatus } from "@/types/appointment";
import { AppointmentForm } from "./agenda/AppointmentForm";
import { AppointmentList } from "./agenda/AppointmentList";
import { CalendarView } from "./agenda/CalendarView";
import { useNavigate } from "react-router-dom";
import { agendaApi } from "@/api/apiClient";
import { mapApiAppointmentToAppointment } from "@/utils/appointment-mappers";

export const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const apiAppointments = await agendaApi.getAppointments();
        
        // Map API appointments to our application format
        const mappedAppointments = apiAppointments.map(mapApiAppointmentToAppointment);
        setAppointments(mappedAppointments);
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
  
  // Handle form submission
  const handleAppointmentSubmit = (newAppointment: Appointment) => {
    // In a real implementation, this would send the data to the API
    // For now, we'll just add it to the local state
    setAppointments(prev => [...prev, newAppointment]);
    
    // Show success message
    toast({
      title: "Sucesso",
      description: "Agendamento criado com sucesso!",
      closable: true,
    });
    
    // Close modal
    setIsModalOpen(false);
  };

  // Handle status change
  const handleStatusChange = (id: number, newStatus: AppointmentStatus) => {
    // In a real implementation, this would update the API
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
    
    toast({
      title: "Sucesso",
      description: "Status atualizado com sucesso!",
      closable: true,
    });
  };

  // Handle appointment update
  const handleAppointmentUpdate = (updatedAppointment: Appointment) => {
    // In a real implementation, this would update the API
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === updatedAppointment.id 
          ? updatedAppointment
          : appointment
      )
    );

    toast({
      title: "Sucesso",
      description: "Agendamento atualizado com sucesso!",
      closable: true,
    });
  };

  // Navigate to full appointments page
  const handleViewAllAppointments = () => {
    navigate("/admin/appointments");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Agenda</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleViewAllAppointments}
          >
            <ListFilter size={18} />
            <span className="hidden sm:inline">Ver Todos</span>
            <ExternalLink size={16} className="sm:ml-1" />
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span className="hidden sm:inline">Novo Agendamento</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Calendar Section */}
        <CalendarView 
          selectedDate={date}
          onDateSelect={setDate}
          view={view}
          onViewChange={setView}
        />

        {/* Appointments List */}
        <AppointmentList 
          appointments={appointments}
          selectedDate={date}
          view={view}
          onStatusChange={handleStatusChange}
          onAppointmentUpdate={handleAppointmentUpdate}
          isLoading={isLoading}
        />
      </div>

      {/* New Appointment Form */}
      <AppointmentForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAppointmentSubmit}
      />
    </div>
  );
};


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ListFilter, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment";
import { AppointmentForm } from "./agenda/AppointmentForm";
import { AppointmentList } from "./agenda/AppointmentList";
import { CalendarView } from "./agenda/CalendarView";
import { useNavigate } from "react-router-dom";

export const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Store appointments in state
  const [appointments, setAppointments] = useState<Appointment[]>([
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
    }
  ]);
  
  // Handle form submission
  const handleAppointmentSubmit = (newAppointment: Appointment) => {
    // Add the new appointment to the list
    setAppointments(prev => [...prev, newAppointment]);
    
    // Show success message
    toast.success("Agendamento criado com sucesso!");
    
    // Close modal
    setIsModalOpen(false);
  };

  // Handle status change
  const handleStatusChange = (id: number, newStatus: AppointmentStatus) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
    
    toast.success("Status atualizado com sucesso!");
  };

  // Handle appointment update
  const handleAppointmentUpdate = (updatedAppointment: Appointment) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === updatedAppointment.id 
          ? updatedAppointment
          : appointment
      )
    );
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

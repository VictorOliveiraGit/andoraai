import { Pencil, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment";
import { formatPhoneNumber } from "@/utils/appointment-utils";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AppointmentItem } from "./AppointmentItem";
import { AppointmentEditForm } from "./AppointmentEditForm";
import { AppointmentStatusForm } from "./AppointmentStatusForm";

interface AppointmentListProps {
  appointments: Appointment[];
  selectedDate: Date | undefined;
  view: "day" | "week" | "month";
  onStatusChange?: (id: number, status: AppointmentStatus) => void;
  onAppointmentUpdate?: (appointment: Appointment) => void;
}

export const AppointmentList = ({ 
  appointments, 
  selectedDate, 
  view, 
  onStatusChange,
  onAppointmentUpdate 
}: AppointmentListProps) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<AppointmentStatus>("scheduled");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter(appointment => {
    if (!selectedDate) return false;
    
    const appointmentDate = new Date(appointment.date);
    
    if (view === "day") {
      return (
        appointmentDate.getDate() === selectedDate.getDate() &&
        appointmentDate.getMonth() === selectedDate.getMonth() &&
        appointmentDate.getFullYear() === selectedDate.getFullYear()
      );
    } else if (view === "week") {
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
      return isWithinInterval(appointmentDate, { start: weekStart, end: weekEnd });
    } else if (view === "month") {
      const monthStart = startOfMonth(selectedDate);
      const monthEnd = endOfMonth(selectedDate);
      return isWithinInterval(appointmentDate, { start: monthStart, end: monthEnd });
    }
    
    return false;
  });

  const getViewTitle = () => {
    switch (view) {
      case "day":
        return "Agendamentos do Dia";
      case "week":
        return "Agendamentos da Semana";
      case "month":
        return "Agendamentos do Mês";
      default:
        return "Agendamentos";
    }
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status);
    setIsStatusDialogOpen(true);
  };

  const handleStatusChange = () => {
    if (selectedAppointment && onStatusChange) {
      onStatusChange(selectedAppointment.id, newStatus);
      setIsStatusDialogOpen(false);
    }
  };

  const handleEdit = () => {
    if (selectedAppointment) {
      setEditedAppointment({...selectedAppointment});
      setIsEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (editedAppointment && onAppointmentUpdate) {
      onAppointmentUpdate(editedAppointment);
      toast.success("Agendamento atualizado com sucesso!");
      setIsEditMode(false);
      setIsStatusDialogOpen(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedAppointment(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedAppointment) return;
    
    const { name, value } = e.target;
    setEditedAppointment({
      ...editedAppointment,
      [name]: value,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedAppointment) return;
    
    const formattedValue = formatPhoneNumber(e.target.value);
    setEditedAppointment({
      ...editedAppointment,
      phoneNumber: formattedValue,
    });
  };

  const handleStatusSelect = (value: AppointmentStatus) => {
    setNewStatus(value);
  };

  const handleEditStatusChange = (value: AppointmentStatus) => {
    if (editedAppointment) {
      setEditedAppointment({
        ...editedAppointment,
        status: value
      });
    }
  };

  const handlePaymentChange = (value: PaymentStatus) => {
    if (editedAppointment) {
      setEditedAppointment({
        ...editedAppointment,
        payment: value
      });
    }
  };

  return (
    <>
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>{getViewTitle()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <AppointmentItem 
                  key={appointment.id}
                  appointment={appointment}
                  onClick={handleAppointmentClick}
                />
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                Nenhum agendamento para este {view === "day" ? "dia" : view === "week" ? "semana" : "mês"}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Editar Agendamento" : "Alterar Status do Agendamento"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Edite os detalhes do agendamento abaixo"
                : "Selecione o novo status ou edite os detalhes do agendamento"
              }
            </DialogDescription>
          </DialogHeader>
          
          {isEditMode && editedAppointment ? (
            <AppointmentEditForm 
              appointment={editedAppointment}
              onInputChange={handleInputChange}
              onPhoneChange={handlePhoneChange}
              onStatusChange={handleEditStatusChange}
              onPaymentChange={handlePaymentChange}
            />
          ) : selectedAppointment ? (
            <AppointmentStatusForm 
              appointment={selectedAppointment}
              newStatus={newStatus}
              onStatusChange={handleStatusSelect}
            />
          ) : null}
          
          <DialogFooter>
            {isEditMode ? (
              <>
                <Button variant="outline" onClick={handleCancelEdit}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="outline" onClick={handleEdit}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button onClick={handleStatusChange}>
                  Salvar Status
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

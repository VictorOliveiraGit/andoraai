
import { Pencil, Phone, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment, AppointmentStatus } from "@/types/appointment";
import { getStatusColor, getStatusLabel, formatPhoneNumber } from "@/utils/appointment-utils";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

  // Filter appointments based on the selected view and date
  const filteredAppointments = appointments.filter(appointment => {
    if (!selectedDate) return false;
    
    const appointmentDate = new Date(appointment.date);
    
    if (view === "day") {
      // For day view: show only appointments on the selected day
      return (
        appointmentDate.getDate() === selectedDate.getDate() &&
        appointmentDate.getMonth() === selectedDate.getMonth() &&
        appointmentDate.getFullYear() === selectedDate.getFullYear()
      );
    } else if (view === "week") {
      // For week view: show appointments within the current week
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
      return isWithinInterval(appointmentDate, { start: weekStart, end: weekEnd });
    } else if (view === "month") {
      // For month view: show appointments within the current month
      const monthStart = startOfMonth(selectedDate);
      const monthEnd = endOfMonth(selectedDate);
      return isWithinInterval(appointmentDate, { start: monthStart, end: monthEnd });
    }
    
    return false;
  });

  // Get the title based on the current view
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
                <div
                  key={appointment.id}
                  className="flex flex-col space-y-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{appointment.time}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{appointment.title}</span>
                  <span className="text-sm text-muted-foreground">{appointment.clientName}</span>
                  {appointment.phoneNumber && (
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone size={12} /> {appointment.phoneNumber}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                Nenhum agendamento para este {view === "day" ? "dia" : view === "week" ? "semana" : "mês"}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Change Dialog */}
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
          
          {isEditMode ? (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right text-sm font-medium">
                  Título
                </label>
                <div className="col-span-3 flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="title"
                    name="title"
                    value={editedAppointment?.title || ""}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="clientName" className="text-right text-sm font-medium">
                  Cliente
                </label>
                <div className="col-span-3 flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="clientName"
                    name="clientName"
                    value={editedAppointment?.clientName || ""}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phoneNumber" className="text-right text-sm font-medium">
                  Telefone
                </label>
                <div className="col-span-3 flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={editedAppointment?.phoneNumber || ""}
                    onChange={handlePhoneChange}
                    placeholder="(00) 00000-0000"
                    className="flex-1"
                    maxLength={15}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="time" className="text-right text-sm font-medium">
                  Horário
                </label>
                <div className="col-span-3 flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={editedAppointment?.time || ""}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right text-sm font-medium">
                  Status
                </label>
                <Select 
                  value={editedAppointment?.status || "scheduled"} 
                  onValueChange={(value: AppointmentStatus) => {
                    if (editedAppointment) {
                      setEditedAppointment({
                        ...editedAppointment,
                        status: value
                      });
                    }
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Agendado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="in-progress">Em Atendimento</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                    <SelectItem value="delayed">Atrasado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">{selectedAppointment?.title}</h4>
                <p className="text-sm text-muted-foreground">Cliente: {selectedAppointment?.clientName}</p>
                <p className="text-sm text-muted-foreground">Horário: {selectedAppointment?.time}</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select value={newStatus} onValueChange={(value: AppointmentStatus) => setNewStatus(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Agendado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="in-progress">Em Atendimento</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                    <SelectItem value="delayed">Atrasado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
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

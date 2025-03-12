
import { Appointment, AppointmentStatus } from "@/types/appointment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AppointmentStatusFormProps {
  appointment: Appointment;
  newStatus: AppointmentStatus;
  onStatusChange: (value: AppointmentStatus) => void;
}

export const AppointmentStatusForm = ({
  appointment,
  newStatus,
  onStatusChange,
}: AppointmentStatusFormProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <h4 className="font-medium">{appointment?.title}</h4>
        <p className="text-sm text-muted-foreground">Cliente: {appointment?.clientName}</p>
        <p className="text-sm text-muted-foreground">Horário: {appointment?.time}</p>
      </div>
      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <Select value={newStatus} onValueChange={onStatusChange}>
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
  );
};

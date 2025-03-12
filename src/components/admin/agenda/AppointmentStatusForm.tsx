
import { Card, CardContent } from "@/components/ui/card";
import { AppointmentStatus, Appointment } from "@/types/appointment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, DollarSign } from "lucide-react";

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
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{appointment.time}</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{appointment.title}</h4>
            <p className="text-sm text-muted-foreground">{appointment.clientName}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={newStatus} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Agendado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="in-progress">Em Atendimento</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="delayed">Atrasado</SelectItem>
                <SelectItem value="pending_payment">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Aguardando Pagamento
                  </div>
                </SelectItem>
                <SelectItem value="paid">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Pago
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

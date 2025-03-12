
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment";

export interface AppointmentEditFormProps {
  appointment: Appointment;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: AppointmentStatus) => void;
  onPaymentStatusChange: (value: PaymentStatus) => void;
}

export const AppointmentEditForm = ({
  appointment,
  onInputChange,
  onPhoneChange,
  onStatusChange,
  onPaymentStatusChange
}: AppointmentEditFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          value={appointment.title}
          onChange={onInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="clientName">Nome do Cliente</Label>
        <Input
          id="clientName"
          name="clientName"
          value={appointment.clientName}
          onChange={onInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="phoneNumber">Telefone</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={appointment.phoneNumber || ""}
          onChange={onPhoneChange}
          className="mt-1"
          placeholder="(99) 99999-9999"
        />
      </div>
      
      <div>
        <Label htmlFor="time">Horário</Label>
        <Input
          id="time"
          name="time"
          value={appointment.time}
          onChange={onInputChange}
          className="mt-1"
          placeholder="14:30"
        />
      </div>
      
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={appointment.status}
          onValueChange={(value) => onStatusChange(value as AppointmentStatus)}
        >
          <SelectTrigger id="status" className="mt-1">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="scheduled">Agendado</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="in-progress">Em Andamento</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
            <SelectItem value="canceled">Cancelado</SelectItem>
            <SelectItem value="delayed">Atrasado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="paymentStatus">Status de Pagamento</Label>
        <Select
          value={appointment.paymentStatus || "pending"}
          onValueChange={(value) => onPaymentStatusChange(value as PaymentStatus)}
        >
          <SelectTrigger id="paymentStatus" className="mt-1">
            <SelectValue placeholder="Selecione o status de pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="paid">Pago</SelectItem>
            <SelectItem value="not-required">Não Requerido</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

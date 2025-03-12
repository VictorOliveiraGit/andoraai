
import { Pencil, CreditCard } from "lucide-react";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPhoneNumber } from "@/utils/appointment-utils";

interface AppointmentEditFormProps {
  appointment: Appointment;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: AppointmentStatus) => void;
  onPaymentStatusChange: (value: PaymentStatus) => void;
}

export const AppointmentEditForm = ({
  appointment,
  onInputChange,
  onPhoneChange,
  onStatusChange,
  onPaymentStatusChange,
}: AppointmentEditFormProps) => {
  return (
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
            value={appointment?.title || ""}
            onChange={onInputChange}
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
            value={appointment?.clientName || ""}
            onChange={onInputChange}
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
            value={appointment?.phoneNumber || ""}
            onChange={onPhoneChange}
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
            value={appointment?.time || ""}
            onChange={onInputChange}
            className="flex-1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="status" className="text-right text-sm font-medium">
          Status
        </label>
        <Select 
          value={appointment?.status || "scheduled"} 
          onValueChange={onStatusChange}
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

      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="paymentStatus" className="text-right text-sm font-medium">
          Pagamento
        </label>
        <Select 
          value={appointment?.paymentStatus || "pending"} 
          onValueChange={onPaymentStatusChange}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Status de Pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pagamento Pendente</SelectItem>
            <SelectItem value="paid">Pago</SelectItem>
            <SelectItem value="not-required">Sem Pagamento</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};


import { Pencil } from "lucide-react";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPhoneNumber } from "@/utils/appointment-utils";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AppointmentEditFormProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: Appointment) => void;
}

export const AppointmentEditForm = ({
  appointment,
  isOpen,
  onClose,
  onSubmit,
}: AppointmentEditFormProps) => {
  const [editedAppointment, setEditedAppointment] = useState<Appointment>({...appointment});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAppointment(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setEditedAppointment(prev => ({ ...prev, phoneNumber: formattedPhone }));
  };

  const handleStatusChange = (value: AppointmentStatus) => {
    setEditedAppointment(prev => ({ ...prev, status: value }));
  };

  const handlePaymentChange = (value: PaymentStatus) => {
    setEditedAppointment(prev => ({ ...prev, payment: value }));
  };

  const handleSubmit = () => {
    onSubmit(editedAppointment);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Agendamento</DialogTitle>
        </DialogHeader>
        
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
              onValueChange={handleStatusChange}
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
            <label htmlFor="payment" className="text-right text-sm font-medium">
              Pagamento
            </label>
            <Select 
              value={editedAppointment?.payment || "not_required"} 
              onValueChange={handlePaymentChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Status do pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_required">Não requer pagamento</SelectItem>
                <SelectItem value="pending">Aguardando pagamento</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

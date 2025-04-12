
import { Clock, CreditCard, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Appointment, NewAppointmentForm, PaymentStatus } from "@/types/appointment";
import { formatPhoneNumber } from "@/utils/appointment-utils";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: Appointment) => void;
}

export const AppointmentForm = ({ isOpen, onClose, onSubmit }: AppointmentFormProps) => {
  const [newAppointment, setNewAppointment] = useState<NewAppointmentForm>({
    title: "",
    clientName: "",
    phoneNumber: "",
    date: new Date(),
    time: "",
    status: "scheduled",
    payment: "not_required"
  });

  // Handle phone input with mask
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setNewAppointment(prev => ({
      ...prev,
      phoneNumber: formattedValue
    }));
  };

  // Handle input change for other form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select change for the status field
  const handleStatusChange = (value: string) => {
    setNewAppointment(prev => ({
      ...prev,
      status: value as "scheduled" | "pending" | "delayed" | "canceled"
    }));
  };
  
  // Handle payment status change
  const handlePaymentChange = (value: string) => {
    setNewAppointment(prev => ({
      ...prev,
      payment: value as PaymentStatus
    }));
  };
  
  // Handle date selection from the calendar in the form
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setNewAppointment(prev => ({
        ...prev,
        date
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new appointment with an ID
    const appointmentWithId: Appointment = {
      ...newAppointment,
      id: Date.now(), // Use timestamp as a simple ID
    };
    
    // Submit the new appointment
    onSubmit(appointmentWithId);
    
    // Reset form
    setNewAppointment({
      title: "",
      clientName: "",
      phoneNumber: "",
      date: new Date(),
      time: "",
      status: "scheduled",
      payment: "not_required"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="space-y-1">
            <DialogTitle>Novo Agendamento</DialogTitle>
            <DialogDescription className="text-xs">
              Preencha os detalhes abaixo para criar um novo agendamento.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-3">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="title" className="text-right text-sm">
                Título
              </Label>
              <Input
                id="title"
                name="title"
                value={newAppointment.title}
                onChange={handleInputChange}
                placeholder="Título do agendamento"
                className="col-span-3 h-8"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="clientName" className="text-right text-sm">
                Cliente
              </Label>
              <div className="col-span-3 flex items-center gap-1">
                <User className="h-3 w-3 text-muted-foreground" />
                <Input
                  id="clientName"
                  name="clientName"
                  value={newAppointment.clientName}
                  onChange={handleInputChange}
                  placeholder="Nome do cliente"
                  className="flex-1 h-8"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="phoneNumber" className="text-right text-sm">
                Telefone
              </Label>
              <div className="col-span-3 flex items-center gap-1">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={newAppointment.phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  className="flex-1 h-8"
                  maxLength={15}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label className="text-right text-sm">
                Data
              </Label>
              <div className="col-span-3 border rounded-md p-1">
                <Calendar
                  mode="single"
                  selected={newAppointment.date}
                  onSelect={handleDateSelect}
                  locale={ptBR}
                  className="rounded-md pointer-events-auto"
                  classNames={{
                    caption: "text-xs",
                    day: "text-xs h-7 w-7",
                    nav_button: "h-6 w-6",
                    head_cell: "text-xs font-normal"
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="time" className="text-right text-sm">
                Horário
              </Label>
              <div className="col-span-3 flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  className="flex-1 h-8"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="status" className="text-right text-sm">
                Status
              </Label>
              <Select 
                value={newAppointment.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="col-span-3 w-full h-8">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Agendado</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="delayed">Atrasado</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="payment" className="text-right text-sm">
                Pagamento
              </Label>
              <div className="col-span-3 flex items-center gap-1">
                <CreditCard className="h-3 w-3 text-muted-foreground" />
                <Select 
                  value={newAppointment.payment || "not_required"} 
                  onValueChange={handlePaymentChange}
                >
                  <SelectTrigger className="w-full h-8">
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
          </div>
          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={onClose} size="sm">
              Cancelar
            </Button>
            <Button type="submit" size="sm">Salvar Agendamento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

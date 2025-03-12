
import { Clock, Phone, User, CreditCard } from "lucide-react";
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
    paymentStatus: "pending"
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
  const handlePaymentStatusChange = (value: string) => {
    setNewAppointment(prev => ({
      ...prev,
      paymentStatus: value as PaymentStatus
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
      paymentStatus: "pending"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
            <DialogDescription>
              Preencha os detalhes abaixo para criar um novo agendamento.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                name="title"
                value={newAppointment.title}
                onChange={handleInputChange}
                placeholder="Título do agendamento"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientName" className="text-right">
                Cliente
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="clientName"
                  name="clientName"
                  value={newAppointment.clientName}
                  onChange={handleInputChange}
                  placeholder="Nome do cliente"
                  className="flex-1"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Telefone
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={newAppointment.phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  className="flex-1"
                  maxLength={15}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Data
              </Label>
              <div className="col-span-3 border rounded-md p-1">
                <Calendar
                  mode="single"
                  selected={newAppointment.date}
                  onSelect={handleDateSelect}
                  locale={ptBR}
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Horário
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  className="flex-1"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select 
                value={newAppointment.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="col-span-3 w-full">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentStatus" className="text-right">
                Pagamento
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <Select 
                  value={newAppointment.paymentStatus} 
                  onValueChange={handlePaymentStatusChange}
                >
                  <SelectTrigger className="w-full">
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
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Agendamento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

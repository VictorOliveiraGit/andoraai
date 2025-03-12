
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, Clock, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Appointment {
  id: number;
  title: string;
  date: Date;
  status: "scheduled" | "completed" | "canceled";
  clientName: string;
  time: string;
}

export const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    clientName: "",
    date: new Date(),
    time: "",
    status: "scheduled" as const
  });
  
  // Placeholder for appointments data that would come from the database
  const appointments: Appointment[] = [
    {
      id: 1,
      title: "Consulta Dr. Silva",
      date: new Date(),
      status: "scheduled",
      clientName: "João Pedro",
      time: "14:30"
    },
    {
      id: 2,
      title: "Exame de Rotina",
      date: new Date(),
      status: "completed",
      clientName: "Maria Santos",
      time: "15:45"
    }
  ];

  // Handle input change for the form
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
      status: value as "scheduled" | "completed" | "canceled"
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
    
    // Here you would typically make an API call to save the appointment
    console.log("New appointment data:", newAppointment);
    
    // Show success message
    toast.success("Agendamento criado com sucesso!");
    
    // Close modal and reset form
    setIsModalOpen(false);
    setNewAppointment({
      title: "",
      clientName: "",
      date: new Date(),
      time: "",
      status: "scheduled"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Agenda</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={20} />
              Novo Agendamento
            </Button>
          </DialogTrigger>
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
                  <Label className="text-right">
                    Data
                  </Label>
                  <div className="col-span-3 border rounded-md p-3">
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
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="canceled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar Agendamento</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Calendar Section */}
        <Card className="md:col-span-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendário
              </CardTitle>
              <Select value={view} onValueChange={(value: "day" | "week" | "month") => setView(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Dia</SelectItem>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              locale={ptBR}
            />
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Agendamentos do Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col space-y-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{appointment.time}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      appointment.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {appointment.status === 'scheduled' ? 'Agendado' :
                       appointment.status === 'completed' ? 'Concluído' : 'Cancelado'}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{appointment.title}</span>
                  <span className="text-sm text-muted-foreground">{appointment.clientName}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

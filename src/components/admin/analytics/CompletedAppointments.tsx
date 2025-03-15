
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Calendar, Clock, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Appointment } from "@/types/appointment";
import { AppointmentStatusBadge } from "../agenda/AppointmentStatusBadge";
import { PaymentStatusBadge } from "../agenda/PaymentStatusBadge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Dados fictícios para demonstração - em um app real viriam de uma API
const completedAppointments: (Appointment & { completedAt: Date, professional: string, duration: number })[] = [
  {
    id: 1,
    title: "Consulta Inicial",
    date: new Date(2023, 8, 15),
    completedAt: new Date(2023, 8, 15, 15, 45),
    status: "completed",
    clientName: "Mariana Silva",
    phoneNumber: "(11) 99876-5432",
    time: "14:30",
    payment: "paid",
    professional: "Dr. Ricardo Alves",
    duration: 45
  },
  {
    id: 2,
    title: "Acompanhamento Mensal",
    date: new Date(2023, 9, 3),
    completedAt: new Date(2023, 9, 3, 11, 0),
    status: "completed",
    clientName: "Carlos Eduardo",
    phoneNumber: "(11) 97654-3210",
    time: "10:00",
    payment: "paid",
    professional: "Dra. Amanda Costa",
    duration: 30
  },
  {
    id: 3,
    title: "Avaliação Detalhada",
    date: new Date(2023, 9, 10),
    completedAt: new Date(2023, 9, 10, 16, 15),
    status: "completed",
    clientName: "Juliana Mendes",
    phoneNumber: "(11) 95555-4444",
    time: "15:15",
    payment: "paid",
    professional: "Dr. Ricardo Alves",
    duration: 60
  },
  {
    id: 4,
    title: "Consulta de Rotina",
    date: new Date(2023, 9, 17),
    completedAt: new Date(2023, 9, 17, 14, 50),
    status: "completed",
    clientName: "Felipe Santos",
    phoneNumber: "(11) 93333-2222",
    time: "14:00",
    payment: "paid",
    professional: "Dra. Amanda Costa",
    duration: 45
  },
  {
    id: 5,
    title: "Sessão de Terapia",
    date: new Date(2023, 9, 24),
    completedAt: new Date(2023, 9, 24, 11, 30),
    status: "completed",
    clientName: "Helena Oliveira",
    phoneNumber: "(11) 98765-1234",
    time: "10:30",
    payment: "paid",
    professional: "Dra. Camila Sousa",
    duration: 60
  }
];

// Dados estatísticos
const stats = {
  totalCompleted: completedAppointments.length,
  averageDuration: Math.round(completedAppointments.reduce((acc, appt) => acc + appt.duration, 0) / completedAppointments.length),
  satisfactionRate: 95,
  professionals: [
    { name: "Dr. Ricardo Alves", count: 2 },
    { name: "Dra. Amanda Costa", count: 2 },
    { name: "Dra. Camila Sousa", count: 1 }
  ]
};

const CompletedAppointments = () => {
  const [timeFilter, setTimeFilter] = useState<"all" | "month" | "week">("all");
  
  // Filtragem por período (em uma aplicação real, isso seria feito no backend)
  const getFilteredAppointments = () => {
    const now = new Date();
    
    switch (timeFilter) {
      case "week":
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return completedAppointments.filter(a => a.completedAt >= oneWeekAgo);
      case "month":
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return completedAppointments.filter(a => a.completedAt >= oneMonthAgo);
      default:
        return completedAppointments;
    }
  };
  
  const filteredAppointments = getFilteredAppointments();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Atendimentos Realizados</h2>
        <Select value={timeFilter} onValueChange={(value: "all" | "month" | "week") => setTimeFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="month">Último mês</SelectItem>
            <SelectItem value="week">Última semana</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Estatísticas dos atendimentos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Atendimentos</p>
                <p className="text-2xl font-bold">{filteredAppointments.length}</p>
              </div>
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Duração Média</p>
                <p className="text-2xl font-bold">{stats.averageDuration} min</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Satisfação</p>
                <p className="text-2xl font-bold">{stats.satisfactionRate}%</p>
              </div>
              <User className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Profissionais</p>
                <p className="text-2xl font-bold">{stats.professionals.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Lista de atendimentos concluídos */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Atendimentos</CardTitle>
          <CardDescription>
            {filteredAppointments.length} atendimentos concluídos {timeFilter !== "all" ? (timeFilter === "week" ? "na última semana" : "no último mês") : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{appointment.title}</span>
                        <AppointmentStatusBadge status={appointment.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{appointment.clientName}</p>
                      <p className="text-sm">Profissional: {appointment.professional}</p>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.time} ({appointment.duration} min)</span>
                      </div>
                      <div>
                        <PaymentStatusBadge payment={appointment.payment} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                    Concluído {formatDistanceToNow(appointment.completedAt, { addSuffix: true, locale: ptBR })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum atendimento concluído no período selecionado.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletedAppointments;


import { Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment } from "@/types/appointment";
import { getStatusColor, getStatusLabel } from "@/utils/appointment-utils";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

interface AppointmentListProps {
  appointments: Appointment[];
  selectedDate: Date | undefined;
  view: "day" | "week" | "month";
}

export const AppointmentList = ({ appointments, selectedDate, view }: AppointmentListProps) => {
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

  return (
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
                className="flex flex-col space-y-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
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
  );
};

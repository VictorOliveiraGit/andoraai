
import { Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment } from "@/types/appointment";
import { getStatusColor, getStatusLabel } from "@/utils/appointment-utils";

interface AppointmentListProps {
  appointments: Appointment[];
  selectedDate: Date | undefined;
}

export const AppointmentList = ({ appointments, selectedDate }: AppointmentListProps) => {
  // Filter appointments for the currently selected date
  const filteredAppointments = appointments.filter(appointment => {
    if (!selectedDate) return false;
    
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.getDate() === selectedDate.getDate() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <Card className="md:col-span-4">
      <CardHeader>
        <CardTitle>Agendamentos do Dia</CardTitle>
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
              Nenhum agendamento para este dia
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

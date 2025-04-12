
import { Card } from "@/components/ui/card";
import { Appointment } from "@/types/appointment";
import { AppointmentStatusBadge } from "@/components/admin/agenda/AppointmentStatusBadge";
import { PaymentStatusBadge } from "@/components/admin/agenda/PaymentStatusBadge";
import { Clock, Phone } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AppointmentCardProps {
  appointment: Appointment;
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        {/* Date sidebar */}
        <div className="bg-primary/5 p-4 sm:w-48 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start gap-2 border-b sm:border-b-0 sm:border-r border-gray-200">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              {format(new Date(appointment.date), "EEEE", { locale: ptBR })}
            </p>
            <p className="text-xl font-bold">
              {format(new Date(appointment.date), "dd 'de' MMM", { locale: ptBR })}
            </p>
          </div>
          <div className="flex items-center sm:mt-2">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="font-medium">{appointment.time}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-1">
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg">
                {appointment.title}
              </h3>
              <p className="text-muted-foreground">{appointment.clientName}</p>
              <div className="flex items-center mt-1">
                <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {appointment.phoneNumber}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:justify-end mt-2 sm:mt-0">
              <AppointmentStatusBadge status={appointment.status} />
              {appointment.payment !== "not_required" && (
                <PaymentStatusBadge payment={appointment.payment} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

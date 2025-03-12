
import { Phone } from "lucide-react";
import { Appointment } from "@/types/appointment";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";

interface AppointmentItemProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
}

export const AppointmentItem = ({ appointment, onClick }: AppointmentItemProps) => {
  return (
    <div
      key={appointment.id}
      className="flex flex-col space-y-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
      onClick={() => onClick(appointment)}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{appointment.time}</span>
        <AppointmentStatusBadge status={appointment.status} />
      </div>
      <span className="text-sm font-medium">{appointment.title}</span>
      <span className="text-sm text-muted-foreground">{appointment.clientName}</span>
      {appointment.phoneNumber && (
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Phone size={12} /> {appointment.phoneNumber}
        </span>
      )}
      {appointment.payment && appointment.payment !== "not_required" && (
        <div className="mt-2">
          <PaymentStatusBadge payment={appointment.payment} />
        </div>
      )}
    </div>
  );
};

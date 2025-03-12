
import { AppointmentStatus } from "@/types/appointment";
import { getStatusColor, getStatusLabel } from "@/utils/appointment-utils";

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

export const AppointmentStatusBadge = ({ status }: AppointmentStatusBadgeProps) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
};

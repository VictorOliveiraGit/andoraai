
import { AppointmentStatus } from "@/types/appointment";
import { cn } from "@/lib/utils";

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

export const AppointmentStatusBadge = ({ status }: AppointmentStatusBadgeProps) => {
  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      case "delayed":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "pending_payment":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "paid":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: AppointmentStatus) => {
    switch (status) {
      case "scheduled":
        return "Agendado";
      case "pending":
        return "Pendente";
      case "completed":
        return "Concluído";
      case "in-progress":
        return "Em Atendimento";
      case "canceled":
        return "Cancelado";
      case "delayed":
        return "Atrasado";
      case "pending_payment":
        return "Aguardando Pagamento";
      case "paid":
        return "Pago";
      default:
        return status;
    }
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", getStatusColor(status))}>
      {getStatusLabel(status)}
    </span>
  );
};

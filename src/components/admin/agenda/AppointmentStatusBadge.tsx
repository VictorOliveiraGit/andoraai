
import { AppointmentStatus, PaymentStatus } from "@/types/appointment";
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

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "not-required":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusLabel = (status: PaymentStatus) => {
    switch (status) {
      case "paid":
        return "Pago";
      case "pending":
        return "Pagamento Pendente";
      case "not-required":
        return "Sem Pagamento";
      default:
        return "Status Desconhecido";
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(status)}`}>
      {getPaymentStatusLabel(status)}
    </span>
  );
};

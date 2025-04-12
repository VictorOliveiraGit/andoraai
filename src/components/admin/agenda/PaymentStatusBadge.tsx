
import { PaymentStatus } from "@/types/appointment";
import { cn } from "@/lib/utils";
import { CreditCard, DollarSign } from "lucide-react";

interface PaymentStatusBadgeProps {
  payment?: PaymentStatus;
}

export const PaymentStatusBadge = ({ payment }: PaymentStatusBadgeProps) => {
  if (!payment || payment === "not_required") return null;
  
  const getPaymentColor = (payment: PaymentStatus) => {
    switch (payment) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "paid":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentLabel = (payment: PaymentStatus) => {
    switch (payment) {
      case "pending":
        return "Aguardando Pagamento";
      case "paid":
        return "Pago";
      default:
        return "";
    }
  };

  const getPaymentIcon = (payment: PaymentStatus) => {
    switch (payment) {
      case "pending":
        return <CreditCard className="h-3 w-3 mr-1" />;
      case "paid":
        return <DollarSign className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium flex items-center border", getPaymentColor(payment))}>
      {getPaymentIcon(payment)}
      {getPaymentLabel(payment)}
    </span>
  );
};

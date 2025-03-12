
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AppointmentDetailsProps {
  appointment: Appointment;
  onEdit: () => void;
  onStatusChange: (id: number, status: AppointmentStatus) => void;
  onPaymentStatusChange: (id: number, status: PaymentStatus) => void;
}

export const AppointmentDetails = ({
  appointment,
  onEdit,
  onStatusChange,
  onPaymentStatusChange
}: AppointmentDetailsProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{appointment.title}</h3>
            <p className="text-muted-foreground">{appointment.time}</p>
          </div>
          <Button variant="outline" size="sm" onClick={onEdit}>
            Editar
          </Button>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Cliente</p>
          <p>{appointment.clientName}</p>
        </div>
        
        {appointment.phoneNumber && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Telefone</p>
            <p>{appointment.phoneNumber}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Status do Agendamento</p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={appointment.status === "scheduled" ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange(appointment.id, "scheduled")}
              >
                Agendado
              </Button>
              <Button 
                variant={appointment.status === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange(appointment.id, "pending")}
              >
                Pendente
              </Button>
              <Button 
                variant={appointment.status === "in-progress" ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange(appointment.id, "in-progress")}
              >
                Em Andamento
              </Button>
              <Button 
                variant={appointment.status === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange(appointment.id, "completed")}
              >
                Concluído
              </Button>
              <Button 
                variant={appointment.status === "canceled" ? "destructive" : "outline"}
                size="sm"
                onClick={() => onStatusChange(appointment.id, "canceled")}
              >
                Cancelado
              </Button>
              <Button 
                variant={appointment.status === "delayed" ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange(appointment.id, "delayed")}
              >
                Atrasado
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Status de Pagamento</p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={appointment.paymentStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => onPaymentStatusChange(appointment.id, "pending")}
              >
                Pendente
              </Button>
              <Button 
                variant={appointment.paymentStatus === "paid" ? "default" : "outline"}
                size="sm"
                onClick={() => onPaymentStatusChange(appointment.id, "paid")}
              >
                Pago
              </Button>
              <Button 
                variant={appointment.paymentStatus === "not-required" ? "default" : "outline"}
                size="sm"
                onClick={() => onPaymentStatusChange(appointment.id, "not-required")}
              >
                Não Requerido
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import { useState, useEffect, ChangeEvent } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppointmentItem } from "./AppointmentItem";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment";
import { AppointmentEditForm } from "./AppointmentEditForm";

export interface AppointmentListProps {
  appointments: Appointment[];
  selectedDate: Date;
  view: "day" | "week" | "month";
  onStatusChange: (id: number, newStatus: AppointmentStatus) => void;
  onPaymentStatusChange: (id: number, newPaymentStatus: PaymentStatus) => void;
  onAppointmentUpdate: (updatedAppointment: Appointment) => void;
}

export const AppointmentList = ({
  appointments,
  selectedDate,
  view,
  onStatusChange,
  onPaymentStatusChange,
  onAppointmentUpdate
}: AppointmentListProps) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");

  useEffect(() => {
    let filtered = [...appointments];
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(appt => appt.status === statusFilter);
    }
    
    // Sort by time
    filtered.sort((a, b) => {
      const timeA = a.time.split(":").map(Number);
      const timeB = b.time.split(":").map(Number);
      
      if (timeA[0] !== timeB[0]) {
        return timeA[0] - timeB[0];
      } else {
        return timeA[1] - timeB[1];
      }
    });
    
    setFilteredAppointments(filtered);
  }, [appointments, statusFilter]);

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditingAppointment(null);
  };

  const handleEditClick = () => {
    if (selectedAppointment) {
      setEditingAppointment({ ...selectedAppointment });
    }
  };

  const handleStatusChange = (id: number, status: AppointmentStatus) => {
    onStatusChange(id, status);
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status });
    }
  };
  
  const handlePaymentStatusChange = (id: number, paymentStatus: PaymentStatus) => {
    onPaymentStatusChange(id, paymentStatus);
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, paymentStatus });
    }
  };

  const handleEditCancel = () => {
    setEditingAppointment(null);
  };

  const handleEditSave = () => {
    if (editingAppointment) {
      onAppointmentUpdate(editingAppointment);
      setSelectedAppointment(editingAppointment);
      setEditingAppointment(null);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editingAppointment) return;
    
    const { name, value } = e.target;
    setEditingAppointment({
      ...editingAppointment,
      [name]: value
    });
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editingAppointment) return;
    
    let value = e.target.value;
    // Remove any non-digit character
    value = value.replace(/\D/g, "");
    
    // Apply mask (XX) XXXXX-XXXX
    if (value.length <= 2) {
      value = value;
    } else if (value.length <= 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 11) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
    
    setEditingAppointment({
      ...editingAppointment,
      phoneNumber: value
    });
  };

  const handleStatusUpdate = (status: AppointmentStatus) => {
    if (!editingAppointment) return;
    
    setEditingAppointment({
      ...editingAppointment,
      status
    });
  };

  const handlePaymentStatusUpdate = (paymentStatus: PaymentStatus) => {
    if (!editingAppointment) return;
    
    setEditingAppointment({
      ...editingAppointment,
      paymentStatus
    });
  };

  return (
    <div className="md:col-span-4 h-full flex flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
        </h2>
        <div className="flex space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | "all")}
            className="border rounded-md px-3 py-1 text-sm"
          >
            <option value="all">Todos os status</option>
            <option value="scheduled">Agendado</option>
            <option value="pending">Pendente</option>
            <option value="in-progress">Em Andamento</option>
            <option value="completed">Concluído</option>
            <option value="canceled">Cancelado</option>
            <option value="delayed">Atrasado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow overflow-y-auto pr-1">
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-13rem)]">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentItem
                key={appointment.id}
                appointment={appointment}
                onClick={handleAppointmentClick}
              />
            ))
          ) : (
            <Card>
              <CardContent className="p-4 text-center text-muted-foreground">
                Nenhum agendamento encontrado para este dia ou filtro.
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {selectedAppointment && !editingAppointment && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{selectedAppointment.title}</h3>
                    <p className="text-muted-foreground">{selectedAppointment.time}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleEditClick}>
                    Editar
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Cliente</p>
                  <p>{selectedAppointment.clientName}</p>
                </div>
                
                {selectedAppointment.phoneNumber && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Telefone</p>
                    <p>{selectedAppointment.phoneNumber}</p>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Status do Agendamento</p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={selectedAppointment.status === "scheduled" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(selectedAppointment.id, "scheduled")}
                      >
                        Agendado
                      </Button>
                      <Button 
                        variant={selectedAppointment.status === "pending" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(selectedAppointment.id, "pending")}
                      >
                        Pendente
                      </Button>
                      <Button 
                        variant={selectedAppointment.status === "in-progress" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(selectedAppointment.id, "in-progress")}
                      >
                        Em Andamento
                      </Button>
                      <Button 
                        variant={selectedAppointment.status === "completed" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(selectedAppointment.id, "completed")}
                      >
                        Concluído
                      </Button>
                      <Button 
                        variant={selectedAppointment.status === "canceled" ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(selectedAppointment.id, "canceled")}
                      >
                        Cancelado
                      </Button>
                      <Button 
                        variant={selectedAppointment.status === "delayed" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(selectedAppointment.id, "delayed")}
                      >
                        Atrasado
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Status de Pagamento</p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={selectedAppointment.paymentStatus === "pending" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePaymentStatusChange(selectedAppointment.id, "pending")}
                      >
                        Pendente
                      </Button>
                      <Button 
                        variant={selectedAppointment.paymentStatus === "paid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePaymentStatusChange(selectedAppointment.id, "paid")}
                      >
                        Pago
                      </Button>
                      <Button 
                        variant={selectedAppointment.paymentStatus === "not-required" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePaymentStatusChange(selectedAppointment.id, "not-required")}
                      >
                        Não Requerido
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {editingAppointment && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Editar Agendamento</h3>
                
                <AppointmentEditForm 
                  appointment={editingAppointment}
                  onInputChange={handleInputChange}
                  onPhoneChange={handlePhoneChange}
                  onStatusChange={handleStatusUpdate}
                  onPaymentStatusChange={handlePaymentStatusUpdate}
                />
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={handleEditCancel}>Cancelar</Button>
                  <Button onClick={handleEditSave}>Salvar Alterações</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Appointment, AppointmentStatus, PaymentStatus } from "@/types/appointment";
import { AppointmentItem } from "./AppointmentItem";
import { AppointmentEditForm } from "./AppointmentEditForm";
import { AppointmentDetails } from "./AppointmentDetails";
import { AppointmentListHeader } from "./AppointmentListHeader";
import { useAppointmentFilter } from "@/hooks/useAppointmentFilter";

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
  const { filteredAppointments, statusFilter, setStatusFilter } = useAppointmentFilter(appointments);

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

  const handleEditSave = () => {
    if (editingAppointment) {
      onAppointmentUpdate(editingAppointment);
      setSelectedAppointment(editingAppointment);
      setEditingAppointment(null);
    }
  };

  return (
    <div className="md:col-span-4 h-full flex flex-col">
      <AppointmentListHeader 
        selectedDate={selectedDate}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow overflow-y-auto">
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
            <AppointmentDetails
              appointment={selectedAppointment}
              onEdit={handleEditClick}
              onStatusChange={handleStatusChange}
              onPaymentStatusChange={handlePaymentStatusChange}
            />
          )}

          {editingAppointment && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Editar Agendamento</h3>
                <AppointmentEditForm 
                  appointment={editingAppointment}
                  onInputChange={(e) => {
                    setEditingAppointment({
                      ...editingAppointment,
                      [e.target.name]: e.target.value
                    });
                  }}
                  onPhoneChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
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
                  }}
                  onStatusChange={(status) => {
                    setEditingAppointment({
                      ...editingAppointment,
                      status
                    });
                  }}
                  onPaymentStatusChange={(paymentStatus) => {
                    setEditingAppointment({
                      ...editingAppointment,
                      paymentStatus
                    });
                  }}
                />
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setEditingAppointment(null)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleEditSave}>
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};


import { useState } from "react";
import { Appointment, AppointmentStatus } from "@/types/appointment";
import { AppointmentItem } from "./AppointmentItem";
import { AppointmentStatusForm } from "./AppointmentStatusForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentEditForm } from "./AppointmentEditForm";
import { CalendarRange, Clock } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AppointmentListProps {
  appointments: Appointment[];
  selectedDate?: Date;
  view: "day" | "week" | "month";
  onStatusChange: (id: number, newStatus: AppointmentStatus) => void;
  onAppointmentUpdate: (appointment: Appointment) => void;
  isLoading?: boolean;
}

export const AppointmentList = ({ 
  appointments, 
  selectedDate, 
  view, 
  onStatusChange, 
  onAppointmentUpdate,
  isLoading = false,
}: AppointmentListProps) => {
  const [statusModalId, setStatusModalId] = useState<number | null>(null);
  const [editModalId, setEditModalId] = useState<number | null>(null);
  
  const filteredAppointments = selectedDate 
    ? appointments.filter(appointment => {
        const appDate = new Date(appointment.date);
        
        if (view === "day") {
          return (
            appDate.getDate() === selectedDate.getDate() &&
            appDate.getMonth() === selectedDate.getMonth() &&
            appDate.getFullYear() === selectedDate.getFullYear()
          );
        } else if (view === "week") {
          const startOfWeek = new Date(selectedDate);
          startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
          
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          
          return appDate >= startOfWeek && appDate <= endOfWeek;
        } else {
          return (
            appDate.getMonth() === selectedDate.getMonth() &&
            appDate.getFullYear() === selectedDate.getFullYear()
          );
        }
      })
    : appointments;

  // Group appointments by date
  const appointmentsByDate = filteredAppointments.reduce<{[key: string]: Appointment[]}>((acc, appointment) => {
    const dateKey = appointment.date.toISOString().split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(appointment);
    return acc;
  }, {});

  const openStatusModal = (id: number) => {
    setStatusModalId(id);
  };

  const closeStatusModal = () => {
    setStatusModalId(null);
  };
  
  const openEditModal = (id: number) => {
    setEditModalId(id);
  };
  
  const closeEditModal = () => {
    setEditModalId(null);
  };
  
  const appointmentToEdit = appointments.find(a => a.id === editModalId);

  // Format date key for display
  const formatDateHeading = (dateKey: string) => {
    const date = new Date(dateKey);
    return new Intl.DateTimeFormat('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="md:col-span-5 space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            <div className="flex items-center gap-2">
              <CalendarRange className="h-5 w-5 text-muted-foreground" />
              <span>Agendamentos</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="all" className="mb-4">
            <TabsList className="grid grid-cols-2 h-auto">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="today">Hoje</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <Clock className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Carregando agendamentos...</p>
                </div>
              ) : Object.keys(appointmentsByDate).length > 0 ? (
                Object.keys(appointmentsByDate)
                  .sort()
                  .map(dateKey => (
                    <div key={dateKey} className="mb-6">
                      <h3 className="font-medium text-muted-foreground mb-3 capitalize">
                        {formatDateHeading(dateKey)}
                      </h3>
                      <div className="space-y-3">
                        {appointmentsByDate[dateKey].map(appointment => (
                          <AppointmentItem
                            key={appointment.id}
                            appointment={appointment}
                            onStatusClick={() => openStatusModal(appointment.id)}
                            onEditClick={() => openEditModal(appointment.id)}
                          />
                        ))}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum agendamento encontrado.</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="today" className="mt-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <Clock className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Carregando agendamentos...</p>
                </div>
              ) : (() => {
                const today = new Date().toISOString().split('T')[0];
                return appointmentsByDate[today] ? (
                  <div className="space-y-3">
                    {appointmentsByDate[today].map(appointment => (
                      <AppointmentItem
                        key={appointment.id}
                        appointment={appointment}
                        onStatusClick={() => openStatusModal(appointment.id)}
                        onEditClick={() => openEditModal(appointment.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhum agendamento para hoje.</p>
                  </div>
                );
              })()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Status Change Modal */}
      {statusModalId && (
        <Dialog open={true} onOpenChange={() => closeStatusModal()}>
          <DialogContent>
            <AppointmentStatusForm
              appointment={appointments.find(a => a.id === statusModalId)!}
              onClose={closeStatusModal}
              onStatusChange={onStatusChange}
            />
          </DialogContent>
        </Dialog>
      )}
      
      {/* Edit Appointment Modal */}
      {editModalId && appointmentToEdit && (
        <AppointmentEditForm
          appointment={appointmentToEdit}
          isOpen={true}
          onClose={closeEditModal}
          onSubmit={onAppointmentUpdate}
        />
      )}
    </div>
  );
};

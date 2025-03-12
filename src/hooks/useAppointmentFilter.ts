
import { useState, useEffect } from "react";
import { Appointment, AppointmentStatus } from "@/types/appointment";

export const useAppointmentFilter = (appointments: Appointment[]) => {
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");

  useEffect(() => {
    let filtered = [...appointments];
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(appt => appt.status === statusFilter);
    }
    
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

  return {
    filteredAppointments,
    statusFilter,
    setStatusFilter
  };
};

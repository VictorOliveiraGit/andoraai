
import { Appointment, AppointmentStatus } from "@/types/appointment";
import { ApiAppointment } from "@/api/apiClient";

/**
 * Maps an API appointment to our application's appointment format
 */
export function mapApiAppointmentToAppointment(apiAppointment: ApiAppointment): Appointment {
  // Parse the date string from YYYY-MM-DD format
  const appointmentDate = new Date(apiAppointment.data);
  
  // Extract just the time from the hour strings (assuming format like "10:00:00")
  const startTime = apiAppointment.hora_inicio.substring(0, 5); // "10:00"
  
  return {
    id: Math.floor(Math.random() * 10000), // Generate a temporary ID (in a real app, this would come from API)
    title: `Consulta - ${apiAppointment.loja}`,
    date: appointmentDate,
    status: "scheduled" as AppointmentStatus, // Default to scheduled 
    clientName: apiAppointment.cliente,
    phoneNumber: "", // The API doesn't provide a phone number
    time: startTime,
    payment: "pending", // Default payment status as the API doesn't provide it
  };
}

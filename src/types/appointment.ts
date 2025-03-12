
export interface Appointment {
  id: number;
  title: string;
  date: Date;
  status: AppointmentStatus;
  clientName: string;
  phoneNumber?: string;
  time: string;
}

export interface NewAppointmentForm {
  title: string;
  clientName: string;
  phoneNumber: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
}

export type AppointmentStatus = 
  | "scheduled" 
  | "pending" 
  | "completed" 
  | "in-progress" 
  | "canceled" 
  | "delayed"
  | "pending_payment"
  | "paid";


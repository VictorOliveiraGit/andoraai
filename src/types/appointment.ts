
export interface Appointment {
  id: number;
  title: string;
  date: Date;
  status: "scheduled" | "pending" | "delayed" | "canceled";
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
  status: "scheduled" | "pending" | "delayed" | "canceled";
}

export type AppointmentStatus = "scheduled" | "pending" | "delayed" | "canceled";

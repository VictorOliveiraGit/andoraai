
export interface Appointment {
  id: number;
  title: string;
  date: Date;
  status: AppointmentStatus;
  clientName: string;
  phoneNumber?: string;
  time: string;
  paymentStatus?: PaymentStatus;
}

export interface NewAppointmentForm {
  title: string;
  clientName: string;
  phoneNumber: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
  paymentStatus?: PaymentStatus;
}

export type AppointmentStatus = "scheduled" | "pending" | "completed" | "in-progress" | "canceled" | "delayed";
export type PaymentStatus = "pending" | "paid" | "not-required";

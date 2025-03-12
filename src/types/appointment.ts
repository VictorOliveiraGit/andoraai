
export type AppointmentStatus = "scheduled" | "completed" | "canceled" | "pending" | "confirmed" | "no_show" | "in-progress" | "delayed" | "pending_payment" | "paid";
export type PaymentStatus = "pending" | "paid" | "refunded" | "pending_payment" | "not_required";

export interface Appointment {
  id: number;
  title: string;
  date: Date;
  status: AppointmentStatus;
  payment: PaymentStatus;
  clientName: string;
  phoneNumber: string;
  time: string;
}

export interface NewAppointmentForm {
  title: string;
  clientName: string;
  phoneNumber: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
  payment: PaymentStatus;
}

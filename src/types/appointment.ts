
export type AppointmentStatus = "scheduled" | "completed" | "canceled" | "pending" | "confirmed" | "no_show";
export type PaymentStatus = "pending" | "paid" | "refunded" | "pending_payment";

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

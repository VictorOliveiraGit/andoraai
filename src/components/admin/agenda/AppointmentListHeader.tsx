
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentStatus } from "@/types/appointment";

interface AppointmentListHeaderProps {
  selectedDate: Date;
  statusFilter: AppointmentStatus | "all";
  onStatusFilterChange: (value: AppointmentStatus | "all") => void;
}

export const AppointmentListHeader = ({
  selectedDate,
  statusFilter,
  onStatusFilterChange
}: AppointmentListHeaderProps) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
      <h2 className="text-xl font-semibold">
        {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
      </h2>
      <div className="flex space-x-2">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as AppointmentStatus | "all")}
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
  );
};

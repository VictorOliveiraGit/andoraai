
import { Button } from "@/components/ui/button";

interface TablePaginationProps {
  filteredCount: number;
  totalCount: number;
}

export const TablePagination = ({ filteredCount, totalCount }: TablePaginationProps) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-500">
        Mostrando <span className="font-medium">{filteredCount}</span> de <span className="font-medium">{totalCount}</span> produtos
      </span>
      <div className="flex space-x-1">
        <Button variant="outline" size="sm" disabled>Anterior</Button>
        <Button variant="outline" size="sm" className="bg-secondary text-white">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">Próximo</Button>
      </div>
    </div>
  );
};

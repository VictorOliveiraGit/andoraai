
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Filter, Search } from "lucide-react";

interface AppointmentHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  handleBackToAgenda: () => void;
}

export const AppointmentHeader = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  handleBackToAgenda,
}: AppointmentHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-4 p-2" 
          onClick={handleBackToAgenda}
          aria-label="Voltar para agenda"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Todos os Agendamentos</h1>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou título..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-primary/10" : ""}
          aria-label="Mostrar filtros"
        >
          <Filter size={18} />
        </Button>
      </div>
    </div>
  );
};

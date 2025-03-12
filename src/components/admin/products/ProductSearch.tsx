
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  uniqueCategories: string[];
}

export const ProductSearch = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  uniqueCategories
}: ProductSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar produto..."
          className="pl-9 pr-4 py-2 border rounded-md w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <select
        className="border rounded-md px-3 py-2"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="todas">Todas as Categorias</option>
        {uniqueCategories.map((category, index) => (
          <option key={index} value={category.toLowerCase()}>
            {category}
          </option>
        ))}
      </select>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        Filtros
      </Button>
    </div>
  );
};

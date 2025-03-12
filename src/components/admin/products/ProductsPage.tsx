
import { useState } from "react";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewProductModal, Product } from "./NewProductModal";
import { ProductsHeader } from "./ProductsHeader";
import { ProductsStats } from "./ProductsStats";
import { ProductsTable } from "./ProductsTable";
import { toast } from "sonner";

// Dados de exemplo
const initialProductsData = [
  { id: 1, nome: "Produto Premium", categoria: "Assinatura", preco: 1250.00, estoque: 0, vendas: 156, status: "Ativo" },
  { id: 2, nome: "Serviço Anual", categoria: "Serviço", preco: 3500.00, estoque: 0, vendas: 89, status: "Ativo" },
  { id: 3, nome: "Produto Basic", categoria: "Assinatura", preco: 550.00, estoque: 0, vendas: 327, status: "Ativo" },
  { id: 4, nome: "Plano Mensal", categoria: "Assinatura", preco: 150.00, estoque: 0, vendas: 512, status: "Ativo" },
  { id: 5, nome: "Produto Standard", categoria: "Produto Físico", preco: 850.00, estoque: 45, vendas: 78, status: "Baixo Estoque" },
  { id: 6, nome: "Curso Online", categoria: "Digital", preco: 750.00, estoque: 0, vendas: 114, status: "Ativo" },
  { id: 7, nome: "Acessório Premium", categoria: "Produto Físico", preco: 320.00, estoque: 2, vendas: 42, status: "Baixo Estoque" },
  { id: 8, nome: "E-book Completo", categoria: "Digital", preco: 120.00, estoque: 0, vendas: 231, status: "Ativo" },
];

export const ProductsPage = () => {
  const [productsData, setProductsData] = useState<Product[]>(initialProductsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  
  // Unique categories for filter and form
  const uniqueCategories = [...new Set(productsData.map(product => product.categoria))];
  
  // Filtra os dados com base no termo de busca e categoria selecionada
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = 
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "todas" || 
      product.categoria.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (product: Product) => {
    setProductsData(prevProducts => [...prevProducts, product]);
  };

  const handleDeleteProduct = (id: number) => {
    setProductsData(prevProducts => prevProducts.filter(product => product.id !== id));
    toast.success("Produto removido com sucesso!");
  };

  return (
    <div className="space-y-6">
      <ProductsHeader 
        openNewProductModal={() => setIsNewProductModalOpen(true)} 
      />

      <ProductsStats productsData={productsData} />

      <ProductsTable 
        filteredProducts={filteredProducts}
        productsData={productsData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        uniqueCategories={uniqueCategories}
        handleDeleteProduct={handleDeleteProduct}
      />
      
      <NewProductModal 
        isOpen={isNewProductModalOpen}
        onClose={() => setIsNewProductModalOpen(false)}
        onAddProduct={handleAddProduct}
        categories={uniqueCategories}
      />
    </div>
  );
};


export interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  vendas: number;
  status: string;
}

export type ProductStatus = 'Ativo' | 'Inativo' | 'Baixo Estoque';

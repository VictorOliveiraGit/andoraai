
interface ProductStatusBadgeProps {
  status: string;
}

export const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  let bgColor = "";
  let textColor = "";
  
  switch(status) {
    case "Ativo":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "Baixo Estoque":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      break;
    case "Inativo":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
  }
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

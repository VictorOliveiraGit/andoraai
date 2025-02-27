
import { User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProfileFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

export const ProfileForm = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
}: ProfileFormProps) => {
  const handleSaveSettings = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <div className="flex items-center gap-2">
          <User size={20} className="text-gray-500" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <div className="flex items-center gap-2">
          <Mail size={20} className="text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <div className="flex items-center gap-2">
          <Phone size={20} className="text-gray-500" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          />
        </div>
      </div>

      <Button 
        onClick={handleSaveSettings}
        className="w-full mt-4"
      >
        Salvar Alterações
      </Button>
    </div>
  );
};

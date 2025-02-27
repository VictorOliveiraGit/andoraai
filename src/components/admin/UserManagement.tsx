
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { users } from "@/config/admin";

export const UserManagement = () => {
  const handleActivateUser = (userId: number) => {
    toast.success("Link de ativação enviado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${user.active ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => handleActivateUser(user.id)}
                className="flex items-center gap-2"
              >
                {user.active ? <UserCheck className="text-green-500" /> : <UserX className="text-red-500" />}
                <LinkIcon size={16} />
                Enviar Link
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

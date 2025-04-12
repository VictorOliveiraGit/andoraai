
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX, Link as LinkIcon, Plus, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { users } from "@/config/admin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const UserManagement = () => {
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [userActivationDialog, setUserActivationDialog] = useState<number | null>(null);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
  });

  const handleActivateUser = (userId: number) => {
    setUserActivationDialog(userId);
  };

  const confirmActivation = () => {
    if (userActivationDialog) {
      toast({
        title: "Sucesso",
        description: "Link de ativação enviado com sucesso!",
        closable: true,
      });
      setUserActivationDialog(null);
    }
  };

  const handleAddUser = () => {
    setOpenUserDialog(true);
  };

  const handleSaveUser = () => {
    toast({
      title: "Sucesso",
      description: `Usuário ${newUserData.name} adicionado com sucesso!`,
      closable: true,
    });
    setNewUserData({ name: "", email: "" });
    setOpenUserDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
        <Button onClick={handleAddUser} className="flex items-center gap-2">
          <Plus size={16} />
          Adicionar Usuário
        </Button>
      </div>
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

      {/* Add User Dialog */}
      <Dialog open={openUserDialog} onOpenChange={setOpenUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha os dados para adicionar um novo usuário ao sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={newUserData.name}
                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenUserDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveUser}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Activation Dialog */}
      <Dialog open={!!userActivationDialog} onOpenChange={() => setUserActivationDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Link de Ativação</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja enviar um link de ativação para este usuário?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserActivationDialog(null)}>
              Cancelar
            </Button>
            <Button onClick={confirmActivation}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

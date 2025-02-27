
import { Card } from "@/components/ui/card";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileForm } from "./ProfileForm";

interface SettingsProps {
  avatar: string;
  setAvatar: (avatar: string) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

export const Settings = ({
  avatar,
  setAvatar,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
}: SettingsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configurações da Conta</h2>
      <Card className="p-6">
        <div className="space-y-6">
          <ProfileAvatar 
            avatar={avatar}
            setAvatar={setAvatar}
          />
          <ProfileForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
        </div>
      </Card>
    </div>
  );
};


import { Card } from "@/components/ui/card";
import { ProfileAvatar } from "@/components/admin/ProfileAvatar";
import { ProfileForm } from "@/components/admin/ProfileForm";
import { useAdmin } from "@/contexts/AdminContext";

const SettingsContent = () => {
  const { 
    avatar, 
    setAvatar, 
    name, 
    setName, 
    email, 
    setEmail, 
    phone, 
    setPhone 
  } = useAdmin();
  
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

export default SettingsContent;

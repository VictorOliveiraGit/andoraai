
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Upload, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setIsModalOpen(true);
        // Reset crop values
        setCropPosition({ x: 0, y: 0 });
        setZoom(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar("/placeholder.svg");
    toast.success("Avatar removido com sucesso!");
  };

  const handleSaveCrop = () => {
    if (!imageRef.current || !tempImage) return;
    
    try {
      // Apply cropping
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // We'll create a simple crop by drawing the image with translation
      // For a more sophisticated crop, you might need a dedicated library
      const img = imageRef.current;
      const size = 150; // final size
      
      canvas.width = size;
      canvas.height = size;
      
      // Draw the image with the crop position and zoom
      ctx.translate(-cropPosition.x, -cropPosition.y);
      ctx.scale(zoom, zoom);
      ctx.drawImage(img, 0, 0);
      
      // Get the output
      const croppedImageDataUrl = canvas.toDataURL("image/jpeg");
      setAvatar(croppedImageDataUrl);
      setIsModalOpen(false);
      setTempImage(null);
      toast.success("Avatar atualizado com sucesso!");
    } catch (error) {
      console.error("Error cropping image:", error);
      toast.error("Erro ao recortar a imagem. Tente novamente.");
    }
  };

  const handleMove = (direction: "up" | "down" | "left" | "right") => {
    const step = 10;
    setCropPosition(prev => {
      switch (direction) {
        case "up":
          return { ...prev, y: prev.y - step };
        case "down":
          return { ...prev, y: prev.y + step };
        case "left":
          return { ...prev, x: prev.x - step };
        case "right":
          return { ...prev, x: prev.x + step };
        default:
          return prev;
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configurações da Conta</h2>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={avatar} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full object-cover"
              />
              {avatar !== "/placeholder.svg" && (
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
                  onClick={handleDeleteAvatar}
                >
                  <Trash size={16} />
                </Button>
              )}
            </div>
            <div>
              <Button variant="outline" className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mr-2" size={20} />
                Alterar Avatar
              </Button>
            </div>
          </div>

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
              onClick={() => toast.success("Configurações salvas com sucesso!")}
              className="w-full mt-4"
            >
              Salvar Alterações
            </Button>
          </div>
        </div>
      </Card>

      {/* Image Crop Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajuste seu Avatar</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-[200px] h-[200px] border-2 border-primary rounded-full overflow-hidden">
              {tempImage && (
                <div 
                  style={{ 
                    transform: `translate(${-cropPosition.x}px, ${-cropPosition.y}px) scale(${zoom})`,
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                  }}
                >
                  <img
                    ref={imageRef}
                    src={tempImage}
                    alt="Imagem para recorte"
                    className="max-w-none"
                    style={{
                      transformOrigin: 'top left',
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2 w-full">
              <div className="flex justify-between items-center">
                <span className="text-sm">Zoom:</span>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                  >
                    -
                  </Button>
                  <span>{zoom.toFixed(1)}x</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setZoom(prev => Math.min(3, prev + 0.1))}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" onClick={() => handleMove("left")}>
                  ←
                </Button>
                <div className="grid grid-rows-2 gap-2">
                  <Button variant="outline" onClick={() => handleMove("up")}>
                    ↑
                  </Button>
                  <Button variant="outline" onClick={() => handleMove("down")}>
                    ↓
                  </Button>
                </div>
                <Button variant="outline" onClick={() => handleMove("right")}>
                  →
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsModalOpen(false);
                setTempImage(null);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveCrop}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

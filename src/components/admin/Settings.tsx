
import { useState, useRef, useEffect } from "react";
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
  DialogDescription,
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
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startOffsetRef = useRef({ x: 0, y: 0 });

  // Reset image when opening modal
  useEffect(() => {
    if (isModalOpen && tempImage) {
      setCropPosition({ x: 0, y: 0 });
    }
  }, [isModalOpen, tempImage]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setIsModalOpen(true);
        setCropPosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar("/placeholder.svg");
    toast.success("Avatar removido com sucesso!");
  };

  const handleSaveCrop = () => {
    if (!imageRef.current || !tempImage || !containerRef.current) return;
    
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const img = imageRef.current;
      const container = containerRef.current;
      const size = 150; // final size
      
      canvas.width = size;
      canvas.height = size;
      
      // Calculate the crop area based on the container dimensions
      const containerSize = container.offsetWidth;
      
      // Draw the image with the current position
      ctx.drawImage(
        img,
        -cropPosition.x, -cropPosition.y, // Source position
        containerSize, containerSize, // Source dimensions (square crop)
        0, 0, // Destination position
        size, size // Destination dimensions
      );
      
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

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startOffsetRef.current = { ...cropPosition };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    
    setCropPosition({
      x: startOffsetRef.current.x - deltaX,
      y: startOffsetRef.current.y - deltaY
    });
    
    e.preventDefault();
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
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

      {/* Improved Image Crop Modal with 2D Mouse Drag */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajuste seu Avatar</DialogTitle>
            <DialogDescription>
              Clique e arraste para posicionar a imagem no formato que desejar.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4">
            <div 
              ref={containerRef}
              className="relative w-[200px] h-[200px] border-2 border-primary rounded-full overflow-hidden cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleDragEnd}
            >
              {tempImage && (
                <div 
                  style={{ 
                    transform: `translate(${-cropPosition.x}px, ${-cropPosition.y}px)`,
                    position: 'absolute',
                    width: 'auto',
                    height: 'auto',
                  }}
                >
                  <img
                    ref={imageRef}
                    src={tempImage}
                    alt="Imagem para recorte"
                    className="max-w-none"
                    style={{ display: 'block' }}
                    draggable="false"
                    onLoad={(e) => {
                      // Centralize imagem quando carregar
                      if (containerRef.current) {
                        const img = e.currentTarget;
                        const container = containerRef.current;
                        const initialX = (img.naturalWidth - container.offsetWidth) / 2;
                        const initialY = (img.naturalHeight - container.offsetHeight) / 2;
                        setCropPosition({ x: initialX, y: initialY });
                      }
                    }}
                  />
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-500">
              Arraste a imagem para ajustar a posição
            </p>
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


import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Trash, Eye } from "lucide-react";
import { toast } from "sonner";
import { ImageCropper } from "@/components/modals/ImageCropper";
import { ImageViewer } from "@/components/modals/ImageViewer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfileAvatarProps {
  avatar: string;
  setAvatar: (avatar: string) => void;
}

export const ProfileAvatar = ({ avatar, setAvatar }: ProfileAvatarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);

  // Create a reference to the hidden file input element using useRef instead of useState
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleButtonClick = () => {
    // Trigger the hidden file input click event
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
      // Reset the input value so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar("/placeholder.svg");
    toast.success("Avatar removido com sucesso!");
  };

  const handleSaveCroppedImage = (croppedImage: string) => {
    setAvatar(croppedImage);
    setIsModalOpen(false);
    setTempImage(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTempImage(null);
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
            <img 
              src={avatar} 
              alt="Avatar" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          {avatar !== "/placeholder.svg" && (
            <div className="absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsViewModalOpen(true)}
                    className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white hover:scale-110 transition-all"
                  >
                    <Eye size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Visualizar</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDeleteAvatar}
                    className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-destructive/90 hover:text-white hover:scale-110 transition-all"
                  >
                    <Trash size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Excluir</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
        
        <div>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
            aria-label="Selecionar imagem de avatar"
          />
          
          {/* Visible styled button */}
          <Button 
            variant="default" 
            onClick={handleButtonClick}
            className="group bg-primary hover:bg-primary/90 text-white transition-all duration-300"
          >
            <Upload className="mr-2 text-white transition-transform group-hover:scale-110" size={20} />
            <span className="text-white">Alterar Avatar</span>
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Clique para fazer upload de uma nova imagem
          </p>
        </div>
      </div>

      <ImageCropper 
        isOpen={isModalOpen}
        onClose={closeModal}
        tempImage={tempImage}
        onSave={handleSaveCroppedImage}
      />

      <ImageViewer 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        imageSrc={avatar}
      />
    </TooltipProvider>
  );
};

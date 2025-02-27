
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Trash, Eye } from "lucide-react";
import { toast } from "sonner";
import { ImageCropper } from "./ImageCropper";
import { ImageViewer } from "./ImageViewer";
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

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
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
      <div className="flex items-center gap-4">
        <div className="relative group">
          <img 
            src={avatar} 
            alt="Avatar" 
            className="w-24 h-24 rounded-full object-cover"
          />
          {avatar !== "/placeholder.svg" && (
            <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                    onClick={() => setIsViewModalOpen(true)}
                  >
                    <Eye size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visualizar</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                    onClick={handleDeleteAvatar}
                  >
                    <Trash size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Excluir</p>
                </TooltipContent>
              </Tooltip>
            </div>
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

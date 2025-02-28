
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

export const ImageViewer = ({ isOpen, onClose, imageSrc }: ImageViewerProps) => {
  // Add body class when modal is open to prevent scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-black/95 border-none">
        <DialogHeader className="p-4 text-white/90 flex flex-row items-center justify-between">
          <DialogTitle className="text-white/90">Visualizar Avatar</DialogTitle>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="h-8 w-8 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/20"
          >
            <X size={18} />
            <span className="sr-only">Fechar</span>
          </Button>
        </DialogHeader>
        
        <div className="flex items-center justify-center p-4 md:p-8 transition-all duration-300 animate-fade-in">
          <img 
            src={imageSrc} 
            alt="Avatar" 
            className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
        
        <DialogFooter className="p-4 bg-black/40 backdrop-blur-sm">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-colors"
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

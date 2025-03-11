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

/**
 * ImageViewer Component Props
 * @interface ImageViewerProps
 * @property {boolean} isOpen - Controls the visibility of the modal
 * @property {function} onClose - Callback function to close the modal
 * @property {string} imageSrc - URL of the image to be displayed
 */
interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

/**
 * ImageViewer Component
 * 
 * A modal component that displays an image in a fullscreen view
 * with a dark background and animation effects.
 * 
 * @param {ImageViewerProps} props - Component props
 * @returns {JSX.Element} The rendered ImageViewer component
 */
export const ImageViewer = ({ isOpen, onClose, imageSrc }: ImageViewerProps) => {
  // --------------------
  // Effects
  // --------------------
  
  /**
   * Prevents body scrolling when modal is open
   * and restores scrolling when modal is closed
   */
  useEffect(() => {
    // Add/remove modal-open class to body when modal visibility changes
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup function to ensure class is removed when component unmounts
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);
  
  // --------------------
  // Render
  // --------------------
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-black/95 border-none">
        {/* Header with close button */}
        <DialogHeader className="p-4 text-white/90 flex flex-row items-center justify-between">
          <DialogTitle className="text-white/90">Visualizar Avatar</DialogTitle>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="h-8 w-8 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/20"
            aria-label="Fechar modal"
          >
            <X size={18} />
            <span className="sr-only">Fechar</span>
          </Button>
        </DialogHeader>
        
        {/* Image container with animation */}
        <div className="flex items-center justify-center p-4 md:p-8 transition-all duration-300 animate-fade-in">
          <img 
            src={imageSrc} 
            alt="Avatar" 
            className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
        
        {/* Footer with close button and glass effect background */}
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

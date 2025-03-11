import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ImageCropperProps {
  isOpen: boolean;
  onClose: () => void;
  tempImage: string | null;
  onSave: (croppedImage: string) => void;
}

export const ImageCropper = ({
  isOpen,
  onClose,
  tempImage,
  onSave,
}: ImageCropperProps) => {
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen && tempImage) {
      setCropPosition({ x: 0, y: 0 });
    }
  }, [isOpen, tempImage]);

  const handleSaveCrop = () => {
    if (!imageRef.current || !tempImage || !containerRef.current) return;
    
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const img = imageRef.current;
      const container = containerRef.current;
      const size = 300; // final size
      
      canvas.width = size;
      canvas.height = size;
      
      // Calculate the crop area based on the container dimensions
      const containerSize = container.offsetWidth;
      
      // Draw the image with the current position
      ctx.drawImage(
        img,
        cropPosition.x, cropPosition.y, // Source position
        containerSize, containerSize, // Source dimensions
        0, 0, // Destination position
        size, size // Destination dimensions
      );
      
      const croppedImageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
      onSave(croppedImageDataUrl);
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

  // Add touch event handlers for mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      startPosRef.current = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      };
      startOffsetRef.current = { ...cropPosition };
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - startPosRef.current.x;
    const deltaY = e.touches[0].clientY - startPosRef.current.y;
    
    setCropPosition({
      x: startOffsetRef.current.x - deltaX,
      y: startOffsetRef.current.y - deltaY
    });
    
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>Ajuste seu Avatar</DialogTitle>
          <DialogDescription>
            Clique e arraste para posicionar a imagem no formato que desejar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <div 
            ref={containerRef}
            className="relative w-[300px] h-[300px] border-2 border-primary rounded-full overflow-hidden cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {tempImage && (
              <img
                ref={imageRef}
                src={tempImage}
                alt="Imagem para recorte"
                className="max-w-none"
                style={{
                  transform: `translate(${-cropPosition.x}px, ${-cropPosition.y}px)`,
                  position: 'absolute',
                }}
                draggable="false"
                onLoad={(e) => {
                  if (containerRef.current) {
                    const img = e.currentTarget;
                    const container = containerRef.current;
                    
                    // Center image initially
                    const containerSize = container.offsetWidth;
                    const initialX = (img.naturalWidth - containerSize) / 2;
                    const initialY = (img.naturalHeight - containerSize) / 2;
                    
                    // Ensure initialX and initialY are not negative
                    setCropPosition({ 
                      x: Math.max(0, initialX), 
                      y: Math.max(0, initialY)
                    });
                  }
                }}
              />
            )}
          </div>
          
          <p className="text-sm text-gray-500">
            Arraste a imagem para ajustar a posição
          </p>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button onClick={handleSaveCrop}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from "@/components/ui/button";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

const ImageModal = ({ isOpen, onClose, images, initialIndex = 0 }: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Set initial index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-[90vw] max-h-[90vh] p-0 bg-black/90 border-none"
      >
        <VisuallyHidden>
          <DialogTitle>Image Gallery</DialogTitle>
          <DialogDescription>
            Browse through the feature images. Use arrow keys or buttons to navigate.
          </DialogDescription>
        </VisuallyHidden>
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/20 p-2 text-white hover:bg-black/40"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          {/* Image display */}
          <div className="flex items-center justify-center h-full w-full">
            <img 
              src={images[currentIndex]} 
              alt={`Feature image ${currentIndex + 1}`} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
          
          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-none h-12 w-12 rounded-full flex items-center justify-center z-10 p-0"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              
              <Button
                onClick={handleNext}
                variant="outline"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-none h-12 w-12 rounded-full flex items-center justify-center z-10 p-0"
                aria-label="Next image"
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            </>
          )}
          
          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;


import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
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
  const [api, setApi] = useState<CarouselApi>();
  
  // Set initial slide when modal opens or initialIndex changes
  useEffect(() => {
    if (api && isOpen) {
      api.scrollTo(initialIndex);
    }
  }, [api, isOpen, initialIndex]);

  // Update current index when carousel changes
  useEffect(() => {
    if (!api) return;
    
    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    
    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  // Handle keyboard navigation for the entire modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!api) return;
      
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        api.scrollPrev();
        console.log("Left arrow pressed, scrolling to previous slide");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        api.scrollNext();
        console.log("Right arrow pressed, scrolling to next slide");
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, api, onClose]);

  const handlePrevious = () => {
    if (api) {
      api.scrollPrev();
      console.log("Previous clicked, scrolling to prev slide");
    } else {
      console.log("Carousel API not initialized");
    }
  };

  const handleNext = () => {
    if (api) {
      api.scrollNext();
      console.log("Next clicked, scrolling to next slide");
    } else {
      console.log("Carousel API not initialized");
    }
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
        
        <div className="relative w-full h-[80vh] flex items-center">
          <Carousel 
            className="w-full h-full" 
            setApi={setApi}
            opts={{ 
              loop: true, 
              align: "center",
              containScroll: false
            }}
          >
            <CarouselContent className="h-full">
              {images.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="flex items-center justify-center h-full w-full">
                    <img 
                      src={image} 
                      alt={`Feature image ${index + 1}`} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Custom arrow buttons */}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;

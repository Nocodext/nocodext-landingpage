
import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { X, Fullscreen } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

const ImageModal = ({ isOpen, onClose, images, initialIndex = 0 }: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 bg-black/90 border-none">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/20 p-2 text-white hover:bg-black/40"
        >
          <X className="h-6 w-6" />
        </button>
        
        <Carousel className="w-full py-10">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="flex items-center justify-center">
                  <img 
                    src={image} 
                    alt={`Feature image ${index + 1}`} 
                    className="max-h-[80vh] max-w-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;

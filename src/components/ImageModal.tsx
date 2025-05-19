
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { X } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 bg-black/90 border-none">
        <VisuallyHidden>
          <DialogTitle>Image Gallery</DialogTitle>
        </VisuallyHidden>
        
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
                <div className="flex items-center justify-center h-full">
                  <img 
                    src={image} 
                    alt={`Feature image ${index + 1}`} 
                    className="original-dimension"
                    style={{ maxHeight: '80vh', maxWidth: '80vw' }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 bg-black/20 hover:bg-black/40 text-white border-none" />
          <CarouselNext className="absolute right-4 bg-black/20 hover:bg-black/40 text-white border-none" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;

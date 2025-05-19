
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Fullscreen } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoId: string;
}

const VideoModal = ({ isOpen, onClose, title, videoId }: VideoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="relative pb-[56.25%] h-0 mt-4">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-md"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}?fs=1&enablejsapi=1&showinfo=0&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;

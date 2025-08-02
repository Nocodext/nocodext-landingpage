
import { useState } from 'react';
import VideoModal from './VideoModal';
import ImageModal from './ImageModal';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  videoId: string;
  textColor: string;
}

const FeatureCard = ({ title, description, image, videoId, textColor }: FeatureCardProps) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <>
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <div 
          className="overflow-hidden cursor-pointer" 
          onClick={() => setIsImageModalOpen(true)}
        >
          <img 
            src={image} 
            alt={title} 
            className="feature-image transition-transform duration-300 hover:scale-105" 
          />
        </div>
        <CardHeader>
          <CardTitle style={{color: textColor }}>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoModalOpen(true);
            }}
          >
            Watch demo
          </Button>
        </CardFooter>
      </Card>

      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={title}
        videoId={videoId}
      />
      
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={[image]} // Passing just the current image
        initialIndex={0}
      />
    </>
  );
};

export default FeatureCard;

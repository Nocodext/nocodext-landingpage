
import { useState } from 'react';
import VideoModal from './VideoModal';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  videoId: string;
}

const FeatureCard = ({ title, description, image, videoId }: FeatureCardProps) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <Card 
        className="h-full cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
        onClick={() => setIsVideoModalOpen(true)}
      >
        <div className="overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="feature-image transition-transform duration-300 hover:scale-105" 
          />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" className="w-full">
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
    </>
  );
};

export default FeatureCard;

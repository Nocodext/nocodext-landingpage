import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Github, Terminal } from "lucide-react";
import ImageModal from "@/components/bubble/ImageModal";

const PinNpmComingSoon = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

  const galleryImages = [
    "/lovable-uploads/9b35a60b-b9c4-43fe-bb3b-ce91e3504860.png",
    "/lovable-uploads/41ace184-b0ec-4cf6-8774-8e6be0154dbc.png",
    "/lovable-uploads/02a080dd-dc98-4e04-8e07-2c7382b6831a.png", 
    "/lovable-uploads/a7ebd22c-3037-4c51-a19c-3555f5bb4b5a.png"
  ];

  const openGallery = (index: number) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  const visionFeatures = [
    {
      icon: Code,
      title: "Browser Extension",
      description: "Pin directly from npmjs.com",
      status: "Available Now"
    },
    {
      icon: Github,
      title: "VS Code Integration", 
      description: "Bring your pinned packages into your editor",
      status: "Coming Soon"
    },
    {
      icon: Terminal,
      title: "Multi-Ecosystem Support",
      description: "PyPI, NuGet, Composer — one workflow across languages",
      status: "In Development"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter">
          One memory for every package manager
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter mb-8">
          Pin'npm is more than a Chrome extension — one unified memory for open-source choices.
        </p>
        
        {/* Gallery Preview */}
        <div className="mb-12">
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => openGallery(index)}
              >
                <img
                  src={image}
                  alt={`Pin'npm in action - screenshot ${index + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Click any image to view the full gallery
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {visionFeatures.map((feature, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="font-inter text-xs">
                  {feature.status}
                </Badge>
              </div>
              <CardTitle className="text-lg font-inter font-semibold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Gallery Modal */}
      <ImageModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={galleryImages}
        initialIndex={galleryInitialIndex}
      />
    </section>
  );
};

export default PinNpmComingSoon;
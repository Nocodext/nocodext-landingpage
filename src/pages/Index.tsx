
import { useEffect, useState } from "react";
import ImageModal from "@/components/bubble/ImageModal";
import HeroSection from "@/components/bubble/HeroSection";
import OverviewSection from "@/components/bubble/OverviewSection";
import FeaturesSection from "@/components/bubble/FeaturesSection";
import CTASection from "@/components/bubble/CTASection";
import StayInformed from "@/components/bubble/StayInformed";
import ManifestoSection from "@/components/bubble/ManifestoSection";

const features = [
  {
    title: "Reveal everything in a page",
    description: "Stop clicking on each of many elements to unhide",
    image: "/lovable-uploads/3176929d-4d74-4496-9a42-a0450dec069c.png",
    videoId: "WX9Z9CTtX0U",
    textColor: "#5e17eb",
  },
  {
    title: "Elements tree : filter by type",
    description: "Show only the elements of type you want to see", 
    image: "/lovable-uploads/6b62c47d-94da-4c6f-a15f-ebf1ce78a872.png",
    videoId: "bQMLIO9QxKI",
    textColor: "#00bf63",
  },
  {
    title: "API connector revamped",
    description: "Work with API Connector reimagined",
    image: "/lovable-uploads/e1d7393b-bf6b-4c09-8191-1be19186e95e.png",
    videoId: "sEw0NWoHETM",
    textColor: "#292cc4",
  },
  {
    title: "API connector & Postman",
    description: "Leverage the power of Postman from insde Bubble. Handle endpoints in a snap",
    image: "/lovable-uploads/05b5655e-be7a-4592-9612-e54c41a57fcf.png",
    videoId: "gg3aZS_14Q0",
    textColor: "#ff3131",
  },
  {
    title: "API Navigator",
    description: "Overview all your API connector queries. No endless scrolling",
    image: "/lovable-uploads/fcad6142-05d2-4a14-9d26-bb169ead614d.png",
    videoId: "_NPrcIpywuk",
    textColor: "#fd764c",
  }
];

const Index = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isTabGalleryOpen, setIsTabGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [tabGalleryInitialIndex, setTabGalleryInitialIndex] = useState(0);
  
  // Extract all feature images for the feature carousel
  const allFeatureImages = features.map(feature => feature.image);
  
  // Tab images for the tab carousel
  const tabImages = {
    designer: "/lovable-uploads/8b3e648b-9f39-4824-a7ea-94f8d89e107e.png",
    apiConnector: "/lovable-uploads/fe780e34-60dd-4003-b40f-18d2de5d5265.png"
  };
  
  // All tab images array for tab gallery
  const allTabImages = [tabImages.designer, tabImages.apiConnector];
  
  // Function to open feature gallery with a specific image
  const openGallery = (index: number) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  // Function to open tab image gallery
  const openTabGallery = (tabName: string) => {
    const tabImageIndex = tabName === "designer" ? 0 : 1;
    setTabGalleryInitialIndex(tabImageIndex);
    setIsTabGalleryOpen(true);
  };
  
  return (
    <div className="flex flex-col font-inter">
      
      <HeroSection />
      
      <OverviewSection onImageClick={openTabGallery} />
      
      <FeaturesSection />
      
      {/* Feature Gallery Modal */}
      <ImageModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={allFeatureImages}
        initialIndex={galleryInitialIndex}
      />
      
      {/* Tab Gallery Modal (separate instance) */}
      <ImageModal
        isOpen={isTabGalleryOpen}
        onClose={() => setIsTabGalleryOpen(false)}
        images={allTabImages}
        initialIndex={tabGalleryInitialIndex}
      />
      
      <CTASection />
      
      <StayInformed />
      
      <ManifestoSection />
    </div>
  );
};

export default Index;

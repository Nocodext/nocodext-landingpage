
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ImageModal from "@/components/ImageModal";
import { ArrowRight, LayoutPanelLeft, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const features = [
  {
    title: "Reveal everything in a page",
    description: "Stop clicking on each of many elements to unhide",
    image: "/lovable-uploads/3176929d-4d74-4496-9a42-a0450dec069c.png",
    videoId: "WX9Z9CTtX0U", // Example, to be replaced with real YouTube IDs
  },
  {
    title: "Elements tree : filter by type",
    description: "Show only the elements of type you want to see", 
    image: "/lovable-uploads/6b62c47d-94da-4c6f-a15f-ebf1ce78a872.png",
    videoId: "bQMLIO9QxKI",
  },
  {
    title: "API connector revamped",
    description: "Work with API Connector reimagined",
    image: "/lovable-uploads/e1d7393b-bf6b-4c09-8191-1be19186e95e.png",
    videoId: "sEw0NWoHETM",
  },
  {
    title: "API connector & Postman",
    description: "Leverage the power of Postman from insde Bubble. Handle endpoints in a snap",
    image: "/lovable-uploads/05b5655e-be7a-4592-9612-e54c41a57fcf.png",
    videoId: "gg3aZS_14Q0",
  },
  {
    title: "API Navigator",
    description: "Overview all your API connector queries. No endless scrolling",
    image: "/lovable-uploads/fcad6142-05d2-4a14-9d26-bb169ead614d.png",
    videoId: "_NPrcIpywuk",
  }
];

const Index = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("designer");
  
  // Extract all feature images for the carousel
  const allFeatureImages = features.map(feature => feature.image);
  
  // Function to open gallery with a specific image
  const openGallery = (index: number) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col font-inter">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="animate-fade-in font-inter font-bold pt-14 md:pt-0">
              <span className="bg-gradient-to-r from-nocodext to-nocodext-light text-transparent bg-clip-text">Power up your</span> <span className="inline-flex items-center">
                <span className="bubble-logo">
                  <span className="bubble-dot">.</span>Bubble
                </span>
              </span> <span className="bg-gradient-to-r from-nocodext to-nocodext-light text-transparent bg-clip-text">Editor experience.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 animate-fade-in opacity-0 font-inter" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Bubble UI is never enough, still features missing, unintutive.
              Nocodext keeps ahead of Bubble's official roadmap.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <button 
                onClick={() => window.open("https://chrome.google.com/webstore", "_blank")}
                className="flex items-center justify-center h-14 rounded-full bg-gradient-to-r from-pink-50 to-blue-50 text-gray-600 font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="flex h-full items-center justify-center bg-neutral-100 aspect-square rounded-full">
                  <svg viewBox="0 0 24 24" width="28" height="28">
                    <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.003h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.366zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" 
                      fill="#4285F4" />
                    <path d="M12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" 
                      fill="#34A853" />
                    <path d="M22 12c0-1.54-.29-3.011-.818-4.366H10.182A5.451 5.451 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545"
                      fill="#FBBC05" />
                    <path d="M2.632 4.501A11.947 11.947 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29z"
                      fill="#EA4335" />
                  </svg>
                </div>
                <span className="text-gray-700 font-inter text-lg px-6">Install from Chrome Webstore</span>
              </button>
              <button 
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-inter"
              >
                <span>Discover features</span>
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
          
          {/* Overview Section Heading */}
          <div className="mt-20 mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-nocodext to-nocodext-light text-transparent bg-clip-text">Overview</h2>
          </div>
          
          {/* Main Tabs */}
          <div className="mt-12 mb-8 max-w-3xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" variant="underline">
              <TabsList className="w-full grid grid-cols-2 h-14 border-b border-gray-200">
                <TabsTrigger 
                  value="designer" 
                  className="text-lg font-medium flex items-center gap-2 data-[state=active]:text-nocodext data-[state=active]:border-b-2 data-[state=active]:border-nocodext"
                >
                  <LayoutPanelLeft className="w-5 h-5" />
                  Designer
                </TabsTrigger>
                <TabsTrigger 
                  value="api-connector" 
                  className="text-lg font-medium flex items-center gap-2 data-[state=active]:text-nocodext data-[state=active]:border-b-2 data-[state=active]:border-nocodext"
                >
                  <Webhook className="w-5 h-5" />
                  API Connector
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="mt-6 md:mt-10 max-w-5xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-nocodext/20 to-nocodext-light/20 z-0"></div>
              {activeTab === "designer" ? (
                <img 
                  src="/lovable-uploads/d9391147-0060-4355-9b88-e64d8b2535cd.png" 
                  alt="Designer interface" 
                  className="w-full h-auto relative z-10"
                />
              ) : (
                <img 
                  src="/lovable-uploads/bcc75a65-f81c-4dfe-91e9-3b8ccfbd84fe.png" 
                  alt="API Connector interface" 
                  className="w-full h-auto relative z-10"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-nocodext font-inter">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600 font-inter">
              Discover how Nocodext can transform your daily browsing with powerful and intuitive tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="animate-fade-in opacity-0" 
                style={{ animationDelay: `${0.2 * index}s`, animationFillMode: 'forwards' }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Gallery Modal for viewing all images */}
      <ImageModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={allFeatureImages}
        initialIndex={galleryInitialIndex}
      />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-nocodext to-nocodext-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-6 font-inter">Ready to improve your productivity?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-inter">
            Join thousands of users who have already transformed their way of working with Nocodext.
          </p>
          <button 
            onClick={() => window.open("https://chrome.google.com/webstore", "_blank")}
            className="flex items-center h-14 mx-auto rounded-full bg-gradient-to-r from-pink-50 to-blue-50 text-gray-600 font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="flex h-full items-center justify-center bg-neutral-100 aspect-square rounded-full">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.003h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.366zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" 
                  fill="#4285F4" />
                <path d="M12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" 
                  fill="#34A853" />
                <path d="M22 12c0-1.54-.29-3.011-.818-4.366H10.182A5.451 5.451 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545"
                  fill="#FBBC05" />
                <path d="M2.632 4.501A11.947 11.947 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29z"
                  fill="#EA4335" />
              </svg>
            </div>
            <span className="text-gray-700 font-inter text-lg px-6">Install from Chrome Webstore</span>
          </button>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-nocodext mb-6 font-inter">Stay Informed</h2>
            <p className="text-lg text-gray-600 mb-10 font-inter">
              Receive our news, tips, and new features directly in your inbox.
            </p>
            <Newsletter />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;


import { useState } from "react";
import { LayoutPanelLeft, Webhook } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OverviewSectionProps {
  onImageClick: (tabName: string) => void;
}

const OverviewSection = ({ onImageClick }: OverviewSectionProps) => {
  const [activeTab, setActiveTab] = useState("designer");
  
  const tabImages = {
    designer: "/lovable-uploads/8b3e648b-9f39-4824-a7ea-94f8d89e107e.png",
    apiConnector: "/lovable-uploads/fe780e34-60dd-4003-b40f-18d2de5d5265.png"
  };

  return (
    <div className="container mx-auto px-4">
      {/* Overview Section Heading */}
      <div className="mt-20 mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-nocodext to-nocodext-light text-transparent bg-clip-text">Overview</h2>
      </div>
      
      {/* Main Tabs */}
      <div className="mt-12 mb-12 max-w-3xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 gap-4 h-16 bg-transparent">
            <TabsTrigger 
              value="designer" 
              variant="buttons"
              className="text-lg font-medium flex items-center gap-2 bg-gray-50 border border-gray-200 shadow-sm hover:bg-gray-100 hover:shadow data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-nocodext/30"
            >
              <LayoutPanelLeft className="w-5 h-5" />
              Designer
            </TabsTrigger>
            <TabsTrigger 
              value="api-connector" 
              variant="buttons"
              className="text-lg font-medium flex items-center gap-2 bg-gray-50 border border-gray-200 shadow-sm hover:bg-gray-100 hover:shadow data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-nocodext/30"
            >
              <Webhook className="w-5 h-5" />
              API Connector
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="mt-6 md:mt-10 max-w-5xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
        <div className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer" onClick={() => onImageClick(activeTab)}>
          <div className="absolute inset-0 bg-gradient-to-r from-nocodext/20 to-nocodext-light/20 z-0"></div>
          {activeTab === "designer" ? (
            <img 
              src={tabImages.designer} 
              alt="Designer interface" 
              className="w-full h-auto relative z-10 border-[15px] border-solid border-white transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <img 
              src={tabImages.apiConnector} 
              alt="API Connector interface" 
              className="w-full h-auto relative z-10 border-[15px] border-solid border-white transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;

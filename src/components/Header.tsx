
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Linkedin, 
  Package,
  CirclePlay,
  Info
} from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("bubble");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 z-10 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <span className="text-2xl font-bold text-nocodext font-roboto">Nocodext.studio</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs defaultValue="bubble" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mr-4">
              <TabsTrigger value="bubble" className="flex items-center gap-2 font-open-sans">
                <CirclePlay className="w-4 h-4" />
                <span>Bubble</span>
              </TabsTrigger>
              <TabsTrigger value="airtable" className="flex items-center gap-2 font-open-sans">
                <Database className="w-4 h-4" />
                <span>Airtable</span>
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="flex items-center gap-2 font-open-sans">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </TabsTrigger>
              <TabsTrigger value="pinnpm" className="flex items-center gap-2 font-open-sans">
                <Package className="w-4 h-4" />
                <span>pin'npm</span>
              </TabsTrigger>
              <TabsTrigger value="unstream" className="flex items-center gap-2 font-open-sans">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                <span>unstream.fm</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2 font-open-sans">
                <Info className="w-4 h-4" />
                <span>About us</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <button 
            onClick={() => window.open("https://chrome.google.com/webstore", "_blank")}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-50 to-blue-50 text-gray-600 font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-center bg-neutral-100 rounded-md p-1">
              <svg viewBox="0 0 24 24" width="18" height="18">
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
            <span className="text-gray-700 font-roboto">Install from Chrome Webstore</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


import { useState, useEffect } from 'react';
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
          <img 
            src="/lovable-uploads/e7f16d3b-a5d6-450f-82b6-f46f6458d688.png" 
            alt="Nocodext Studio" 
            className="w-[22rem] h-auto" // Made responsive with width 22rem
          />
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
            </TabsList>
          </Tabs>
          
          <a 
            href="#about" 
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-nocodext to-nocodext-light text-white font-medium text-sm transition-colors hover:opacity-90"
          >
            <Info className="w-4 h-4" />
            <span>About us</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

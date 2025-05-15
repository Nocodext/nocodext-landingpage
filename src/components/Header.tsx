
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Airtable, 
  Linkedin, 
  PinNpm,
  Bubble
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
          <span className="text-2xl font-bold text-nocodext font-comfortaa">Nocodext.studio</span>
        </div>
        
        <div className="flex items-center gap-6">
          <Tabs defaultValue="bubble" value={activeTab} onValueChange={setActiveTab} className="mr-6">
            <TabsList>
              <TabsTrigger value="bubble" className="flex items-center gap-2">
                <Bubble className="w-4 h-4" />
                <span>Bubble</span>
              </TabsTrigger>
              <TabsTrigger value="airtable" className="flex items-center gap-2">
                <Airtable className="w-4 h-4" />
                <span>Airtable</span>
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </TabsTrigger>
              <TabsTrigger value="pinnpm" className="flex items-center gap-2">
                <PinNpm className="w-4 h-4" />
                <span>pin'npm</span>
              </TabsTrigger>
              <TabsTrigger value="unstream" className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                <span>unstream.fm</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            onClick={() => window.open("https://chrome.google.com/webstore", "_blank")}
            className="bg-nocodext hover:bg-nocodext-dark text-white"
          >
            Installer l'extension
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

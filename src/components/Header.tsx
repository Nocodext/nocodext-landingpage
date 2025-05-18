
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Linkedin, 
  Package,
  CirclePlay,
  Info,
  Music,
  ChevronDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const tabOptions = [
    { value: "bubble", label: "Bubble", icon: <CirclePlay className="w-4 h-4" /> },
    { value: "airtable", label: "Airtable", icon: <Database className="w-4 h-4" /> },
    { value: "linkedin", label: "LinkedIn", icon: <Linkedin className="w-4 h-4" /> },
    { value: "pinnpm", label: "pin'npm", icon: <Package className="w-4 h-4" /> },
    { value: "unstream", label: "unstream.fm", icon: <Music className="w-4 h-4" /> }
  ];

  return (
    <header className={`w-full fixed top-0 z-10 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md shadow-gray-200/50" : "bg-transparent"}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 pb-6 md:pb-4">
        <div className={`flex items-center gap-2 transition-all duration-300 ${
          isScrolled 
            ? "opacity-0 md:opacity-100 h-0 md:h-auto overflow-hidden md:overflow-visible mb-0" 
            : "opacity-100 mb-4 md:mb-0"
        }`}>
          <img 
            src="/lovable-uploads/e7f16d3b-a5d6-450f-82b6-f46f6458d688.png" 
            alt="Nocodext Studio" 
            className="w-[22rem] h-auto" 
          />
        </div>
        
        <div className="flex items-center w-full md:w-auto">
          {/* Mobile: Dropdown Select */}
          <div className="w-full md:hidden mb-5 pb-2">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full bg-muted border-gray-200">
                <SelectValue placeholder="Select a tab">
                  <div className="flex items-center gap-2">
                    {tabOptions.find(tab => tab.value === activeTab)?.icon}
                    {tabOptions.find(tab => tab.value === activeTab)?.label}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {tabOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Desktop: Tabs */}
          <div className="hidden md:flex md:items-center w-auto overflow-x-auto scrollbar-hide">
            <Tabs defaultValue="bubble" value={activeTab} onValueChange={setActiveTab} className="h-10">
              <TabsList className="mr-4 whitespace-nowrap h-10 flex items-center gap-2 bg-transparent">
                {tabOptions.map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className="flex items-center gap-2 font-open-sans py-2 bg-muted rounded-md"
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          
            <a 
              href="#about" 
              className="flex-shrink-0 flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-nocodext to-nocodext-light text-white font-medium text-sm transition-colors hover:opacity-90 h-9 self-auto ml-2 md:ml-4"
            >
              <Info className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">About us</span>
            </a>
          </div>
          
          {/* Mobile only: About button outside dropdown */}
          <div className="md:hidden">
            <a 
              href="#about" 
              className="flex-shrink-0 flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-nocodext to-nocodext-light text-white font-medium text-sm transition-colors hover:opacity-90 h-9 self-start md:self-auto ml-2 md:ml-0"
            >
              <Info className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">About us</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

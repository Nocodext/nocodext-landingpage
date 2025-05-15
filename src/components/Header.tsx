
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 z-10 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-nocodext">Nocodext</span>
        </div>
        <Button 
          onClick={() => window.open("https://chrome.google.com/webstore", "_blank")}
          className="bg-nocodext hover:bg-nocodext-dark text-white"
        >
          Installer l'extension
        </Button>
      </div>
    </header>
  );
};

export default Header;

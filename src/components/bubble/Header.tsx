
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Linkedin, 
  Package,
  CirclePlay,
  Info,
  Music,
  ChevronDown,
  Code,
  MessageCircle
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
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTabFromPath = (pathname: string) => {
    if (pathname === '/bubble' || pathname === '/' || pathname.startsWith('/bubble/')) return 'bubble';
    if (pathname === '/pinnpm' || pathname.startsWith('/pinnpm/')) return 'pinnpm';
    if (pathname === '/watools' || pathname.startsWith('/watools/')) return 'watools';
    if (pathname === '/airtable' || pathname.startsWith('/airtable/')) return 'airtable';
    if (pathname === '/linkedin' || pathname.startsWith('/linkedin/')) return 'linkedin';
    return 'bubble'; // default
  };
  
  const [activeTab, setActiveTab] = useState(() => getActiveTabFromPath(location.pathname));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(getActiveTabFromPath(location.pathname));
  }, [location.pathname]);

  // Handle tab navigation
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    switch (tabValue) {
      case 'bubble':
        navigate('/bubble');
        break;
      case 'pinnpm':
        navigate('/pinnpm');
        break;
      case 'watools':
        navigate('/watools');
        break;
      case 'airtable':
        navigate('/airtable');
        break;
      case 'linkedin':
        navigate('/linkedin');
        break;
      // Add other cases when those pages are implemented
      default:
        break;
    }
  };

  const tabOptions = [
    { value: "bubble", label: "Bubble", icon: <Code className="w-4 h-4 relative top-[1px]" />, color: "#0000FF " },
    { value: "airtable", label: "Airtable", icon: <Database className="w-4 h-4" />, color: "#14BFFF" },
    { value: "linkedin", label: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, color: "#0A66C2" },
    { value: "pinnpm", label: "pin'npm", icon: <Package className="w-4 h-4" />, color: "#CB3837" },
    { value: "watools", label: "WA Tools", icon: <MessageCircle className="w-4 h-4" />, color: "#25D366" },
    { value: "unstream", label: "unstream.fm", icon: <Music className="w-4 h-4" />, color: "#00FF6A" }
  ];

  return (
    <header className={`w-full fixed top-0 z-10 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/90 backdrop-blur-md shadow-md shadow-gray-800/20" 
        : "bg-white"
    }`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 pb-4">
        <div className={`flex items-center gap-2 transition-all duration-300 ${
          isScrolled 
            ? "opacity-0 md:opacity-100 h-0 md:h-auto overflow-hidden md:overflow-visible mb-0" 
            : "opacity-100 mb-2 md:mb-0"
        }`}>
          <img 
            src="/lovable-uploads/6b5d3a46-4c1a-4936-851c-bdf704b718a9.png" 
            alt="Nocodext Studio" 
            className="w-[15rem] h-auto rounded-md" 
          />
        </div>
        
        <div className="flex items-center w-full md:w-auto">
          {/* Mobile: Dropdown Select */}
          <div className={`w-full md:hidden mb-2 ${!isScrolled ? "mt-2" : ""}`}>
            <Select value={activeTab} onValueChange={handleTabChange}>
              <SelectTrigger className="w-full bg-white border-gray-200 text-black">
                <SelectValue placeholder="Select a tab">
                  <div className="flex items-center gap-2">
                    {tabOptions.find(tab => tab.value === activeTab)?.icon}
                    {tabOptions.find(tab => tab.value === activeTab)?.label}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 text-black">
                {tabOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="flex items-center gap-2 text-black hover:bg-nocodext hover:text-white"
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
          
          {/* Desktop: Navigation */}
          <nav className="hidden md:flex md:items-center w-auto overflow-x-auto scrollbar-hide gap-1 mr-4">
            {tabOptions.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className="group relative flex items-center gap-2 px-4 py-2 font-open-sans text-sm transition-all"
              >
                <span 
                  style={{ color: tab.color }}
                  className={`transition-opacity ${activeTab === tab.value ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'}`}
                >
                  {tab.icon}
                </span>
                <span 
                  className={`transition-colors ${
                    activeTab === tab.value 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </span>
                <span 
                  style={{ backgroundColor: tab.color }}
                  className={`absolute bottom-0 left-0 h-0.5 transition-all ${
                    activeTab === tab.value ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>
          
          <a 
            href="#about" 
            className="hidden md:flex flex-shrink-0 items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-nocodext to-nocodext-light text-white font-medium text-sm transition-colors hover:opacity-90 h-9 self-auto ml-2"
          >
            <span>About us</span>
          </a>
          
          {/* Mobile only: About button outside dropdown */}
          <div className="md:hidden">
            <a 
              href="#about" 
              className="flex-shrink-0 flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-nocodext to-nocodext-light text-white font-medium text-sm transition-colors hover:opacity-90 h-9 self-start md:self-auto ml-2 md:ml-0"
            >
              <Info className="w-4 h-4" />
              <span className="hidden md:inline">About us</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

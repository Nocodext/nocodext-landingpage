import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import airtableLogo from "@/assets/airtable-logo.png";
import airtableHero from "@/assets/airtable-hero.png";
import airtableChromeStore from "@/assets/airtable-chrome-store.png";
import airtableBookmarkDemo from "@/assets/airtable-bookmark-demo.png";
import airtableColumnsNavigator from "@/assets/airtable-columns-navigator.png";
import airtableColorizeTabs from "@/assets/airtable-colorize-tabs.png";
import airtableWidgets from "@/assets/airtable-widgets.png";
import airtableVideoThumbnail from "@/assets/airtable-video-thumbnail.jpg";
import airtableVideoThumbnail2 from "@/assets/airtable-video-thumbnail2.jpg";
import ImageModal from "@/components/bubble/ImageModal";
import VideoModal from "@/components/bubble/VideoModal";
const Airtable = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comment: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [currentVideoTitle, setCurrentVideoTitle] = useState("");
  
  const featureImages = [
    airtableColumnsNavigator,
    airtableBookmarkDemo,
    airtableColorizeTabs
  ];

  const openModal = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const openVideoModal = (videoId: string, title: string) => {
    setCurrentVideoId(videoId);
    setCurrentVideoTitle(title);
    setIsVideoModalOpen(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={airtableLogo} alt="Airtable Extension Logo" className="w-16 h-16 rounded-lg" />
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground">Airtable</h1>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  The extension augments Airtable editor interface by providing widgets that should exist natively but don't
                </h2>
                <p className="text-lg text-muted-foreground">(not yet...or will never)</p>
              </div>
            </div>
            <div className="flex justify-center">
              <a href="https://chrome.google.com/webstore/detail/nocodext-for-airtable/kigfniiolojjmchffmindnihiiglbckc" target="_blank" rel="noopener noreferrer">
                <img src={airtableChromeStore} alt="Available in Chrome Web Store" className="max-w-sm hover:scale-105 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Widgets Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            
          </div>
          
          {/* Columns Navigator */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚣</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground">Columns navigator</h3>
                </div>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>Navigate throughout too many columns in 1 click</p>
                  <p>without scrolling back-and-forth all along the day</p>
                  <p>and save your eyes 👀, headaches...your health</p>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src={airtableColumnsNavigator} 
                  alt="Columns Navigator Demo" 
                  className="rounded-lg shadow-lg max-w-full h-auto cursor-pointer hover:scale-105 transition-transform" 
                  onClick={() => openModal(0)}
                />
              </div>
            </div>
          </div>

          {/* Bookmark Columns */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src={airtableBookmarkDemo} 
                  alt="Bookmark Columns Demo" 
                  className="rounded-lg shadow-lg max-w-full h-auto cursor-pointer hover:scale-105 transition-transform" 
                  onClick={() => openModal(1)}
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔖</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground">Bookmark columns</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Reach out to columns you edit the most
                </p>
              </div>
            </div>
          </div>

          {/* Colorize Table Tabs */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎨</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground">Colorize table tabs</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  Distinguish your tables grouped by category, domains, with their own color
                </p>
              </div>
              <div className="flex justify-center">
                <img 
                  src={airtableColorizeTabs} 
                  alt="Colorize Table Tabs Demo" 
                  className="rounded-lg shadow-lg max-w-full h-auto cursor-pointer hover:scale-105 transition-transform" 
                  onClick={() => openModal(2)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-foreground">Overview</h2>
          <p className="text-xl text-center mb-16 text-muted-foreground">here is how it looks like</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Video Demo Cards */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div 
                className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity relative group overflow-hidden"
                onClick={() => openVideoModal("QaEoG71i3NI", "Navigate among table columns")}
              >
                <img 
                  src={airtableVideoThumbnail} 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-l-[16px] border-l-foreground border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-center text-foreground">Navigate among table columns</h4>
              <Button variant="outline" className="w-full mt-4" asChild>
                <a href="https://www.youtube.com/watch?v=QaEoG71i3NI" target="_blank" rel="noopener noreferrer">
                  Watch Demo
                </a>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div 
                className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity relative group overflow-hidden"
                onClick={() => openVideoModal("BNgfDmolSLQ", "Bookmark table tab")}
              >
                <img 
                  src={airtableVideoThumbnail2} 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-l-[16px] border-l-foreground border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-center text-foreground">Bookmark table tab</h4>
              <Button variant="outline" className="w-full mt-4" asChild>
                <a href="https://www.youtube.com/watch?v=BNgfDmolSLQ?si=NYJyxEh34HkkG1o7" target="_blank" rel="noopener noreferrer">
                  Watch Demo
                </a>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">Colorize tables tab</span>
              </div>
              <h4 className="font-semibold text-center text-foreground">Colorize table tab</h4>
              <Button variant="outline" className="w-full mt-4" asChild>
                <a href="https://www.youtube.com/watch?v=sLJfIiQ-lW4" target="_blank" rel="noopener noreferrer">
                  Watch Demo
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-foreground">Say your interest</h2>
          
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea id="comment" name="comment" value={formData.comment} onChange={handleInputChange} rows={4} />
              </div>
              
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Install Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-foreground">Installez maintenant</h2>
          <div className="flex justify-center">
            <Button size="lg" asChild>
              <a href="https://chrome.google.com/webstore/detail/nocodext-for-airtable/kigfniiolojjmchffmindnihiiglbckc" target="_blank" rel="noopener noreferrer">
                Install Chrome Extension
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">See you there</h2>
          <div className="flex justify-center gap-8">
            <Button variant="outline" size="lg" asChild>
              <a href="https://www.youtube.com/@nocodext1060" target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://www.linkedin.com/company/nocodext" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={featureImages}
        initialIndex={currentImageIndex}
      />
      
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId={currentVideoId}
        title={currentVideoTitle}
      />
    </div>;
};
export default Airtable;
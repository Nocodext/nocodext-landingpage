import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Chrome, Pin } from "lucide-react";
const mockupImage = "/lovable-uploads/9c2ea1d9-4fad-4a23-b73a-2ef6f308aba8.png";
const PinNpmHero = () => {
  return <section className="container mx-auto px-4 py-16 md:py-24 mt-20">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start mb-6">
            <img src="/lovable-uploads/9b47b3ef-3f1c-4ef7-a861-99abf648bf3b.png" alt="pin'npm logo" className="h-20 md:h-24 w-auto" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-inter">
            Find, trust, and organize the open-source packages your team depends on.
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl font-inter">
            From npm today — to VS Code and every major package manager tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="font-inter font-semibold">
              <Chrome className="mr-2 h-5 w-5" />
              Start Pinning
            </Button>
            <Button variant="outline" size="lg" className="font-inter" asChild>
              <a href="#waitlist">Add to Chrome Free</a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Pin className="h-4 w-4 text-primary" />
              
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <span>No personal data collected</span>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            
          </div>
        </div>

        {/* Right Mockup */}
        <div className="flex-1 relative">
          <div className="relative animate-float">
            <img src={mockupImage} alt="pin'npm Chrome extension mockup showing pin button on npm package page" className="w-full h-auto rounded-lg shadow-2xl border border-border" />
          </div>
        </div>
      </div>
    </section>;
};
export default PinNpmHero;
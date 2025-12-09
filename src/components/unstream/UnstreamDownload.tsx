import { Chrome, Monitor, Apple, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

const UnstreamDownload = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-950 to-black relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMEZGNzciIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          Get started
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
          Choose your preferred way to reclaim your music.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Chrome Extension */}
          <div className="p-8 rounded-2xl border border-gray-800 bg-gray-950/80 hover:border-[#00FF77]/30 transition-all group">
            <div className="w-16 h-16 rounded-xl bg-[#00FF77]/10 flex items-center justify-center mb-6 group-hover:bg-[#00FF77]/20 transition-colors">
              <Chrome className="text-[#00FF77]" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Chrome Extension</h3>
            <p className="text-gray-500 mb-6">
              Automatic activation on streaming sites. Direct WebUSB communication.
            </p>
            <Button 
              size="lg"
              className="w-full bg-[#00FF77] text-black hover:bg-[#00FF77]/90 font-semibold"
            >
              Get from Chrome Web Store
            </Button>
          </div>

          {/* Desktop App */}
          <div className="p-8 rounded-2xl border border-gray-800 bg-gray-950/80 hover:border-[#00FF77]/30 transition-all group">
            <div className="w-16 h-16 rounded-xl bg-[#00FF77]/10 flex items-center justify-center mb-6 group-hover:bg-[#00FF77]/20 transition-colors">
              <Monitor className="text-[#00FF77]" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Desktop App</h3>
            <p className="text-gray-500 mb-6">
              Fully offline. Complete control. No browser required.
            </p>
            <div className="flex gap-2">
              <Button 
                size="lg"
                variant="outline"
                className="flex-1 border-[#00FF77]/50 text-[#00FF77] hover:bg-[#00FF77]/10"
              >
                <Laptop className="mr-2" size={18} />
                Windows
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="flex-1 border-[#00FF77]/50 text-[#00FF77] hover:bg-[#00FF77]/10"
              >
                <Apple className="mr-2" size={18} />
                macOS
              </Button>
            </div>
          </div>
        </div>

        {/* Open source note */}
        <p className="text-center text-gray-600 mt-8 text-sm">
          Open-source components available soon.
        </p>
      </div>
    </section>
  );
};

export default UnstreamDownload;

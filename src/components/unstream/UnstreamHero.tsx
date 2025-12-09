import { Chrome, Download, Usb } from "lucide-react";
import { Button } from "@/components/ui/button";

const UnstreamHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF77]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00FF77]/5 rounded-full blur-[100px]" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00FF77 1px, transparent 1px), linear-gradient(90deg, #00FF77 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00FF77]/20 to-transparent border border-[#00FF77]/30 flex items-center justify-center backdrop-blur-sm">
              <Usb size={48} className="text-[#00FF77]" />
            </div>
            <div className="absolute -inset-1 bg-[#00FF77]/20 rounded-2xl blur-xl -z-10" />
          </div>
        </div>

        {/* Brand */}
        <h2 className="text-[#00FF77] font-mono text-lg tracking-[0.3em] mb-4 uppercase">
          unstream.fm
        </h2>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-white">Reclaim your music.</span>
          <br />
          <span className="text-[#00FF77]">Locally.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto font-light">
          Your music. Your rules. Your device.
        </p>
        <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
          Offline freedom, in one USB key.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg"
            className="bg-[#00FF77] text-black hover:bg-[#00FF77]/90 font-semibold px-8 py-6 text-lg group"
          >
            <Chrome className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
            Download Chrome Extension
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-[#00FF77]/50 text-[#00FF77] hover:bg-[#00FF77]/10 font-semibold px-8 py-6 text-lg group"
          >
            <Download className="mr-2 group-hover:translate-y-1 transition-transform" size={20} />
            Download Desktop App
          </Button>
        </div>

        {/* Trust line */}
        <p className="text-sm text-gray-600 font-mono">
          0% cloud. 100% local. Your data never leaves your home.
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default UnstreamHero;

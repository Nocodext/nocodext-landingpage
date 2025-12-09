import { Usb, MonitorSmartphone, LogIn, ListMusic, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Usb,
    title: "Plug in your USB key",
    description: "Connect your Unstream USB to your computer."
  },
  {
    number: "02",
    icon: MonitorSmartphone,
    title: "Launch the app",
    description: "Run the desktop app or the Chrome extension."
  },
  {
    number: "03",
    icon: LogIn,
    title: "Connect your streaming service",
    description: "Link Spotify, Deezer, or others via secure OAuth2."
  },
  {
    number: "04",
    icon: ListMusic,
    title: "Select your playlists",
    description: "Browse and pick the playlists you want to keep."
  },
  {
    number: "05",
    icon: Download,
    title: "Download to your USB",
    description: "Your music is saved locally. Forever yours."
  }
];

const UnstreamHowItWorks = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF77]/5 rounded-full blur-[150px]" />
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          How it works
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
          Three steps. That's it. Plug and play.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#00FF77]/50 to-transparent" />
              )}
              
              <div className="text-center">
                {/* Step number */}
                <div className="text-6xl font-bold text-[#00FF77]/20 mb-4 font-mono">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#00FF77]/20 to-[#00FF77]/5 border border-[#00FF77]/30 flex items-center justify-center mb-6">
                  <step.icon className="text-[#00FF77]" size={36} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnstreamHowItWorks;

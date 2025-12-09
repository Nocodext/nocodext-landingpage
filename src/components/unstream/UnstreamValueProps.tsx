import { Shield, Wifi, WifiOff, Usb, Zap, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Ultra-local",
    description: "No cloud, no data sent anywhere. Everything stays on your machine."
  },
  {
    icon: Heart,
    title: "Private by design",
    description: "No tracking, no account required. Your privacy isn't negotiable."
  },
  {
    icon: WifiOff,
    title: "Offline-first",
    description: "Works even without internet. True independence."
  },
  {
    icon: Usb,
    title: "WebUSB ready",
    description: "Direct communication with your USB key. No middleman."
  },
  {
    icon: Zap,
    title: "Plug & Play",
    description: "Simple installation. No configuration nightmare."
  },
  {
    icon: Shield,
    title: "Total respect",
    description: "We don't want your data. We want you to be free."
  }
];

const UnstreamValueProps = () => {
  return (
    <section className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black" />
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-white">Why </span>
          <span className="text-[#00FF77]">unstream.fm</span>
          <span className="text-white">?</span>
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
          A deliberate break from the hyper-connected modern model.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-gray-800 bg-gray-950/50 hover:border-[#00FF77]/30 hover:bg-gray-900/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#00FF77]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF77]/20 transition-colors">
                <value.icon className="text-[#00FF77]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-gray-500">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnstreamValueProps;

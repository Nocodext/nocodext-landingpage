import { Cpu, Usb, Gauge, Server, Zap } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Local compute",
    description: "All processing happens on your machine"
  },
  {
    icon: Usb,
    title: "WebUSB powered",
    description: "Direct device communication protocol"
  },
  {
    icon: Gauge,
    title: "Optimized stability",
    description: "Built for reliability, not trends"
  },
  {
    icon: Server,
    title: "Zero server dependency",
    description: "Works without any external service"
  },
  {
    icon: Zap,
    title: "Direct device speed",
    description: "No network latency, instant response"
  }
];

const UnstreamPerformance = () => {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#00FF77] font-mono text-sm tracking-wider">PERFORMANCE</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
            Local power, real speed
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            No cloud means no delays. Your hardware, your performance.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-gray-800 bg-gray-950/50 hover:border-[#00FF77]/30 transition-colors"
            >
              <feature.icon className="text-[#00FF77]" size={20} />
              <div>
                <span className="text-white font-medium">{feature.title}</span>
                <span className="text-gray-600 mx-2">·</span>
                <span className="text-gray-500 text-sm">{feature.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnstreamPerformance;

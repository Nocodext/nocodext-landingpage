import { X, Shield } from "lucide-react";

const privacyPoints = [
  "No account required",
  "No server dependency",
  "No data sharing",
  "No tracking whatsoever",
  "No third-party cloud reliance",
  "Your computer is your musical sanctuary"
];

const UnstreamPrivacy = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-950 to-black relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main privacy badge */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF77]/30 bg-[#00FF77]/5 mb-8">
              <Shield className="text-[#00FF77]" size={18} />
              <span className="text-[#00FF77] text-sm font-mono">PRIVACY-FIRST</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Your privacy isn't a feature —<br />
              <span className="text-[#00FF77]">it's the foundation.</span>
            </h2>
          </div>

          {/* Privacy points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {privacyPoints.map((point, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-800 bg-gray-950/50"
              >
                <div className="w-6 h-6 rounded-full bg-[#00FF77]/20 flex items-center justify-center flex-shrink-0">
                  <X className="text-[#00FF77]" size={14} />
                </div>
                <span className="text-gray-300">{point}</span>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-500 italic">
              "Total respect for your privacy: Zero cloud sharing, everything stays with you."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnstreamPrivacy;


import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/58697fd5-035d-473d-b09f-05a9ee051506.png" 
              alt="pin'npm logo" 
              className="h-20 md:h-24 w-auto"
            />
          </div>
          <h1 className="animate-fade-in font-inter font-bold pt-14 md:pt-0">
            <span className="bg-gradient-to-r from-nocodext to-nocodext-light text-transparent bg-clip-text">Power up your</span> <span className="inline-flex items-center">
              <span className="bubble-logo">
                <span className="bubble-dot">.</span>Bubble
              </span>
            </span> <span className="bg-gradient-to-r from-nocodext to-nocodext-light text-transparent bg-clip-text">Editor experience.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 animate-fade-in opacity-0 font-inter" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Bubble UI is amazing, but quite unintuitive, many features missing.
            <br/>Nocodext keeps ahead of Bubble's roadmap : at its own and faster pace.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <button 
              onClick={() => window.open("https://chromewebstore.google.com/detail/nocodext-for-bubble/dpjnneeknnpjcnphfahhcofciocedggp", "_blank")}
              className="flex items-center justify-center h-14 rounded-full bg-gradient-to-r from-pink-50 to-blue-50 text-gray-600 font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="flex h-full items-center justify-center bg-neutral-100 aspect-square rounded-full">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.003h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.366zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" 
                    fill="#4285F4" />
                  <path d="M12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" 
                    fill="#34A853" />
                  <path d="M22 12c0-1.54-.29-3.011-.818-4.366H10.182A5.451 5.451 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545"
                    fill="#FBBC05" />
                  <path d="M2.632 4.501A11.947 11.947 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29z"
                    fill="#EA4335" />
                </svg>
              </div>
              <span className="text-gray-700 font-inter text-lg px-6">Install from Chrome Webstore</span>
            </button>
            <button 
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-inter"
            >
              <span>Discover features</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

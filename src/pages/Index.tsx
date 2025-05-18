import { useEffect } from "react";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { ArrowRight, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Workflow Automation",
    description: "Automate your repetitive tasks and save valuable time in your daily work.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3",
    videoId: "dQw4w9WgXcQ", // Example, to be replaced with real YouTube IDs
  },
  {
    title: "Cross-Platform Integration",
    description: "Easily connect Nocodext with your favorite tools for a seamless, frictionless experience.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3",
    videoId: "dQw4w9WgXcQ",
  },
  {
    title: "Customizable Dashboard",
    description: "Create your ideal workspace with customizable widgets based on your specific needs.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3",
    videoId: "dQw4w9WgXcQ",
  },
  {
    title: "Real-Time Synchronization",
    description: "Access your data on all your devices with instant and secure synchronization.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3",
    videoId: "dQw4w9WgXcQ",
  },
];

const Index = () => {
  useEffect(() => {
    document.title = "Nocodext - Chrome Extension to optimize your productivity";
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-inter">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="animate-fade-in font-inter font-bold pt-14 md:pt-0">
              <span className="bg-gradient-to-r from-nocodext to-nocodext-light text-transparent bg-clip-text">Power up your</span> <span className="inline-flex items-center">
                <span className="bubble-logo">
                  <span className="bubble-dot">.</span>Bubble
                </span>
              </span> <span className="bg-gradient-to-r from-nocodext to-nocodext-light text-transparent bg-clip-text">Editor experience.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 animate-fade-in opacity-0 font-inter" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Bubble UI is never enough, still features missing, unintutive.
              Nocodext keeps ahead of Bubble's official roadmap.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <a 
                href="https://chrome.google.com/webstore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-3.5 mx-auto rounded-full bg-gradient-to-r from-pink-50/80 to-blue-50/80 text-gray-700 font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <Chrome className="w-5 h-5" />
                <span className="font-medium">Install from Chrome Webstore</span>
              </a>
              <button 
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-inter"
              >
                <span>Discover features</span>
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
          
          <div className="mt-20 md:mt-24 max-w-5xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-nocodext/20 to-nocodext-light/20 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3" 
                alt="Nocodext interface" 
                className="w-full h-auto relative z-10"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-nocodext font-inter">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600 font-inter">
              Discover how Nocodext can transform your daily browsing with powerful and intuitive tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="animate-fade-in opacity-0" 
                style={{ animationDelay: `${0.2 * index}s`, animationFillMode: 'forwards' }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-nocodext to-nocodext-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-6 font-inter">Ready to improve your productivity?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-inter">
            Join thousands of users who have already transformed their way of working with Nocodext.
          </p>
          <a 
            href="https://chrome.google.com/webstore" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-3 px-8 py-3.5 mx-auto rounded-full bg-gradient-to-r from-pink-50/80 to-blue-50/80 text-gray-700 font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 w-fit"
          >
            <Chrome className="w-5 h-5" />
            <span className="font-medium">Install from Chrome Webstore</span>
          </a>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-nocodext mb-6 font-inter">Stay Informed</h2>
            <p className="text-lg text-gray-600 mb-10 font-inter">
              Receive our news, tips, and new features directly in your inbox.
            </p>
            <Newsletter />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

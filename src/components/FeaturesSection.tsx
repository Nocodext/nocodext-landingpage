
import FeatureCard from "@/components/FeatureCard";

const features = [
  {
    title: "Reveal everything in a page",
    description: "Stop clicking on each of many elements to unhide",
    image: "/lovable-uploads/3176929d-4d74-4496-9a42-a0450dec069c.png",
    videoId: "WX9Z9CTtX0U",
    textColor: "#5e17eb",
  },
  {
    title: "Elements tree : filter by type",
    description: "Show only the elements of type you want to see", 
    image: "/lovable-uploads/6b62c47d-94da-4c6f-a15f-ebf1ce78a872.png",
    videoId: "bQMLIO9QxKI",
    textColor: "#00bf63",
  },
  {
    title: "API connector revamped",
    description: "Work with API Connector reimagined",
    image: "/lovable-uploads/e1d7393b-bf6b-4c09-8191-1be19186e95e.png",
    videoId: "sEw0NWoHETM",
    textColor: "#292cc4",
  },
  {
    title: "API connector & Postman",
    description: "Leverage the power of Postman from insde Bubble. Handle endpoints in a snap",
    image: "/lovable-uploads/05b5655e-be7a-4592-9612-e54c41a57fcf.png",
    videoId: "gg3aZS_14Q0",
    textColor: "#ff3131",
  },
  {
    title: "API Navigator",
    description: "Overview all your API connector queries. No endless scrolling",
    image: "/lovable-uploads/fcad6142-05d2-4a14-9d26-bb169ead614d.png",
    videoId: "_NPrcIpywuk",
    textColor: "#fd764c",
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-nocodext font-inter">Key Features</h2>
          <p className="mt-4 text-xl text-gray-600 font-inter">
            Discover how Nocodext can transform your daily browsing with powerful and intuitive tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  );
};

export default FeaturesSection;

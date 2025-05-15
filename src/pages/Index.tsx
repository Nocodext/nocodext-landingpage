
import { useEffect } from "react";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Automatisation du workflow",
    description: "Automatisez vos tâches répétitives et gagnez un temps précieux dans votre travail quotidien.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3",
    videoId: "dQw4w9WgXcQ", // Exemple, à remplacer par les vrais IDs YouTube
  },
  {
    title: "Intégration multi-plateformes",
    description: "Connectez facilement Nocodext avec vos outils préférés pour une expérience fluide et sans friction.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3",
    videoId: "dQw4w9WgXcQ",
  },
  {
    title: "Tableau de bord personnalisable",
    description: "Créez votre espace de travail idéal avec des widgets personnalisables selon vos besoins spécifiques.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3",
    videoId: "dQw4w9WgXcQ",
  },
  {
    title: "Synchronisation en temps réel",
    description: "Accédez à vos données sur tous vos appareils grâce à la synchronisation instantanée et sécurisée.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3",
    videoId: "dQw4w9WgXcQ",
  },
];

const Index = () => {
  useEffect(() => {
    document.title = "Nocodext - Extension Chrome pour optimiser votre productivité";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="animate-fade-in text-nocodext">
              Transformez votre navigation avec Nocodext
            </h1>
            <p className="mt-6 text-xl text-gray-600 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              L'extension Chrome qui redéfinit votre expérience en ligne. Plus rapide, plus intuitive, plus productive.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <Button 
                size="lg" 
                className="bg-nocodext hover:bg-nocodext-dark text-white"
                onClick={() => window.open("https://chrome.google.com/webstore", "_blank")}
              >
                Installer l'extension
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Découvrir les fonctionnalités
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
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
            <h2 className="text-nocodext">Fonctionnalités principales</h2>
            <p className="mt-4 text-xl text-gray-600">
              Découvrez comment Nocodext peut transformer votre navigation quotidienne avec des outils puissants et intuitifs.
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
          <h2 className="text-white mb-6">Prêt à améliorer votre productivité ?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont déjà transformé leur façon de travailler grâce à Nocodext.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-nocodext hover:bg-gray-100"
            onClick={() => window.open("https://chrome.google.com/webstore", "_blank")}
          >
            Installer l'extension gratuite
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;


import { useState } from 'react';
import { Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ContactModal from './ContactModal';

const Footer = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-6">Nocodext</h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              variant="outline" 
              onClick={() => window.open("https://youtube.com", "_blank")}
              className="flex items-center gap-2 bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700"
            >
              <Youtube size={20} />
              Suivez-nous sur YouTube
            </Button>
            
            <Button 
              variant="default"
              className="bg-nocodext hover:bg-nocodext-dark text-white"
              onClick={() => setIsContactModalOpen(true)}
            >
              Contactez-nous
            </Button>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Nocodext. Tous droits réservés.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-300 hover:text-nocodext">Mentions légales</a>
            <a href="#" className="text-sm text-gray-300 hover:text-nocodext">Politique de confidentialité</a>
            <a href="#" className="text-sm text-gray-300 hover:text-nocodext">CGU</a>
          </div>
        </div>
      </div>
      
      <ContactModal 
        isOpen={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </footer>
  );
};

export default Footer;

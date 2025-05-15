
import Newsletter from './Newsletter';
import ContactForm from './ContactForm';
import { Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">Nocodext</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              L'extension Chrome qui simplifie votre workflow quotidien. Découvrez comment Nocodext peut transformer votre productivité.
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.open("https://youtube.com", "_blank")}
              className="flex items-center gap-2"
            >
              <Youtube size={20} />
              Suivez-nous sur YouTube
            </Button>
          </div>
          
          <div className="flex-1">
            <Newsletter />
          </div>
          
          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Nocodext. Tous droits réservés.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-nocodext">Mentions légales</a>
            <a href="#" className="text-sm text-gray-500 hover:text-nocodext">Politique de confidentialité</a>
            <a href="#" className="text-sm text-gray-500 hover:text-nocodext">CGU</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

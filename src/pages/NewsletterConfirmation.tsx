import { Button } from "@/components/ui/button";
import { CheckCircle, Pin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NewsletterConfirmation = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/9b47b3ef-3f1c-4ef7-a861-99abf648bf3b.png" 
            alt="pin'npm logo" 
            className="h-16 md:h-20 w-auto"
          />
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <CheckCircle size={80} className="text-primary" />
            <div className="absolute -top-2 -right-2 bg-primary rounded-full p-2">
              <Pin size={20} className="text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Inscription{" "}
          <span className="text-primary font-mono">confirmée</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Merci de votre intérêt pour <span className="font-semibold text-foreground font-mono">pin'npm</span>! 
          Vous recevrez bientôt des nouvelles de notre extension.
        </p>

        {/* Newsletter benefits */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-4">Avec la newsletter :</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Pin className="h-4 w-4 text-primary" />
              <span>Soyez les premiers informés du lancement</span>
            </div>
            <div className="flex items-center gap-2">
              <Pin className="h-4 w-4 text-primary" />
              <span>Accès anticipé à l'extension</span>
            </div>
            <div className="flex items-center gap-2">
              <Pin className="h-4 w-4 text-primary" />
              <span>Nouvelles fonctionnalités en avant-première</span>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <Button asChild variant="outline" className="font-mono">
          <Link to="/pinnpm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la page d'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NewsletterConfirmation;
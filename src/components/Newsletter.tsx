import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { subscribeToNewsletter } from "@/lib/newsletter";

const Newsletter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      setModalType('error');
      setModalMessage("Veuillez remplir tous les champs.");
      setShowModal(true);
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await subscribeToNewsletter({
        name,
        email,
        product: "bubble"
      });
      
      if (!result.success) {
        throw new Error(result.error || "Failed to subscribe");
      }
      
      setModalType('success');
      setModalMessage("Inscription réussie ! Vous allez recevoir un email de confirmation pour valider votre inscription.");
      setShowModal(true);
      console.log("Subscription successful:", result.data);
      setName('');
      setEmail('');
      
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setModalType('error');
      setModalMessage("Une erreur s'est produite lors de l'inscription. Veuillez réessayer plus tard.");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 h-12 text-base shadow-inner border-gray-200 focus:shadow-md"
        />
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-12 text-base shadow-inner border-gray-200 focus:shadow-md"
        />
        <Button 
          type="submit" 
          className="h-12 px-6 text-base font-medium bg-gradient-to-r from-nocodext to-nocodext-light text-white shadow-lg hover:shadow-xl transition-all duration-300" 
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {modalType === 'success' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Inscription réussie !
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Erreur
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">{modalMessage}</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowModal(false)}>
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Newsletter;
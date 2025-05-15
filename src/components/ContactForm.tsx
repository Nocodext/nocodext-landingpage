
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulating form submission
      // In a real implementation, you'd call your API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Merci pour votre message! Nous vous répondrons bientôt.");
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
      console.error("Contact form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Textarea
          placeholder="Votre message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
        <Button 
          type="submit" 
          className="w-full bg-nocodext hover:bg-nocodext-dark text-white" 
          disabled={isLoading}
        >
          {isLoading ? "Envoi..." : "Envoyer le message"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;

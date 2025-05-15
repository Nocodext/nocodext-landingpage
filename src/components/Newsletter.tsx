
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Newsletter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulating API call to MailerLite
      // In a real implementation, you'd call the MailerLite API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Merci de votre inscription!");
      setName('');
      setEmail('');
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Restez informé</h3>
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
        <Button 
          type="submit" 
          className="w-full bg-nocodext hover:bg-nocodext-dark text-white" 
          disabled={isLoading}
        >
          {isLoading ? "Inscription..." : "S'abonner à la newsletter"}
        </Button>
      </form>
    </div>
  );
};

export default Newsletter;

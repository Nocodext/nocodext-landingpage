
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
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulating API call to MailerLite
      // In a real implementation, you'd call the MailerLite API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thanks for subscribing!");
      setName('');
      setEmail('');
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center">Stay informed</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button 
          type="submit" 
          className="w-full bg-nocodext hover:bg-nocodext-dark text-white" 
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe to newsletter"}
        </Button>
      </form>
    </div>
  );
};

export default Newsletter;

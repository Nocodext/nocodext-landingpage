
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
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 h-12 text-base"
        />
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-12 text-base"
        />
        <Button 
          type="submit" 
          className="h-12 px-6 text-base font-medium bg-nocodext hover:bg-nocodext-dark text-white" 
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default Newsletter;

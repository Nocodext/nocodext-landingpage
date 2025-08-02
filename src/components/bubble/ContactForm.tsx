
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
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulating form submission
      // In a real implementation, you'd call your API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thank you for your message! We'll get back to you soon.");
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Contact form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Contact us</h3>
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
        <Textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
        <Button 
          type="submit" 
          className="w-full bg-nocodext hover:bg-nocodext-dark text-white" 
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send message"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;

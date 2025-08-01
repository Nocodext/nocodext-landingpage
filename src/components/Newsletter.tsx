import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/newsletter";

const Newsletter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error("Please fill in all fields");
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
      
      // Show success alert instead of toast
      setShowSuccessAlert(true);
      console.log("Subscription successful:", result.data);
      setName('');
      setEmail('');
      
      // Auto-close alert after 5 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
      
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {showSuccessAlert && (
        <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="font-medium">
            Successfully subscribed! Please check your email for a confirmation message.
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
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
    </div>
  );
};

export default Newsletter;
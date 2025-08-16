import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BubbleNewsletterConfirmation = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bubble-logo text-5xl md:text-6xl">
            <span className="bubble-dot">.</span>bubble
          </div>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <CheckCircle size={80} className="text-nocodext" />
            <div className="absolute -top-2 -right-2 bg-nocodext rounded-full p-2">
              <Sparkles size={20} className="text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight font-poppins">
          Subscription{" "}
          <span className="bg-gradient-to-r from-nocodext to-nocodext-light text-transparent bg-clip-text font-poppins">confirmed</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-poppins">
          Thank you for your interest in <span className="font-semibold text-foreground font-poppins">.bubble</span>! 
          You'll soon receive updates about our Chrome extension.
        </p>

        {/* Newsletter benefits */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-4">With the newsletter:</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-nocodext" />
              <span>Be the first to know about new features</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-nocodext" />
              <span>Early access to extension updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-nocodext" />
              <span>Exclusive tips to boost your Bubble workflow</span>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <Button asChild variant="outline" className="font-mono">
          <Link to="/bubble">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BubbleNewsletterConfirmation;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chrome, Mail, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PinNpmWaitlist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email,
          groupId: "154366128875898210"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setIsSubmitted(true);
      toast({
        title: "Welcome to the waitlist! 🎉",
        description: "We'll notify you as soon as pin'npm is ready.",
      });
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again later or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="container mx-auto px-4 py-16" id="waitlist">
        <Card className="max-w-2xl mx-auto text-center border-primary/20 bg-primary/5">
          <CardContent className="p-12">
            <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>

            <h3 className="text-2xl font-bold mb-4 font-mono">
              You're on the list! 🚀
            </h3>

            <p className="text-muted-foreground mb-6">
              We'll send you an email as soon as pin'npm is ready for Chrome.
              In the meantime, follow us for updates!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="sm" className="font-mono">
                <Mail className="mr-2 h-4 w-4" />
                Follow updates
              </Button>
              <Button variant="outline" size="sm" className="font-mono">
                Share with friends
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16 bg-primary/5">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 font-mono">
          🚀 Early Access
        </Badge>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join the waitlist
        </h2>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Be the first to know when pin'npm launches on Chrome Web Store.
          No spam, just updates on development progress.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 font-mono bg-background"
              disabled={isLoading}
            />
            <Input
              type="email"
              placeholder="your.email@dev.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 font-mono bg-background"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="font-mono font-semibold"
            >
              {isLoading ? (
                "Joining..."
              ) : (
                <>
                  Join <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 justify-center">
            <Chrome className="h-4 w-4 text-primary" />
            <span>Chrome extension ready soon</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Mail className="h-4 w-4 text-primary" />
            <span>Development updates only</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Unsubscribe anytime</span>
          </div>
        </div>

        <div className="mt-8 p-4 bg-muted/30 rounded-lg max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Early access includes:</strong>{" "}
            Beta testing, feature feedback, and a special mention in our GitHub contributors list.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PinNpmWaitlist;
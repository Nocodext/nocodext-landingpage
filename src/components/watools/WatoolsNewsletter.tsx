import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Bell, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { subscribeToNewsletter } from "@/lib/newsletter";

const WatoolsNewsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await subscribeToNewsletter({
        name: name.trim() || undefined,
        email,
        product: "watools"
      });

      if (!result.success) {
        throw new Error(result.error || 'Subscription failed');
      }

      toast({
        title: "Success! 🎉",
        description: "You're now subscribed to our early access list!",
      });
      setName("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <Mail size={40} className="text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Early Access + Exclusive Bonuses
              </CardTitle>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Be the first to know when we launch and get exclusive early-bird pricing
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="bg-green-100 p-3 rounded-full w-fit mx-auto">
                    <Bell size={24} className="text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Launch Notification</h4>
                  <p className="text-gray-600 text-sm">Be the first to know when we go live</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-yellow-100 p-3 rounded-full w-fit mx-auto">
                    <Gift size={24} className="text-yellow-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">50% Early Bird Discount</h4>
                  <p className="text-gray-600 text-sm">Exclusive pricing for early subscribers</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto">
                    <Mail size={24} className="text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">WhatsApp Tips</h4>
                  <p className="text-gray-600 text-sm">Weekly group management tips & tricks</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="text"
                    placeholder="Name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 h-12 px-4 text-base"
                  />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 px-4 text-base"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !email}
                    className="bg-green-600 hover:bg-green-700 h-12 px-8 text-base font-semibold"
                  >
                    {isLoading ? "Subscribing..." : "Get Early Access"}
                  </Button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </form>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <p className="text-green-800 font-medium">
                  🎯 Already <strong>500+ WhatsApp admins</strong> waiting for launch!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WatoolsNewsletter;
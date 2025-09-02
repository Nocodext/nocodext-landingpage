import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chrome, Mail, CheckCircle, ArrowRight, X, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { subscribeToNewsletter } from "@/lib/newsletter";

const PinNpmWaitlist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setModalType('error');
      setModalMessage("Veuillez entrer une adresse email valide.");
      setShowModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const result = await subscribeToNewsletter({
        name: name.trim() || undefined,
        email,
        product: "pinnpm"
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to subscribe');
      }

      setModalType('success');
      setModalMessage("Inscription réussie ! Vous allez recevoir un email de confirmation pour valider votre inscription.");
      setShowModal(true);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Subscription error:', error);
      setModalType('error');
      setModalMessage("Une erreur s'est produite lors de l'inscription. Veuillez réessayer plus tard.");
      setShowModal(true);
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
    <section id="waitlist" className="container mx-auto px-4 py-16 bg-primary/5">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 font-mono">
          🚀 Early Access
        </Badge>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter">
          Don't just search npm. Pin it.
        </h2>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-inter">
          Install Pin'npm today and start building with clarity & confidence.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col gap-3 sm:flex-row">
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
              className="font-inter font-semibold"
            >
              {isLoading ? (
                "Starting..."
              ) : (
                <>
                  Start Pinning Today <ArrowRight className="ml-2 h-4 w-4" />
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
    </section>
  );
};

export default PinNpmWaitlist;
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Shield, Zap, Users } from "lucide-react";

const PinNpmBenefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Stop repeating the same package hunts."
    },
    {
      icon: Shield,
      title: "Build Safer",
      description: "Avoid abandoned or vulnerable dependencies."
    },
    {
      icon: Zap,
      title: "Decide Faster",
      description: "Compare alternatives with clarity."
    },
    {
      icon: Users,
      title: "Stay Aligned",
      description: "One source of truth for your team's package decisions."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter">
          Build with confidence, not guesswork
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
          Decide faster. Build safer.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <Card key={index} className="text-center border-0 bg-card/50 hover:bg-card/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>

              <h3 className="text-lg font-bold mb-2 font-inter">
                {benefit.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed font-inter">
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PinNpmBenefits;
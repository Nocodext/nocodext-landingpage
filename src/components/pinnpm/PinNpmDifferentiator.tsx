import { Card, CardContent } from "@/components/ui/card";
import { Feather, Target, ExternalLink } from "lucide-react";

const PinNpmDifferentiator = () => {
  const differentiators = [
    {
      icon: Feather,
      title: "Lightweight, elegant UI",
      description: "No bloated dashboards. Just clean, focused functionality that stays out of your way."
    },
    {
      icon: Target,
      title: "Purely focused on productivity",
      description: "Built by developers, for developers. Every feature serves one purpose: making you more productive."
    },
    {
      icon: ExternalLink,
      title: "Not affiliated with npm",
      description: "Just pinning what matters. Independent tool that respects your workflow and privacy."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why pin'npm is different
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We believe tools should be invisible when they work perfectly.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {differentiators.map((item, index) => (
          <Card key={index} className="text-center border-0 bg-card/50">
            <CardContent className="p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/5 rounded-full flex items-center justify-center">
                <item.icon className="h-10 w-10 text-primary" />
              </div>

              <h3 className="text-xl font-bold mb-4 font-inter">
                {item.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PinNpmDifferentiator;
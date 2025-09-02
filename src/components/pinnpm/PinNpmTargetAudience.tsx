import { Card, CardContent } from "@/components/ui/card";
import { Code, Users, Rocket } from "lucide-react";

const PinNpmTargetAudience = () => {
  const audiences = [
    {
      icon: Code,
      title: "Developers",
      description: "Centralize discoveries",
      detail: "Never lose track of that perfect library again. Keep all your package discoveries organized and accessible."
    },
    {
      icon: Users,
      title: "Tech Leads & Architects",
      description: "Standardize dependencies with trust",
      detail: "Make informed decisions about package adoption with health signals and team alignment tools."
    },
    {
      icon: Rocket,
      title: "Agencies & Startups",
      description: "Accelerate delivery, reduce risk",
      detail: "Move faster with confidence. Build on trusted foundations with organized package knowledge."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter">
          Where your team's package choices live
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
          The package you need, when you need it.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {audiences.map((audience, index) => (
          <Card key={index} className="text-center border-0 bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <audience.icon className="h-10 w-10 text-primary" />
              </div>

              <h3 className="text-xl font-bold mb-2 font-inter">
                {audience.title}
              </h3>

              <p className="text-primary font-semibold mb-4 font-inter">
                {audience.description}
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed font-inter">
                {audience.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PinNpmTargetAudience;
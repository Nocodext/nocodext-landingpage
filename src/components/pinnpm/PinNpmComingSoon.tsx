import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Github, Terminal } from "lucide-react";

const PinNpmComingSoon = () => {
  const visionFeatures = [
    {
      icon: Code,
      title: "Browser Extension",
      description: "Pin directly from npmjs.com",
      status: "Available Now"
    },
    {
      icon: Github,
      title: "VS Code Integration", 
      description: "Bring your pinned packages into your editor",
      status: "Coming Soon"
    },
    {
      icon: Terminal,
      title: "Multi-Ecosystem Support",
      description: "PyPI, NuGet, Composer — one workflow across languages",
      status: "In Development"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter">
          One memory for every package manager
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
          Pin'npm is more than a Chrome extension — one unified memory for open-source choices.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {visionFeatures.map((feature, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="font-inter text-xs">
                  {feature.status}
                </Badge>
              </div>
              <CardTitle className="text-lg font-inter font-semibold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PinNpmComingSoon;
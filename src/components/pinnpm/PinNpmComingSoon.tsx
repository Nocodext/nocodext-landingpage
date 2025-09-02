import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Github, Terminal } from "lucide-react";

const PinNpmComingSoon = () => {
  const upcomingFeatures = [
    {
      icon: Code,
      title: "VSCode sync",
      description: "Sync your pinned packages directly with your IDE workspace",
      status: "In development"
    },
    {
      icon: Github,
      title: "GitHub login",
      description: "Sign in with GitHub to sync across devices and backup your pins",
      status: "Coming soon"
    },
    {
      icon: Terminal,
      title: "CLI integration",
      description: "Generate package.json from your pins directly via command line",
      status: "Planned"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What's coming next
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're constantly improving pin'npm based on developer feedback.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {upcomingFeatures.map((feature, index) => (
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
import { Card, CardContent } from "@/components/ui/card";
import { Pin, FolderOpen, Share2 } from "lucide-react";

const PinNpmFeatures = () => {
  const features = [
    {
      icon: Pin,
      title: "Bookmark & Organize",
      description: "Found a package worth keeping? Pin it in one click.",
      detail: "Group your discoveries into projects, stacks, or themes."
    },
    {
      icon: FolderOpen,
      title: "Instant Insights",
      description: "Downloads, maintenance, health — all at a glance.",
      detail: "See if this package is popular, maintained, and safe."
    },
    {
      icon: Share2,
      title: "Trust Indicators & Team Alignment",
      description: "Spot vulnerable or abandoned libraries before they bite.",
      detail: "Share your collection. Get your team aligned. No more endless Slack threads."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter">
          Turn chaos into collections
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
          Pin'npm brings clarity and confidence to package discovery.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="border-2 hover:border-primary/20 transition-colors group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>

              <h3 className="text-xl font-bold mb-2 font-inter">
                {feature.title}
              </h3>

              <p className="text-muted-foreground font-semibold mb-4">
                {feature.description}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PinNpmFeatures;
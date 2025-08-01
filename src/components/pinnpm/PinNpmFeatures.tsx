import { Card, CardContent } from "@/components/ui/card";
import { Pin, FolderOpen, Share2 } from "lucide-react";

const PinNpmFeatures = () => {
  const features = [
    {
      icon: Pin,
      title: "Pin npm packages instantly",
      description: "Without leaving the site",
      detail: "One click to save any package directly from npmjs.com. No context switching, no external tools."
    },
    {
      icon: FolderOpen,
      title: "Organize them into collections",
      description: "And tag them",
      detail: "Create custom collections, add tags, and group packages by project, framework, or any system that works for you."
    },
    {
      icon: Share2,
      title: "Export to package.json",
      description: "Or share with your team",
      detail: "Generate package.json snippets, share collections via link, or sync with your development workflow."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Three steps to better package management
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stop bookmarking, stop searching through history. Start pinning.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="border-2 hover:border-primary/20 transition-colors group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>

              <h3 className="text-xl font-bold mb-2 font-mono">
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
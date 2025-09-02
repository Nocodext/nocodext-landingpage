import { AlertTriangle, Search, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PinNpmProblem = () => {
  const problems = [
    {
      icon: Search,
      title: "Millions of choices, poor search, no memory",
      description: "npm's search is overwhelming and doesn't remember what you've found before."
    },
    {
      icon: RefreshCw,
      title: "Teams waste time rediscovering the same libraries",
      description: "Every developer starts from scratch, reinventing the wheel on package selection."
    },
    {
      icon: AlertTriangle,
      title: "Decision-makers lack visibility into health & trust signals",
      description: "No easy way to assess if a package is maintained, secure, or worth the risk."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter">
          Stop losing track of packages
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
          Developers and teams are overwhelmed by package ecosystems
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {problems.map((problem, index) => (
          <Card key={index} className="text-center border border-destructive/20 bg-card">
            <CardContent className="p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
                <problem.icon className="h-10 w-10 text-destructive" />
              </div>

              <h3 className="text-lg font-bold mb-4 font-inter">
                {problem.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed font-inter">
                {problem.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PinNpmProblem;
import WatoolsHero from "@/components/watools/WatoolsHero";
import WatoolsProblemSolution from "@/components/watools/WatoolsProblemSolution";
import WatoolsValueProposition from "@/components/watools/WatoolsValueProposition";
import WatoolsFeatures from "@/components/watools/WatoolsFeatures";
import WatoolsNewsletter from "@/components/watools/WatoolsNewsletter";

const Watools = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50">
      <WatoolsHero />
      <WatoolsProblemSolution />
      <WatoolsValueProposition />
      <WatoolsFeatures />
      <WatoolsNewsletter />
    </div>
  );
};

export default Watools;
import PinNpmHero from "@/components/pinnpm/PinNpmHero";
import PinNpmProblem from "@/components/pinnpm/PinNpmProblem";
import PinNpmFeatures from "@/components/pinnpm/PinNpmFeatures";
import PinNpmBenefits from "@/components/pinnpm/PinNpmBenefits";
import PinNpmComingSoon from "@/components/pinnpm/PinNpmComingSoon";
import PinNpmTargetAudience from "@/components/pinnpm/PinNpmTargetAudience";
import PinNpmWaitlist from "@/components/pinnpm/PinNpmWaitlist";

const PinNpm = () => {
  return (
    <div className="bg-background">
      <PinNpmHero />
      <PinNpmProblem />
      <PinNpmFeatures />
      <PinNpmBenefits />
      <PinNpmComingSoon />
      <PinNpmTargetAudience />
      <PinNpmWaitlist />
    </div>
  );
};

export default PinNpm;
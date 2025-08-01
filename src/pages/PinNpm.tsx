import PinNpmHero from "@/components/pinnpm/PinNpmHero";
import PinNpmFeatures from "@/components/pinnpm/PinNpmFeatures";
import PinNpmComingSoon from "@/components/pinnpm/PinNpmComingSoon";
import PinNpmDifferentiator from "@/components/pinnpm/PinNpmDifferentiator";
import PinNpmWaitlist from "@/components/pinnpm/PinNpmWaitlist";

const PinNpm = () => {
  return (
    <div className="bg-background">
      <PinNpmHero />
      <PinNpmFeatures />
      <PinNpmComingSoon />
      <PinNpmDifferentiator />
      <PinNpmWaitlist />
    </div>
  );
};

export default PinNpm;
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PinNpmHero from "@/components/pinnpm/PinNpmHero";
import PinNpmFeatures from "@/components/pinnpm/PinNpmFeatures";
import PinNpmComingSoon from "@/components/pinnpm/PinNpmComingSoon";
import PinNpmDifferentiator from "@/components/pinnpm/PinNpmDifferentiator";
import PinNpmWaitlist from "@/components/pinnpm/PinNpmWaitlist";

const PinNpm = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PinNpmHero />
      <PinNpmFeatures />
      <PinNpmComingSoon />
      <PinNpmDifferentiator />
      <PinNpmWaitlist />
      <Footer />
    </div>
  );
};

export default PinNpm;